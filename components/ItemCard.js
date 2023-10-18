import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import addItem from '../utils/data/itemsData';

function ItemCard({ itemObj, orderObj, onUpdate }) {
  const addItemToOrder = () => {
    addItem(orderObj.id, itemObj.id).then(() => onUpdate());
  };

  return (
    <Card style={{ width: '3rem', margin: '5px' }}>
      <Card.Body onClick={addItemToOrder}>
        <div className="item">{itemObj.name}</div>
      </Card.Body>
    </Card>
  );
}

ItemCard.propTypes = {
  itemObj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }).isRequired,
  orderObj: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
