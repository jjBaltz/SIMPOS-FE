import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { getCustomers, updateCustomer, createCustomer } from '../../utils/data/customersData';
import { getOrders, updateOrder } from '../../utils/data/ordersData';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  type: '',
};

function NewOrder({ custObj, orderObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getCustomers(user.uid).then(setFormInput);

    if (custObj.id) setFormInput(custObj);
  }, [custObj, user]);

  useEffect(() => {
    getOrders(user.uid).then(setFormInput);

    if (orderObj.id) setFormInput(orderObj);
  }, [orderObj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (custObj.id) {
      updateCustomer(formInput)
        .then(updateOrder(formInput).then(() => router.push('/orders')));
    } else {
      const payload = { ...formInput };
      createCustomer(payload).then(updateOrder(formInput).then(() => router.push('/orders')));
    }
  };

  return (
    <Form onSubmit={handleSubmit} style={{ width: '75%' }}>
      <div className="entry-form d-flex align-items-center justify-content-center">
        <h2 className="text-black mt-5">{orderObj.id ? 'Update' : 'Create'} Order</h2>

        {/* FIRSTNAME INPUT  */}
        <FloatingLabel controlId="floatingInput1" label="First Name" className="mb-3">
          <Form.Control
            type="text"
            placeholder="First Name"
            name="firstname"
            value={formInput.firstName}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        {/* LASTNAME INPUT  */}
        <FloatingLabel controlId="floatingInput1" label="Last Name" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Last Name"
            name="lastname"
            value={formInput.lastName}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        {/* EMAIL INPUT  */}
        <FloatingLabel controlId="floatingInput1" label="Email" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Email"
            name="email"
            value={formInput.email}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        {/* EMAIL INPUT  */}
        <FloatingLabel controlId="floatingInput1" label="Phone #" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Phone Number"
            name="phone"
            value={formInput.phoneNumber}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        <FloatingLabel controlId="floatingSelect" label="Order Type">
          <Form.Select>
            <option>Order Type</option>
            <option value={formInput.type}>Dine In</option>
            <option value={formInput.type}>To Go</option>
            {/* <option value="3">Online</option> */}
          </Form.Select>
        </FloatingLabel>

        {/* SUBMIT BUTTON  */}
        <Button type="submit" className="newOrd">{custObj.id ? 'Update' : 'Create'} Order</Button>
      </div>
    </Form>
  );
}

NewOrder.propTypes = {
  custObj: PropTypes.shape({
    id: PropTypes.number,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    phoneNumber: PropTypes.string,
  }),
  orderObj: PropTypes.shape({
    id: PropTypes.number,
    status: PropTypes.string,
    type: PropTypes.string,
  }),
};

NewOrder.defaultProps = {
  custObj: initialState,
  orderObj: initialState,
};

export default NewOrder;
