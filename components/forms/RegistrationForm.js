import PropTypes from 'prop-types';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { registerUser } from '../../utils/auth';

function RegistrationForm({ user, onUpdate }) {
  const [formData, setFormData] = useState({
    uid: user.uid,
  });

  const handleSubmit = () => {
    registerUser(formData);
    onUpdate();
  };

  return (
    <Form onSubmit={handleSubmit} style={{ width: '75%' }}>
      <div className="user-form d-flex align-items-center justify-content-center">

        {/* FIRST NAME INPUT  */}
        <FloatingLabel controlId="floatingInput1" label="User First Name" className="mb-3">
          <Form.Control
            type="text"
            placeholder="First Name"
            name="firstName"
            onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))}
            required
          />
        </FloatingLabel>

        {/* LAST NAME INPUT  */}
        <FloatingLabel controlId="floatingInput1" label="User Last Name" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Last Name"
            name="lastName"
            onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))}
            required
          />
        </FloatingLabel>

        {/* EMAIL INPUT  */}
        <FloatingLabel controlId="floatingInput1" label="User Email" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Email"
            name="email"
            onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))}
            required
          />
        </FloatingLabel>

        {/* SUBMIT BUTTON  */}
        <Button type="submit" className="newUser">
          Submit
        </Button>
      </div>
    </Form>
  );
}

RegistrationForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default RegistrationForm;
