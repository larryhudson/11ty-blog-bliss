const moduleName = require('../helpers/moduleName');
const { POST_COLLECTION_TAG_NAME } = require('../constants');

// Building posts (side projects / repos), newest first.
module.exports = {
  name: moduleName(__filename),
  body: (collectionApi) =>
    collectionApi
      .getFilteredByTag(POST_COLLECTION_TAG_NAME)
      .reverse()
      .filter((item) => item.data.published && item.data.type === 'building'),
};
