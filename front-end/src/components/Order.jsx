import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

function Order({ id, status, date, total }) {
  const newDate = new Date(date);
  // const newData = (newDate.toISOString(`${date}`).split('T', 1)[0].split('-'));
  const [isRedirect, setIsRedirect] = useState(false);
  const handleClick = () => {
    setIsRedirect(true);
  };
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
          {status}
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
