import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import axios from 'axios';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [dataUser, setDataUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'customer',
  });
  const [validUser, setValidUser] = useState(false);
  const [dataOrder, setDataOrder] = useState([]);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(null);

  const history = useHistory();

  const getProducts = () => {
    const url = 'http://localhost:3001/products';
    fetch(url)
      .then((res) => res.json())
      .then((res) => setProducts(res.products))
      .catch((e) => setError(e));
  };

  const registerUser = async () => {
    const url = 'http://localhost:3001/register';
    try {
      await axios.post(url, dataUser);
      history.push('customer/products');
    } catch (e) {
      setError(e.response.data.message);
    }
  };

  const validateDataUser = () => {
    // Ref- https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
    const validation = /^[a-z0-9.\D]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    const MIN_LEN_PASS = 6;
    const MIN_LEN_NAME = 12;

    if (
      validation.test(dataUser.email)
      && dataUser.password.length >= MIN_LEN_PASS
      && dataUser.name.length >= MIN_LEN_NAME
    ) {
      setValidUser(true);
    } else {
      setValidUser(false);
    }
  };

  const changeUserState = ({ target: { name, value } }) => {
    setDataUser({ ...dataUser, [name]: value });
  };
  const [productsAPI, setProductsAPI] = useState([]);
  const [detailsOrder, setDetailsOrder] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    getProducts();
  }, []);

  const contextValue = {
    products,
    dataUser,
    validUser,
    error,
    dataOrder,
    setDataUser,
    setDataOrder,
    total,
    setTotal,
    registerUser,
    changeUserState,
    validateDataUser,
    productsAPI,
    setProductsAPI,
    detailsOrder,
    setDetailsOrder,
    name,
    setName,
  };
  return (
    <AppContext.Provider
      value={ { ...contextValue } }
    >
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
