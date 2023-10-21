/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleCustomer } from '../../utils/data/customersData';

export default function ViewCustomer() {
  const [customerDetails, setCustomerDetails] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleCustomer(id).then(setCustomerDetails);
  }, [id]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="text-black ms-5 details">
        <div className="cust-view">
          <p>{customerDetails.firstName} {customerDetails.lastName}</p>
          <p>{customerDetails.phoneNumber}</p>
          <p>{customerDetails.email}</p>
        </div>
      </div>
    </div>
  );
}
