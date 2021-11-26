import React, { useContext, useEffect, useState } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';

import AppContext from '../Context/AppContext';
// import { Redirect  } from 'react-router-dom';

function Header() {
  const location = useLocation();
  const { dataUser, setDataUser } = useContext(AppContext);
  const [url, setPath] = useState({ change: false, path: '' });
  const [routeSeller, setRouteSelle] = useState(true);
  const handleClick = () => {
    localStorage.removeItem('user');
    const path = '/login';
    setPath({ change: true, path });
  };
  useEffect(() => {
    const getData = async () => {
      const data = (await JSON.parse(localStorage.getItem('user'))) || {
        name: '',
      };
      setDataUser(data);
    };
    const resultUrl = location.pathname.includes('seller');
    setRouteSelle(!resultUrl);
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { change, path } = url;
  return (
    <nav>
      {change && <Redirect to={ path } />}
      {routeSeller ? (
        <Link to="/customer/products">
          <button
            type="button"
            name="products"
            data-testid="customer_products__element-navbar-link-products"
          >
            Produtos
          </button>
        </Link>
      ) : (
        <Link to="/seller/products">
          <button
            type="button"
            name="products"
            data-testid="customer_products__element-navbar-link-products"
          >
            Pedidos
          </button>
        </Link>
      )}
      {routeSeller && (
        <Link to="/customer/orders">
          <button
            type="button"
            name="orders"
            data-testid="customer_products__element-navbar-link-orders"
          >
            MeusPedidos
          </button>
        </Link>
      )}
      <span data-testid="customer_products__element-navbar-user-full-name">
        {dataUser.name}
      </span>

      <button
        type="button"
        data-testid="customer_products__element-navbar-link-logout"
        onClick={ handleClick }
      >
        Sair
      </button>
    </nav>
  );
}

export default Header;
