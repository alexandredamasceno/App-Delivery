/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';
import AppContext from '../Context/AppContext';

function FooterCheckout() {
  const { total, dataOrder } = useContext(AppContext);
  const [sellers, setSellers] = useState([]);

  const history = useHistory();

  const [objSale, setObjSale] = useState({
    sellerId: '',
    totalPrice: '',
    deliveryAddress: '',
    deliveryNumber: '',
  });

  const handleChange = async ({ target: { name, value } }) => {
    setObjSale({ ...objSale, [name]: value, totalPrice: total.replace(',', '.') });
  };

  useEffect(() => {
    fetch('http://localhost:3001/users/search?role=seller')
      .then((response) => response.json())
      .then((response) => setSellers(response));
  }, []);

  const tok = JSON.parse(localStorage.getItem('user'));
  const contentType = 'application/json';
  const handleSubmit = async () => {
    const sale = {
      objSale,
      objSaleProduct: dataOrder,
    };
    const url = 'http://localhost:3001/sales';
    const payload = {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*',
      Authorization: tok.token,
    };

    const { data } = await axios.post(url, sale, { headers: payload });

    history.push(`/customer/orders/${data.id}`);
  };

  return (
    <div>
      <h3>Detalhes e Endereço para Entrega</h3>
      <form>
        <label htmlFor="seller">
          P. Vendedora Responsável
          <select
            name="sellerId"
            id="seller"
            onChange={ (e) => handleChange(e) }
            data-testid="customer_checkout__select-seller"
          >
            <option value="choice">Escolha o vendedor</option>
            { sellers.map((seller, index) => (
              <option
                key={ index }
                value={ seller.id }
              >
                { seller.name }
              </option>
            )) }
          </select>
        </label>
        <label htmlFor="endereco">
          Endereço
          <input
            type="text"
            name="deliveryAddress"
            id="endereco"
            onChange={ (e) => handleChange(e) }
            data-testid="customer_checkout__input-address"
          />
        </label>
        <label htmlFor="numero">
          Número
          <input
            type="text"
            name="deliveryNumber"
            id="numero"
            onChange={ (e) => handleChange(e) }
            data-testid="customer_checkout__input-addressNumber"
          />
        </label>
        <button
          type="button"
          onClick={ handleSubmit }
          data-testid="customer_checkout__button-submit-order"
        >
          Finalizar Venda

        </button>
      </form>
    </div>
  );
}

export default FooterCheckout;
