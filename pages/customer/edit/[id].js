import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleCustomer } from '../../../utils/data/customersData';
import NewOrder from '../../../components/forms/newCustOrd';

export default function EditCustomer() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleCustomer(id).then(setEditItem);
  }, [id]);

  return (<NewOrder obj={editItem} />);
}
