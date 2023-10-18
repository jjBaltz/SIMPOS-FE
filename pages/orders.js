/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { getOrders } from '../utils/data/ordersData';
import OrderCard from '../components/OrderCard';

export default function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  const getAllOrders = () => {
    getOrders(user.uid).then(setOrders);
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <div className="container">
      <div className="flex-start my-4">
        <Link href="/order/newOrder" passHref>
          <Button className="newOrder">New Order</Button>
        </Link>
        <div className="text-center my-4 d-flex flex-wrap">
          {orders.map((order) => (
            <OrderCard key={order.id} orderObj={order} onUpdate={getAllOrders} />
          ))}
        </div>
      </div>
    </div>
  );
}
