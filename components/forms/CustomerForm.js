import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
// import { useAuth } from '../../utils/context/authContext';
import { updateCustomer, createCustomer } from '../../utils/data/customersData';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
};

function NewCustomer({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();

  useEffect(() => {
    if (obj.customerId) setFormInput(obj);
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.warn(formInput);
    if (obj.customerId) {
      updateCustomer(formInput)
        .then(() => router.push('/customers'));
    } else {
      createCustomer(formInput)
        .then(router.push('/customers'))
        .catch((error) => {
          console.error('API Error:', error);
        });
    }
  };

  return (
    <Form onSubmit={handleSubmit} style={{ width: '75%' }}>
      <div className="entry-form d-flex align-items-center justify-content-center">
        <h2 className="text-black mt-5">{obj.customerId ? 'Update' : 'Create'} Customer</h2>

        <div className="form-inputs">
          {/* FIRSTNAME INPUT  */}
          <FloatingLabel controlId="floatingInput1" label="First Name" className="mb-3">
            <Form.Control
              type="text"
              placeholder="First Name"
              name="firstName"
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
              name="lastName"
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
              name="phoneNumber"
              value={formInput.phoneNumber}
              onChange={handleChange}
              required
            />
          </FloatingLabel>
        </div>
        {/* SUBMIT BUTTON  */}
        <Button type="submit" className="newOrd">{obj.customerId ? 'Update' : 'Create'} Customer</Button>
      </div>
    </Form>
  );
}

NewCustomer.propTypes = {
  obj: PropTypes.shape({
    customerId: PropTypes.number,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    phoneNumber: PropTypes.string,
  }),
};

NewCustomer.defaultProps = {
  obj: initialState,
};

export default NewCustomer;
