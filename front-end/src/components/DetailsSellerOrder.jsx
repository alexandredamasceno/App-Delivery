import React, { useContext, useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
import AppContext from '../Context/AppContext';

const URL = 'http://localhost:3001';

export default function DetailsSellerOrder() {
  const { productsAPI, detailsOrder } = useContext(AppContext);
  const [valueStatus, setValueStatus] = useState({ id: '', status: '' });

  const dataTesteIdItemNumber = 'seller_order_details__element-order-table-item-number-';

  const dataTesteIdDetails = 'seller_order_details__element-order-table-name-';

  const dataTesteIdQuantidade = 'seller_order_details__element-order-table-quantity-';

  const dataTesteIdSubTotal = 'seller_order_details__element-order-table-sub-total-';

  const dataTesteIdPrice = 'seller_order_details__element-order-table-unit-price-';

  const dataTestTotalPrice = 'seller_order_details__element-order-total-price';

  const socket = socketIOClient(URL);
  useEffect(() => {
    socket.emit('statusChange', valueStatus);
  }, [socket, valueStatus]);

  const { id, saleDate, status } = detailsOrder;
  const date = new Date(saleDate);
  const handleClick = ({ target: { name } }) => {
    setValueStatus({ id, status: name });
  };
  socket.on('newStatus', ({ newStatus }) => {
    setValueStatus({ ...valueStatus, status: newStatus });
  });

  return (
    <>
      <span>
        <label
          htmlFor="input-id"
          data-testid="seller_order_details__element-order-details-label-order-id"
        >
          PEDIDO -
          <span id="input-id">{id}</span>
        </label>
        <label
          htmlFor="input-date"
          data-testid="seller_order_details__element-order-details-label-order-date"
        >
          <span id="input-date">{ date.toLocaleDateString('pt-br')}</span>
        </label>
        <label
          htmlFor="input-status"
          data-testid="seller_order_details__element-order-details-label-delivery-status"
        >
          <span id="input-status">
            { valueStatus.status ? valueStatus.status : status }
          </span>
        </label>
        <button
          type="button"
          name="Preparando"
          data-testid="seller_order_details__button-preparing-check"
          onClick={ handleClick }
          disabled={ valueStatus.status === 'preparing' }
        >
          Preparar Pedido
        </button>

        <button
          type="button"
          name="Em Trânsito"
          data-testid=" seller_order_details__button-dispatch-check"
          onClick={ handleClick }
        >
          Saiu Para Entrega
        </button>

      </span>
      <table>
        <thead>
          <tr />
        </thead>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-Total</th>
          </tr>
        </thead>
        <tbody>
          {productsAPI.map((element, index) => (
            <tr key={ element.name }>
              <td data-testid={ `${dataTesteIdItemNumber}${index}` }>
                {index + 1}
              </td>
              <td data-testid={ `${dataTesteIdDetails}${index}` }>{element.name}</td>
              <td data-testid={ `${dataTesteIdQuantidade}${index}` }>
                {element.SalesProduct.quantity}
              </td>
              <td data-testid={ `${dataTesteIdPrice}` }>
                {Number(element.price).toFixed(2).toString().replace('.', ',')}
              </td>
              <td data-testid={ `${dataTesteIdSubTotal}${index}` }>
                {(Number(element.SalesProduct.quantity) * Number(element.price))
                  .toFixed(2)
                  .toString()
                  .replace('.', ',')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <span>Total: </span>
      <span data-testid={ `${dataTestTotalPrice}` }>
        {productsAPI.reduce((prev, currenty) => (prev
          + (Number(currenty.price) * currenty.SalesProduct.quantity)), 0)
          .toFixed(2).toString().replace('.', ',')}

      </span>
    </>
  );
}
