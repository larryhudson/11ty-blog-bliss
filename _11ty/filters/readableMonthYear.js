const moduleName = require('../helpers/moduleName');
const formattedDate = require('../helpers/formattedDate');
const siteConfig = require('../../content/_data/siteConfig');

const MONTH_YEAR_DATE_FORMAT = siteConfig.dateFormats.monthYear;

const body = (date) => formattedDate(date, MONTH_YEAR_DATE_FORMAT);

module.exports = {
  name: moduleName(__filename),
  body,
};
