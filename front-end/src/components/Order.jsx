import React, { useState } from 'react';
import PropTypes from 'prop-types';
import socketIOClient from 'socket.io-client';
import { Redirect } from 'react-router-dom';

const URL = 'http://localhost:3001';

function Order({ id, status, date, total }) {
  const newDate = new Date(date);
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
      { isRedirect && <Redirect to={ `/customer/orders/${id}` } /> }

      <button name={ id } type="button" onClick={ handleClick }>
        <span
          data-testid={ `customer_orders__element-order-id-${id}` }
        >
          {`Pedido${id}`}
        </span>
        <span
          data-testid={ `customer_orders__element-delivery-status-${id}` }
        >
          {id === Number(pedido.order.id) ? pedido.order.status : status}
        </span>
        <span
          data-testid={ `customer_orders__element-order-date-${id}` }
        >
          { newDate.toLocaleDateString('pt-br') }
        </span>
        <span data-testid={ `customer_orders__element-card-price-${id}` }>
          {`${total.replace('.', ',')}`}
        </span>
      </button>
    </>);
}

Order.propTypes = {
  id: PropTypes.string,
  status: PropTypes.string,
  date: PropTypes.string,
  total: PropTypes.number,
}.isRequired;

export default Order;
