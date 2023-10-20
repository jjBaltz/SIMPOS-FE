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
        <div className="cust-view">
          <p>{orderDetails.customer?.firstName} {orderDetails.customer?.lastName}</p>
          <p>{orderDetails.customer?.phoneNumber}</p>
          <p>{orderDetails.customer?.email}</p>
        </div>
        <div className="ord-view">
          <p>#{orderDetails.orderId}</p>
          <p>{orderDetails.type}</p>
          <p>{orderDetails.items}</p>
          <p>{orderDetails.total}</p>
        </div>
      </div>
    </div>
  );
}
