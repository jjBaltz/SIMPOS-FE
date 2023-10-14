const dbUrl = 'https://localhost:7252';

const getCustomers = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/api/customers`, {
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

const getSingleCustomer = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/api/customers/${id}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteCustomer = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/resources/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve(data))
    .catch(reject);
});

const createCustomer = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/api/customers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateCustomer = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/api/customers/{id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export {
  updateCustomer,
  createCustomer,
  deleteCustomer,
  getSingleCustomer,
  getCustomers,
};
