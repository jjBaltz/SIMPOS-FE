import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { createOrder, updateOrder } from '../../utils/data/ordersData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  status: false,
  type: '',
  total: 0,
  paymentType: '',
};

function OrderForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.orderId) setFormInput(obj);
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
    if (obj.orderId) {
      updateOrder(formInput)
        .then(() => router.push('/orders'));
    } else {
      const payload = { ...formInput, userId: user.id };
      createOrder(payload).then(() => {
        router.push('/orders');
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className="order-form d-flex align-items-center justify-content-center">
        <h2 className="text-black mt-5">New Order</h2>

        {/* DROP DOWN ORDER TYPE  */}
        <FloatingLabel controlId="floatingTextarea" label="orderType" className="mb-3">
          <Form.Select
            placeholder="Order Type"
            name="type"
            value={formInput.type}
            onChange={handleChange}
            required
          >
            <option>Type of Order</option>
            <option value="Dine In">Dine In</option>
            <option value="To Go">To Go</option>
            <option value="Online">Online</option>
          </Form.Select>
        </FloatingLabel>

        {/* DROP DOWN ORDER TYPE  */}
        <FloatingLabel controlId="floatingTextarea" label="paymentType" className="mb-3">
          <Form.Select
            placeholder="Payment Type"
            name="paymentType"
            value={formInput.paymentType}
            onChange={handleChange}
            required
          >
            <option>Payment</option>
            <option value="Cash">Cash</option>
            <option value="Visa">Visa</option>
            <option value="Mastercard">Mastercard</option>
            <option value="American Express">American Express</option>
          </Form.Select>
        </FloatingLabel>

        {/* A WAY TO HANDLE UPDATES FOR TOGGLES, RADIOS, ETC  */}
        <Form.Check
          className="text-black mb-3"
          type="switch"
          id="status"
          name="status"
          label="Order Closed?"
          checked={formInput.status}
          onChange={(e) => {
            setFormInput((prevState) => ({
              ...prevState,
              status: e.target.checked,
            }));
          }}
        />

        {/* SUBMIT BUTTON  */}
        <Button type="submit" className="newRe">{obj.orderId ? 'Update' : 'Create'} Order</Button>
      </div>
    </Form>
  );
}

OrderForm.propTypes = {
  obj: PropTypes.shape({
    orderId: PropTypes.string,
    status: PropTypes.bool,
    paymentType: PropTypes.string,
    type: PropTypes.string,
  }),
};

OrderForm.defaultProps = {
  obj: initialState,
};

export default OrderForm;
