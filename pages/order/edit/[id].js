import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleOrder } from '../../../utils/data/ordersData';
import NewOrder from '../../../components/forms/newCustOrd';

export default function EditOrder() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleOrder(id).then(setEditItem);
  }, [id]);

  return (<NewOrder obj={editItem} />);
}
