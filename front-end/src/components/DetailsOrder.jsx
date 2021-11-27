/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import socketIOClient from 'socket.io-client';
import saleProductsAPI from '../service/saleProductsAPI';

const URL = 'http://localhost:3001';

function DetailsOrder() {
  const [allData, setAllData] = useState(false);
  const [status, setStatus] = useState('');
  const [saleDate, setSaleDate] = useState('');

  const dataTesteIdItemNumber = `customer_order_detail
    s__element-order-table-item-number-`;
  const dataTesteIdName = 'customer_order_details__element-order-table-name-';
  const dataTesteIdQuantidade = 'customer_order_details__element-order-table-quantity-';
  const dataTesteIdSubTotal = 'customer_order_details__element-order-table-sub-total-';
  const dataTesteIdPrice = 'customer_order_details__element-order-total-price';
  const dataTest = 'customer_order_details__element-order-details-label-delivery-status';

  const date = new Date(saleDate);
  const { id } = useParams();

  useEffect(() => {
    const getApi = async () => {
      const result = await saleProductsAPI(id);
      setAllData(result);
      setStatus(result[0].status);
      setSaleDate(result[0].saleDate);
    };
    getApi();
  }, []);

  const socket = socketIOClient(URL);
  const handleChange = ({ target: { value } }) => {
    setStatus(value);
    socket.emit('Entregue', { id, status: value });
  };
  socket.on('newStatus', ({ newStatus }) => {
    setStatus(newStatus);
  });
  return (
    allData && (
      <>
        <span>
          <label
            htmlFor="input-id"
            data-testid="customer_order_details__element-order-details-label-order-id"
          >
            PEDIDO -
            <span id="input-id">{id}</span>
          </label>
          <label
            htmlFor="input-name"
            data-testid="customer_order_details__element-order-details-label-seller-name"
          >
            P.Venda:
            <span id="input-name">{allData[0].seller.name}</span>
          </label>
          <label
            htmlFor="input-date"
            data-testid="customer_order_details__element-order-details-label-order-date"
          >
            <span id="input-date">{ date.toLocaleDateString('pt-br')}</span>
          </label>
          <label
            htmlFor="input-status"
            data-testid={ dataTest }
          >
            <span id="input-status">{ status }</span>
          </label>
          <button
            value="Entregue"
            type="button"
            id="button"
            disabled={ status.toLowerCase() !== 'em trânsito' }
            data-testid="customer_order_details__button-delivery-check"
            onClick={ handleChange }
          >
            Marcar Como Entregue
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
            {allData[0].products.map((element, index) => (
              <tr key={ element.name }>
                <td data-testid={ `${dataTesteIdItemNumber}${index}` }>
                  {index + 1}
                </td>
                <td data-testid={ `${dataTesteIdName}${index}` }>{element.name}</td>
                <td data-testid={ `${dataTesteIdQuantidade}${index}` }>
                  {element.SalesProduct.quantity}
                </td>
                <td>
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
        <span data-testid={ `${dataTesteIdPrice}` }>
          {allData[0].products.reduce((prev, currenty) => (prev
          + (Number(currenty.price) * currenty.SalesProduct.quantity)), 0)
            .toFixed(2).toString().replace('.', ',')}

        </span>
      </>
    )
  );
}

export default DetailsOrder;
