const moduleName = require('../helpers/moduleName');
const { POST_COLLECTION_TAG_NAME } = require('../constants');

// Posts that are actual writing — excludes the external link/repo stream items
// (reading / building posts, which set an `externalUrl`).
module.exports = {
  name: moduleName(__filename),
  body: (collectionApi) =>
    collectionApi
      .getFilteredByTag(POST_COLLECTION_TAG_NAME)
      .reverse()
      .filter((item) => item.data.published && !item.data.externalUrl),
};
