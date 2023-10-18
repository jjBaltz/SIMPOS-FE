const dbUrl = 'https://localhost:7252';

const getItems = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/api/items/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
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

const addItem = (orderId, itemId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/api/orderitems/${orderId}/${itemId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteItemFromOrder = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/orderitems/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve(data))
    .catch(reject);
});

export default {
  getItemByType,
  addItem,
  deleteItemFromOrder,
  getItems,
};
