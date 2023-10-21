import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleCustomer } from '../../../utils/data/customersData';
import CustomerForm from '../../../components/forms/CustomerForm';

export default function EditCustomer() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleCustomer(id).then(setEditItem);
  }, [id]);

  return (<CustomerForm obj={editItem} />);
}
