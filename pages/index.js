import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import RegistrationForm from '../components/forms/RegistrationForm';
import { checkUser } from '../utils/auth';
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
          <Link passHref href="/orders">
            <Button className="view-orders">View Orders</Button>
          </Link>
          <Link passHref href="/order/initialOrder">
            <Button className="new-order">New Order</Button>
          </Link>
          <Link passHref href="/revenue">
            <Button className="view-rev">Revenue</Button>
          </Link>
        </div>
      ) : (<RegistrationForm user={user} onUpdate={onUpdate} />)}
    </>
  );
}

export default Home;
