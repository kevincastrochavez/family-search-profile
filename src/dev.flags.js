/**
 * This file is for development only and is used to simulate flags without the need
 * to use or have access to the split.io web console.
 *
 * To develop against a flag, declare it in this file and export the flags object.
 *
 * To disable development mode, export false.
 *
 * For more information see:
       https://www.familysearch.org/frontier/docs/develop/feature-flags#creating-a-new-feature-flag
 */

// eslint-disable-next-line no-unused-vars
const flags = {
  frontier_craTemplate_flagTab: { treatment: 'custom', config: { text: 'Here Be Dragons' } },
  frontier_myApp_newFeature: { treatment: 'on' },
  frontier_myApp_newFeature2: { treatment: 'custom', config: { text: 'Hey there!' } },
}

export default flags
// export default false
