import { Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import RegistrationForm from '../components/forms/RegistrationForm';
import { signOut, checkUser } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();
  const [authUser, setAuthUser] = useState();

  useEffect(() => {
    checkUser(user.uid).then((data) => setAuthUser(data[0]));
    console.warn('thisUser', authUser);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onUpdate = () => {
    checkUser(user.uid).then((data) => setAuthUser(data));
  };

  return (
    <>
      {authUser?.uid === user?.uid ? (
        <div
          className="text-center d-flex flex-column justify-content-center align-content-center"
          style={{
            height: '90vh',
            padding: '30px',
            maxWidth: '400px',
            margin: '0 auto',
          }}
        >
          <h3>You are signed in as: {user?.fbUser?.displayName}</h3>
          <Button className="view-order">View Orders</Button>
          <Button className="new-order">New Order</Button>
          <Button className="view-rev">Revenue</Button>
          <Button variant="danger" type="button" size="lg" className="copy-btn" onClick={signOut}>
            Sign Out
          </Button>
        </div>
      ) : (<RegistrationForm user={user} onUpdate={onUpdate} />)}
    </>
  );
}

export default Home;
