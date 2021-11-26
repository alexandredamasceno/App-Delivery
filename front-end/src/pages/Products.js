import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Header from '../components/Header';
import AppContext from '../Context/AppContext';

function Products() {
  const { products, dataOrder } = useContext(AppContext);
  const [totalValue, setTotalValue] = useState(0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const carTotal = () => {
    const result = dataOrder
      .reduce((previou, acc) => previou + acc.total, 0)
      .toFixed(2)
      .replace('.', ',');

    setTotalValue(result);
  };
  useEffect(() => {
    carTotal();
  }, [carTotal, dataOrder]);

  return (
    <>
      <Header />
      <main>
        {products.map((product, index) => (
          <Card key={ index } product={ product } />
        ))}
        <Link to="/customer/checkout">
          <button
            type="button"
            disabled={ totalValue === '0,00' }
            data-testid="customer_products__button-cart"
          >
            <span data-testid="customer_products__checkout-bottom-value">
              {totalValue}
            </span>

          </button>
        </Link>
      </main>
    </>
  );
}

export default Products;
