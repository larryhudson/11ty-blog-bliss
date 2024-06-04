const moduleName = require('../helpers/moduleName');
const cheerio = require('cheerio');

const body = (article) => {
  if (!Object.prototype.hasOwnProperty.call(article, 'templateContent')) {
    console.warn(
      'Failed to extract excerpt: Document has no property "templateContent".',
    );
    return null;
  }

  const content = article.templateContent;
  const $ = cheerio.load(content);

  const firstUl = $('ul').first();

  if (firstUl) {
    const html = firstUl.prop('outerHTML');
    return html;
  }

  console.warn('Failed to extract first UL: Document has no UL');
  return null;
};

module.exports = {
  name: moduleName(__filename),
  body,
};
