const { spawn } = require('child_process');

async function runPa11y(options) {
  console.log('This is where the accessibility checks should happen');
  console.log('Here are the options');
  console.log(options);
  // example options: {"--sitemap": "http://localhost:8080", "--sitemap-find":
  // "https://example.com"}
  // turn options object into array of args for child process
  const initialArgs = ['pa11y-ci'];
  const argsArray = Object.entries(options).reduce((acc, [key, value]) => {
    acc.push(key, value);
    return acc;
  }, initialArgs);

  console.log('here are the args');
  console.log(argsArray);

  console.log('starting eleventy dev server');

  const eleventyServerProcess = spawn('npx', [
    '@11ty/eleventy-dev-server',
    '--dir',
    '_site',
  ]);

  eleventyServerProcess.stdout.on('data', (data) => {
    console.log(`eleventy server process data: ${data}`);
  });

  eleventyServerProcess.stderr.on('data', (error) => {
    console.error('Error in eleventyServerProcess:', error);
  });

  eleventyServerProcess.on('close', (code) => {
    console.log(`eleventy server process exited with code ${code}`);
  });

  await new Promise((resolve) => {
    const pa11yProcess = spawn('npx', argsArray);

    pa11yProcess.stdout.on('data', (data) => {
      console.log(`INFO: ${data}`);
    });

    pa11yProcess.stderr.on('data', (data) => {
      console.error(`ERR: ${data}`);
    });

    pa11yProcess.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
      eleventyServerProcess.kill('SIGINT');
      resolve();
    });
  });
  console.log('got down here?');

  return true;
}

module.exports = {
  initArguments: {},
  configFunction: async (eleventyConfig = {}, options = {}) => {
    eleventyConfig.on('eleventy.after', () => runPa11y(options));
  },
};
