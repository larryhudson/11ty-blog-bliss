---
title: Turning a scanned PDF into an audiobook with Azure Document Intelligence and OpenAI APIs
description: Using Azure Document Intelligence API, GPT-4 and OpenAI text to speech API to turn a scanned PDF into an audiobook
customPermalink: /pdf-to-audiobook-document-intelligence-gpt4-openai/
date: 2023-12-17
tags:
  - programming
  - text to speech
---

I've been experimenting with turning scanned PDFs into audiobooks using:

- the [Microsoft Document Intelligence API](https://azure.microsoft.com/en-au/products/ai-services/ai-document-intelligence) to extract text from the PDF
- the [OpenAI GPT-4 API](https://openai.com/gpt-4) to clean up the text
- the [OpenAI Text-to-Speech API](https://platform.openai.com/docs/guides/text-to-speech) to turn the cleaned text into audio.

I've found these APIs work really well together, and I'm excited about the
potential here. If you like listening to long-form content, then I think this
method is worth exploring.

In this post, I'll walk through how I'm using these APIs to turn a scanned PDF
into an audiobook. For each part, I'll share a NodeJS code example.

## Extracting text from a PDF using the Document Intelligence API

Microsoft's Document Intelligence API makes it pretty straightforward to extract
text from a PDF. I've been really impressed with the quality of the text
extraction even when the PDF is a low quality scan.

You can have a play with the API using the [Document Intelligence Studio](https://documentintelligence.ai.azure.com/studio) in your web browser.

To get started using the Document Intelligence API, you'll need to set up an
[Azure](https://azure.microsoft.com/en-au/) account and create a new 'resource' for the Document Intelligence API.

It has a free tier that allows you to extract text from 500 pages per month. You
can [find out more information about pricing on the Azure website](https://azure.microsoft.com/en-au/pricing/details/ai-document-intelligence/).

A few things to note here:

- the Document Intelligence API only extracts text from a single page at a time,
  so in my Node script, I create a new PDF for each page using the `pdf-lib`
  library, then send each 'page buffer' to the API.
- in my Node script, I write a text file for each page of the PDF, so that each
  text file can be sent to the GPT-4 API for correction.
- rather than extracting text from every page in the PDF, I split up the
  original PDF into chapters. I didn't want to use up the free quota too quickly,
  so I only extracted text from the pages that I needed.

<details>
  <summary>NodeJS code example for extracting text from a PDF</summary>
  <div>

```js
import fs from 'fs';
import path from 'path';
import { PDFDocument } from 'pdf-lib';
import {
  DocumentAnalysisClient,
  AzureKeyCredential,
} from '@azure/ai-form-recognizer';
import 'dotenv/config';
import pMap from 'p-map';

// Example usage:
// node extract-text-from-pdf.js ./my-pdf.pdf
const [pdfPath] = process.argv.slice(2);
const extractedPages = await extractTextFromFullPdf(pdfPath);
const pdfFilename = path.basename(pdfPath, '.pdf');
writeTextFiles(extractedPages, pdfFilename);

// this function takes a PDF path, and for each page, creates an individual PDF
// and extracts the text using the Document Intelligence API
async function extractTextFromFullPdf(pdfPath) {
  const fullPdfBytes = fs.readFileSync(pdfPath);
  const fullPdfDoc = await PDFDocument.load(fullPdfBytes);
  const pageCount = fullPdfDoc.getPageCount();

  const pageNumbers = Array.from({ length: pageCount }, (_, i) => i + 1);

  const extractedPages = await pMap(
    pageNumbers,
    async (pageNumber) => {
      const pdfPageBuffer = await getPdfForIndividualPage(pdfPath, pageNumber);

      const pdfData = await extractTextFromPagePdf(pdfPageBuffer);

      const content = pdfData.content;
      return { pageNumber, content };
    },
    { concurrency: 2 },
  );

  return extractedPages;
}

// the Document Intelligence API only supports extracting text from a single
// page at a time, so this function creates a new PDF for a single page
async function getPdfForIndividualPage(pdfPath, pageNumber) {
  const existingPdfBytes = fs.readFileSync(pdfPath);

  const fullPdfDoc = await PDFDocument.load(existingPdfBytes);

  const singlePagePdf = await PDFDocument.create();

  const pageIndex = pageNumber - 1;
  const [copiedPage] = await singlePagePdf.copyPages(fullPdfDoc, [pageIndex]);
  singlePagePdf.addPage(copiedPage);

  const singlePagePdfBytes = await singlePagePdf.save();
  const singlePagePdfBuffer = Buffer.from(singlePagePdfBytes);
  return singlePagePdfBuffer;
}

// this function takes a PDF buffer and sends it to the Document Intelligence
// API and returns the result
async function extractTextFromPagePdf(pdfPageBuffer) {
  // environment variables should be in .env file
  const endpoint = process.env.AZURE_DOCUMENT_INTELLIGENCE_ENDPOINT;
  const apiKey = process.env.AZURE_DOCUMENT_INTELLIGENCE_KEY;

  const documentAnalysisClient = new DocumentAnalysisClient(
    endpoint,
    new AzureKeyCredential(apiKey),
  );

  const poller = await documentAnalysisClient.beginAnalyzeDocument(
    'prebuilt-read',
    pdfPageBuffer,
  );

  const pdfDataResult = await poller.pollUntilDone();

  return pdfDataResult;
}

// this function writes a text file for each page of the PDF
function writeTextFiles(extractedPages, pdfFilename) {
  const outputFolderName = 'extracted-pages';
  if (!fs.existsSync(outputFolderName)) {
    fs.mkdirSync(outputFolderName);
  }

  for (const { pageNumber, content } of extractedPages) {
    const txtFilename = `${pdfFilename}_${pageNumber}.txt`;
    const txtFilePath = path.join(outputFolderName, txtFilename);
    fs.writeFileSync(txtFilePath, content);
  }
}
```

  </div>
</details>

## Cleaning up the extracted text with GPT-4

While the Document Intelligence API does a good job of extracting text from the
page, there can be a few issues with the extracted text:

- if sections of the page are blurry, the text can be garbled
- if the scanned page contains characters that shouldn't be on the page (eg.
  they are on the edge of an adjacent page), then those characters will show up in
  the extracted text.

Here's a screenshot of a page that includes these issues:
![A screenshot of a page from the book Krautrocksampler by Julian Cope. The left
side of the page is blurry, and in the top left corner there are extra
characters from the previous page.](/images/krautrocksampler_page13.jpg)

Here's what the Document Intelligence API extracted from that page. For quite a
few lines, the start of the line is garbled, and there are extra characters from
the previous page:

```
of Underground, Collapsing and the double-album Disaster
ot. - all came from it. Some claim that they split from music altoes-
gherto continue in a purely political way, but kept up the illu-
sion for years with seemingly new LPs. The first Amon Düül
records are extraordinary classics and extremely raw, like
coned Orcs playing neverending versions of The Mothers'
Return of the Son of Monster Magnet" and the Stooges
at LA.Blues". But they are dosed with a higher level of vibe than
es
any other freakout records - relentless, uplifting and full of the
le crodest gimmicks that all work perfectly. Amon Düül did not
re
stay long, but they laid the beginnings of Krautrock with their
ic
music, and with one particular song on Psychedelic Undera
emund. The name of the song translated as "Mama Düül and
it
er Sauerkraut band Start Up!" With that title, the lazy British
d
S
ock press at last had something to latch on to. Aha, we'll call it
Krautrock ...
e
1
e
The First Rumblings of Kosmische Music
W. Germany was full of supposed 'head' groups by now. But
any of them still did not sound remotely German, slavishly
trying to be Hard Rach !!! Others, like Embryo, Emergency and
Birth Control, mixed obvious Teutonics into unsuccessful
fusions with British/American rock and jazz. But in the mean-
ame, Amon Düül II, the musical half of the commune, had
recorded an amazing free-flowing LP called Phallus Dei, for
the British Liberty label. Its overtly mysterious sleeve first con-
Booted me when I was 13 and standing in Tamworth Wool-
worth's. I was with my Welsh grandfather, whom I asked about
the meaning of Phallus Dei. "Bloody Hell, Don't tell your
mother." he snorted. "That means God's cock!" And with the
release of that 20 minute title track, both branches of Amon
Dual had proved their commitment to the new cosmic political
commune scene. This record was very extreme, both the chim-
og sound and dizzy two-colour sleeve like something from the
13th Floor Elevators' International Artists label in Texas.
And something else again was stirring in Cologne. The
Stockhausen/Psychedelia-inspired Can were now a five-piece
recording at Schloss Norvenich, the castle home of their patron,
13
`
```

I experimented with how to clean up the text, including using the GPT-4 Vision
API to try to extract text from blurred sections. The Vision API is very
powerful but it's not suited to straightforward text extraction - it is better
suited to asking questions about an image.

In the end, I found that asking GPT-4 to clean up the extracted text worked
pretty well. The system prompt that I landed on was:

> The supplied text has been extracted from a blurry page. There may be characters from the edge of adjacent pages that need to be deleted. Correct the text so that it makes sense.

Here's the cleaned up text for the example page above:

<pre style="white-space: pre-wrap;">
"Underground, Collapsing" and the double-album "Disaster" all came from it. Some claim that they split from music altogether to continue in a purely political way but kept up the illusion for years with seemingly new LPs. The first Amon Düül records are extraordinary classics and extremely raw, like stoned Orcs playing never-ending versions of The Mothers' "Return of the Son of Monster Magnet" and the Stooges' "LA Blues". But they are dosed with a higher level of vibe than any other freak-out records - relentless, uplifting and full of the oddest gimmicks that all work perfectly. Amon Düül did not stay long, but they laid the beginnings of Krautrock with their music, and with one particular song on "Psychedelic Underground". The name of the song translated as "Mama Düül and her Sauerkraut band Start Up!" With that title, the lazy British rock press at last had something to latch on to. Aha, we'll call it Krautrock...

The First Rumblings of Kosmische Music

West Germany was full of supposed 'head' groups by now. But many of them still did not sound remotely German, slavishly trying to be Hard Rock. Others, like Embryo, Emergency and Birth Control, mixed obvious Teutonics into unsuccessful fusions with British/American rock and jazz. But in the meantime, Amon Düül II, the musical half of the commune, had recorded an amazing free-flowing LP called "Phallus Dei", for the British Liberty label. Its overtly mysterious sleeve first confused me when I was 13 and standing in Tamworth Woolworth's. I was with my Welsh grandfather, whom I asked about the meaning of Phallus Dei. "Bloody Hell, Don't tell your mother." he snorted. "That means God's cock!" And with the release of that 20-minute title track, both branches of Amon Düül had proved their commitment to the new cosmic political commune scene. This record was very extreme, both the chimeric sound and dizzy two-color sleeve like something from the 13th Floor Elevators' International Artists label in Texas.

And something else again was stirring in Cologne. The Stockhausen/Psychedelia-inspired Can were now a five-piece recording at Schloss Norvenich, the castle home of their patron.
</pre>

I'm pretty happy with that result! While it's not perfect (I can see that it
says 'oddest gimmicks' where it should say 'crudest gimmicks'), this makes a page that
was previously unlistenable into something that will work reasonably well in the
audiobook form.

A couple of things to keep in mind here:

- if the Document Intelligence API has missed a word because it is too blurry,
  GPT-4 will guess what the word would be. In a book I was reading, it was
  mentioning a person called 'Ulli Pop', but GPT-4 guessed the name was 'Iggy
  Pop', which was a surprise.
- If the extracted text includes swear words, GPT-4 will filter them out. This
  may be avoidable by tweaking the system prompt.
- As anything with untrusted input, [prompt injection](https://simonwillison.net/series/prompt-injection/) is a possibility - if you are extracting text from a document that is telling a robot to do something, that may trip up GPT-4.

<details>
  <summary>NodeJS code example for correcting text with GPT-4</summary>
  <div>

```js
import fs from 'fs';
import path from 'path';
import 'dotenv/config';

// Example usage:
// node correct-text.js ./my-text.txt
const [inputFilePath] = process.argv.slice(2);

// read the text file
const inputText = fs.readFileSync(inputFilePath, 'utf8');

// correct the text
const correctedText = await correctText(inputText);

// check output folder exists
const outputFolderName = 'corrected-pages';
if (!fs.existsSync(outputFolderName)) {
  fs.mkdirSync(outputFolderName);
}

// write the output file
const inputFileName = path.basename(inputFilePath, '.txt');
const outputFilePath = path.join(outputFolderName, inputFileName + '.txt');
fs.writeFileSync(outputFilePath, correctedText);

// this sends the text to the GPT-4 API and returns the corrected text.
async function correctText(text) {
  const openAiUrl = 'https://api.openai.com/v1/chat/completions';

  const systemPrompt =
    'The supplied text has been extracted from a blurry page. There may be characters from the edge of adjacent pages that need to be deleted. Correct the text so that it makes sense.';

  const requestBody = {
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: systemPrompt,
      },
      {
        role: 'user',
        content: text,
      },
    ],
  };

  const openAiResponse = await fetch(openAiUrl, {
    method: 'POST',
    headers: {
      // environment variables should be in .env file
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  const responseJson = await openAiResponse.json();
  const correctedText = responseJson.choices[0].message.content;

  return correctedText;
}
```

  </div>
</details>

## Converting the text into audio with OpenAI's text to speech API

In the past year, I've been experimenting with a few different text to speech
tools. Microsoft Azure's neural text to speech API has been my go-to. I've also
been impressed by the quality of the [ElevenLabs API](https://elevenlabs.io/), but its [pricing](https://elevenlabs.io/pricing) is not
feasible for large documents.

This week I've been playing around with OpenAI's text to speech API. It only has
a few voices at this stage, but the quality is very good, and the [pricing](https://openai.com/pricing) is
comparable with [Azure](https://azure.microsoft.com/en-us/pricing/details/cognitive-services/speech-services/), which makes it a good option for this project.

It seems that this latest generation of text to speech APIs, including
ElevenLabs and OpenAI, are more flexible in adapting the voice to suit the
content. I've been listening to two different books with different styles
([Krautrocksampler by Julian Cope](https://www.goodreads.com/book/show/826231.Krautrocksampler) and [Kraftwerk by Pascal Bussy](https://www.goodreads.com/en/book/show/98512)), using
the same ['Onyx' voice from the OpenAI API](https://platform.openai.com/docs/guides/text-to-speech/voice-options), and it's interesting how the voice
changes to suit the content.

Here's an example from _Krautrocksampler_, which has a more informal style:

<audio src="/mp3/krautrocksampler-page13.mp3" controls>
</audio>

And here's an example from _Kraftwerk_, which is more formal:

<audio src="/mp3/kraftwerk-page20.mp3" controls>
</audio>

It's worth noting the OpenAI API has a max input length of 4096 characters. This means we need
to break our text into chunks, get audio for each chunk, and then join the
chunks together.

<details>
  <summary>NodeJS code example for converting text to speech</summary>
  <div>

```js
import fs from 'fs';
import path from 'path';
import pMap from 'p-map';
import 'dotenv/config';

// Example usage:
// node convert-text-to-speech.js ./my-text.txt
const [inputPath] = process.argv.slice(2);

const inputText = fs.readFileSync(inputPath, 'utf8');

const textChunks = breakTextIntoChunks(inputText);

const audioBuffer = await convertTextChunksToAudio(textChunks);

const inputFilename = path.basename(inputPath, '.txt');
const outputFilePath = `./${inputFilename}.mp3`;
fs.writeFileSync(outputFilePath, audioBuffer);

process.exit(0);

// break text into chunks that are no longer than 4000 chars
function breakTextIntoChunks(text) {
  const sentenceSeparator = '.\n';
  let chunks = [];
  let currentChunk = '';

  // split text into sentences, and filter out empty sentences
  const sentences = text.split(sentenceSeparator).filter(Boolean);

  for (let sentence of sentences) {
    if (currentChunk.length + sentence.length > 4000) {
      chunks.push(currentChunk);
      currentChunk = '';
    }
    currentChunk += sentence + sentenceSeparator;
  }
  if (currentChunk.length > 0) {
    chunks.push(currentChunk);
  }

  return chunks;
}

async function convertTextChunksToAudio(chunks) {
  const audioBuffers = await pMap(chunks, convertTextToAudio, {
    concurrency: 2,
  });
  // join the audio buffers into a single audio buffer
  const audioBuffer = Buffer.concat(audioBuffers);
  return audioBuffer;
}

async function convertTextToAudio(text) {
  const textIsTooLong = text.length > 4000;
  if (textIsTooLong) {
    console.log(
      'Warning: text is too long, only converting first 4000 characters',
    );
  }

  const textToConvert = text.slice(0, 4000);

  const ttsApiUrl = 'https://api.openai.com/v1/audio/speech';
  const requestBody = {
    model: 'tts-1',
    input: textToConvert,
    voice: 'onyx',
  };

  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

  const audioResponse = await fetch(ttsApiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify(requestBody),
  });

  const audioArrayBuffer = await audioResponse.arrayBuffer();
  const audioBuffer = Buffer.from(audioArrayBuffer);

  return audioBuffer;
}
```

  </div>

</details>

## An extra tip: splitting a long PDF into smaller chapters

If you're working with a big PDF, your costs for using these APIs will add up
quickly.

Rather than converting a full book PDF in one go, I have been splitting up the
PDF into chapters. That way, I can create audio for chapters as I get to them.

Below is a NodeJS code example for creating a smaller PDF from a PDF, using the
'start' and 'end' page numbers. a PDF into chapters. It uses the
`pdf-lib` library to create a new PDF using the start and end page numbers, and
allows me to set a 'page number offset' in the case the page number in the
bottom corner of the page doesn't line up with the actual page number.

<details>
  <summary>NodeJS code example for extracting pages from a big PDF into a
    smaller PDF</summary>
  <div>

```js
import fs from 'fs';
import path from 'path';
import { PDFDocument } from 'pdf-lib';

// Usage: node extract-pages-from-pdf.js [pdf-path] [start-page-num] [end-page-num] [page-number-offset]
// Example usage: node extract-pages-from-pdf.js ./my-pdf.pdf 0 5 5
const [pdfPath, startPageNumStr, endPageNumStr, pageNumberOffsetStr] =
  process.argv.slice(2);

// arguments are strings, so we need to convert them to integers
const startPageNum = parseInt(startPageNumStr, 10);
const endPageNum = parseInt(endPageNumStr, 10);
// page number offset is added to the page number,
// in case the page number in the bottom corner of the page is different to the actual page number
const pageNumberOffset = parseInt(pageNumberOffsetStr, 10) || 0;

const newPdfBytes = await extractPdfPages(
  pdfPath,
  startPageNum,
  endPageNum,
  pageNumberOffset,
);

const pdfFilename = path.basename(pdfPath, '.pdf');
const newPdfTitle = `${pdfFilename}_pages_${startPageNum}_to_${endPageNum}.pdf`;
fs.writeFileSync(newPdfTitle, newPdfBytes);

async function extractPdfPages(
  pdfPath,
  startPageNum,
  endPageNum,
  pageNumberOffset,
) {
  const fullPdfBytes = fs.readFileSync(pdfPath);

  // Load a PDFDocument from the existing PDF bytes
  const fullPdfDoc = await PDFDocument.load(fullPdfBytes);

  const startPageIndex = startPageNum - 1 + pageNumberOffset;
  const endPageIndex = endPageNum - 1 + pageNumberOffset;

  console.log({ startPageIndex, endPageIndex });

  // get page numbers from start to end
  const pageIndices = Array.from(
    { length: endPageIndex - startPageIndex + 1 },
    (_, i) => i + startPageIndex,
  );

  const newPdf = await PDFDocument.create();
  const copiedPages = await newPdf.copyPages(fullPdfDoc, pageIndices);

  for (const copiedPage of copiedPages) {
    newPdf.addPage(copiedPage);
  }

  const newPdfBytes = await newPdf.save();

  return newPdfBytes;
}
```

  </div>

</details>

## Wrapping up

I'll continue experimenting with this method. Any projects that I make will be in public repositories on my [GitHub account](https://github.com/larryhudson).

If this is interesting to you, feel free to reach out. My email address is [larryhudson@hey.com](mailto:larryhudson@hey.com)
