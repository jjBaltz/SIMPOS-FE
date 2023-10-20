/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { getCustomers } from '../utils/data/customersData';
import CustomerCard from '../components/CustomerCard';

export default function Orders() {
  const { user } = useAuth();
  const [customers, setCustomers] = useState([]);

  const getAllCustomers = () => {
    getCustomers(user.uid).then(setCustomers);
  };

  useEffect(() => {
    getAllCustomers();
  }, []);

  return (
    <div className="container">
      <div className="flex-start my-4">
        <Link href="/customer/newCustomer" passHref>
          <Button className="newCustomer">New Customer</Button>
        </Link>
        <div className="text-center my-4 d-flex flex-wrap">
          {customers.map((customer) => (
            <CustomerCard key={customer.id} custObj={customer} onUpdate={getAllCustomers} />
          ))}
        </div>
      </div>
    </div>
  );
}
