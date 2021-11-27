/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import socketIOClient from 'socket.io-client';
import saleProductsAPI from '../service/saleProductsAPI';
// import AppContext from '../Context/AppContext';

const URL = 'http://localhost:3001';
const dataTesteIdItemNumber = 'seller_order_details__element-order-table-item-number-';
const dataTesteIdDetails = 'seller_order_details__element-order-table-name-';
const dataTesteIdQuantidade = 'seller_order_details__element-order-table-quantity-';
const dataTesteIdSubTotal = 'seller_order_details__element-order-table-sub-total-';
const dataTesteIdPrice = 'seller_order_details__element-order-table-unit-price-';
const dataTestTotalPrice = 'seller_order_details__element-order-total-price';
const dataStatus = 'seller_order_details__element-order-details-label-delivery-status';
export default function DetailsSellerOrder() {
  const { id } = useParams();

  const [allData, setAllData] = useState(false);
  const [status, setStatus] = useState('');
  const [saleDate, setSaleDate] = useState('');

  const socket = socketIOClient(URL);
  useEffect(() => {
    const getApi = async () => {
      const result = await saleProductsAPI(id);
      setAllData(result);
      setStatus(result[0].status);
      setSaleDate(result[0].saleDate);
    };
    getApi();
  }, []);

  const date = new Date(saleDate);
  const handleClick = ({ target: { name } }) => {
    setStatus(name);
    socket.emit('statusChange', { id, status: name });
  };
  socket.on('newStatus', ({ newStatus }) => {
    setStatus(newStatus);
  });
  const emTransito = 'Em Trânsito';
  return (
    allData && (
      <>
        <div>
          {console.log(status, date)}
        </div>
        <span>
          <label
            htmlFor="input-id"
            data-testid="seller_order_details__element-order-details-label-order-id"
          >
            PEDIDO -
            <span id="input-id">{id}</span>
          </label>

          <span
            id="input-date"
            data-testid="seller_order_details__element-order-details-label-order-date"
          >
            {date.toLocaleDateString('pt-br')}
          </span>

          <span
            id="input-status"
            data-testid={ dataStatus }
          >
            {status}
          </span>

          <button
            type="button"
            name="Preparando"
            data-testid="seller_order_details__button-preparing-check"
            onClick={ handleClick }
            disabled={ status !== 'Pendente' }
          >
            Preparar Pedido
          </button>

          <button
            type="button"
            name={ emTransito }
            data-testid="seller_order_details__button-dispatch-check"
            disabled={ status !== 'Preparando' }
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
            {allData[0].products.map((element, index) => (
              <tr key={ element.name }>
                <td data-testid={ `${dataTesteIdItemNumber}${index}` }>
                  {index + 1}
                </td>
                <td data-testid={ `${dataTesteIdDetails}${index}` }>
                  {element.name}
                </td>
                <td data-testid={ `${dataTesteIdQuantidade}${index}` }>
                  {console.log(element.SalesProduct.quantity)}
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
          {allData[0].products
            .reduce(
              (prev, currenty) => prev + Number(currenty.price)
             * currenty.SalesProduct.quantity,
              0,
            )
            .toFixed(2)
            .toString()
            .replace('.', ',')}
        </span>
      </>)
  );
}
