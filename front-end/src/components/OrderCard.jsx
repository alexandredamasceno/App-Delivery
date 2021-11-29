import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import socketIOClient from 'socket.io-client';

const URL = 'http://localhost:3001';
function OrderCard({
  id, deliveryAddress, deliveryNumber, status, saleDate, totalPrice }) {
  const newDate = new Date(saleDate);
  const [isRedirect, setIsRedirect] = useState(false);
  const [pedido, setPedido] = useState({ order: { id, status } });
  const handleClick = () => {
    setIsRedirect(true);
  };
  const socket = socketIOClient(URL);
  socket.on('Entregue', (body) => {
    setPedido(body);
  });
  socket.on('statusChange', (body) => {
    setPedido(body);
  });

  return (
    <>
      { isRedirect && <Redirect to={ `/seller/orders/${id}` } /> }
      <button name={ id } type="button" onClick={ handleClick }>
        <span
          data-testid={ `seller_orders__element-order-id-${id}` }
        >
          {`Pedido${id}`}
        </span>
        <span
          data-testid={ `seller_orders__element-delivery-status-${id}` }
        >
          {id === Number(pedido.order.id) ? pedido.order.status : status}
        </span>
        <span
          data-testid={ `seller_orders__element-order-date-${id}` }
        >
          { newDate.toLocaleDateString('pt-br') }
        </span>
        <span data-testid={ `seller_orders__element-card-price-${id}` }>
          {`${totalPrice.replace('.', ',')}`}
        </span>
        <span data-testid={ `seller_orders__element-card-address-${id}` }>
          { `${deliveryAddress}, ${deliveryNumber}` }
        </span>
      </button>
    </>);
}

OrderCard.propTypes = {
  id: PropTypes.string,
  status: PropTypes.string,
  date: PropTypes.string,
  total: PropTypes.number,
}.isRequired;

export default OrderCard;
