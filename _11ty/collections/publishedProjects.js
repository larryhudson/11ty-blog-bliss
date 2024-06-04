const moduleName = require('../helpers/moduleName');
const { PROJECT_COLLECTION_TAG_NAME } = require('../constants');

module.exports = {
  name: moduleName(__filename),
  body: (collectionApi) =>
    collectionApi
      .getFilteredByTag(PROJECT_COLLECTION_TAG_NAME)
      .reverse()
      .filter((item) => item.data.published),
};
