const data = require('./data.json');
const queries = require('./queries.json');
function processQueries(data, queries) {
  const n = data.length;

  const prefixSum = new Array(n).fill(0);
  const prefixAltSum = new Array(n).fill(0);

  prefixSum[0] = data[0];
  prefixAltSum[0] = data[0];

  for (let i = 1; i < n; i++) {
    prefixSum[i] = prefixSum[i - 1] + data[i];
    prefixAltSum[i] = prefixAltSum[i - 1] + (i % 2 === 0 ? data[i] : -data[i]);
  }

  const results = [];

  for (const query of queries) {
    const { type, range } = query;
    const [l, r] = range;

    switch (type) {
      case 1: {
        const sum = l > 0 ? prefixSum[r] - prefixSum[l - 1] : prefixSum[r];
        results.push(sum);
        break;
      }
      case 2: {
        const altSum = l > 0 ? prefixAltSum[r] - prefixAltSum[l - 1] : prefixAltSum[r];
        results.push(altSum);
        break;
      }
    }
  }

  return results;
}


const results = processQueries(data, queries);
console.log(results);

