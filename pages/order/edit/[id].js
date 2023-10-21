import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleOrder } from '../../../utils/data/ordersData';
import OrderForm from '../../../components/forms/OrderForm';

export default function EditOrder() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleOrder(id).then(setEditItem);
  }, [id]);

  return (<OrderForm obj={editItem} />);
}
