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

 * With the results from this request, inside "content", 
 * list every maintainer and each package name that they maintain,
 * return an array with the following shape:
[
    ...
    {
        username: "a-username",
        packageNames: ["a-package-name", "another-package"]
    }
    ...
]
 * NOTE: the parent array and each "packageNames" array should 
 * be in alphabetical order.
 */
const axios = require('axios');

module.exports = async function organiseMaintainers() {
  // TODO
  const result = axios
    .post('http://ambush-api.inyourarea.co.uk/ambush/intercept', {
      url: 'https://api.npms.io/v2/search/suggestions?q=react',
      method: 'GET',
      return_payload: true,
    })
    .then(res => {
      //create sorted not unique list with {user: 'username'. package: 'packageName'} format
      const sortedByPackage = res.data.content
        .flatMap(content => {
          return content.package.maintainers.map(maintainer => {
            return {
              user: maintainer.username,
              package: content.package.name,
            };
          });
        })
        .sort((a, b) => (a.package > b.package ? 1 : -1));

      //create unique list of users with all packages they have worked on
      let maintainers = [];
      sortedByPackage.map(item => {
        maintainers.some(maintainer => maintainer.username === item.user)
          ? maintainers[
              maintainers.findIndex(i => i.username === item.user)
            ].packageNames.push(item.package)
          : maintainers.push({
              username: item.user,
              packageNames: [item.package],
            });
      });

      //sort array of objects by username
      return maintainers.sort((a, b) => (a.username > b.username ? 1 : -1));
    })
    .catch(err => {
      console.log(err);
    });
  return result;
};
