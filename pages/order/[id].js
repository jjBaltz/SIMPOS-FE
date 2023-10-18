/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleOrder } from '../../utils/data/ordersData';

export default function ViewOrder() {
  const [orderDetails, setOrderDetails] = useState({});
  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    getSingleOrder(id).then(setOrderDetails);
  }, [id]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="text-black ms-5 details">
        <p className="cust-view">
          {orderDetails.customer.firstName} {orderDetails.customer.LastName}
          {orderDetails.customer.phoneNumber}
          {orderDetails.customer.email}
        </p>
        <p className="ord-view">
          #{orderDetails.orderId}
          {orderDetails.type}
          <hr />
          {orderDetails.items}
          {orderDetails.total}
        </p>
      </div>
    </div>
  );
}
