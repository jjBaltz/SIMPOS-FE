const dbUrl = 'https://localhost:7033';

const getItems = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/api/items`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const getItemByType = (type) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/api/items/${type}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      resolve(data);
    })
    .catch(reject);
});

export default { getItems, getItemByType };
