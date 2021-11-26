import React, { useContext, useEffect } from 'react';
import AppContext from '../Context/AppContext';

function Total() {
  const { dataOrder, total, setTotal } = useContext(AppContext);

  useEffect(() => {
    const getTotal = () => {
      console.log(dataOrder);
      const result = dataOrder.reduce((prev, curren) => prev + Number(curren.total), 0)
        .toFixed(2).replace('.', ',');
      setTotal(result);
    };
    getTotal();
  }, [dataOrder, setTotal]);

  return (
    <>
      <span>Total:</span>
      <span data-testid="customer_checkout__element-order-total-price">{total}</span>
    </>

  );
}

export default Total;
