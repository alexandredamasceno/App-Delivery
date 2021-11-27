import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import AppContext from '../Context/AppContext';
// import { Redirect  } from 'react-router-dom';

function Header() {
  const location = useLocation();
  const { dataUser, setDataUser } = useContext(AppContext);
  const [routeSeller, setRouteSelle] = useState(true);

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
  return (
    <span>
      {routeSeller && (
        <Link to="/customer/products">
          <button
            type="button"
            name="products"
            data-testid="customer_products__element-navbar-link-products"
          >
            Produtos
          </button>
        </Link>
      )}

      {routeSeller ? (
        <Link to="/customer/orders">
          <div data-testid="customer_products__element-navbar-link-orders">
            MeusPedidos
          </div>
        </Link>
      ) : (
        <Link to="/seller/orders">
          <div data-testid="customer_products__element-navbar-link-orders">
            MeusPedidos
          </div>
        </Link>
      )}
      <span data-testid="customer_products__element-navbar-user-full-name">
        {dataUser.name}
      </span>

      <Link
        to="/login"
        data-testid="customer_products__element-navbar-link-logout"
      >
        <button
          type="button"
          onClick={ () => { localStorage.removeItem('user'); } }
          data-testid="customer_products__element-navbar-link-logoutt"
        >
          Sair
        </button>
      </Link>
    </span>
  );
}

export default Header;
