/**
 * Make the following POST request with either axios or node-fetch:

POST url: http://ambush-api.inyourarea.co.uk/ambush/intercept
BODY: {
    "url": "https://api.npms.io/v2/search/suggestions?q=react",
    "method": "GET",
    "return_payload": true
}

 *******

The results should have this structure:
{
    "status": 200.0,
    "location": [
      ...
    ],
    "from": "CACHE",
    "content": [
      ...
    ]
}

 ******

 *  With the results from this request, inside "content", count
 *  the number of packages that have a MAJOR semver version 
 *  greater than 10.x.x
 */
const axios = require('axios');
module.exports = async function countMajorVersionsAbove10() {
  // TODO
  const count = axios
    .post('http://ambush-api.inyourarea.co.uk/ambush/intercept', {
      url: 'https://api.npms.io/v2/search/suggestions?q=react',
      method: 'GET',
      return_payload: true,
    })
    .then(res => {
      return res.data.content.filter(
        content => content.package.version.split('.')[0] >= 10,
      ).length;
    })
    .catch(err => {
      console.log(err);
    });
  return count;
};
