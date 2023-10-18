/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useAuth } from '../utils/context/authContext';
import getItems from '../utils/data/itemsData';
import ItemCard from '../components/ItemCard';

export default function Orders() {
  const { user } = useAuth();
  const [items, setItems] = useState([]);

  const getAllItems = () => {
    getItems(user.uid).then(setItems);
  };

  useEffect(() => {
    getAllItems();
  }, []);

  return (
    <div className="container">
      <div className="flex-start my-4">
        <div className="text-center my-4 d-flex flex-wrap">
          {items.map((item) => (
            <ItemCard key={items.id} itemObj={item} onUpdate={getAllItems} />
          ))}
        </div>
      </div>
    </div>
  );
}
