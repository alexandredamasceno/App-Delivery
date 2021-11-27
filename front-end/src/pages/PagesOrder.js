import React, { useEffect, useState } from 'react';
import Order from '../components/Order';
import SaleApi from '../service/saleAPI';
import Header  from '../components/Header'

function PagesOrder() {
  const [dataSeler, setDataseler] = useState();
  useEffect(() => {
    const getApi = async () => {
      const result = await SaleApi() || { sales: [] };

      setDataseler(result.sales);
    };
    getApi();
  }, [setDataseler]);
  return (
    <>
      <Header />
      {dataSeler && dataSeler.map((e, index) => (
        <Order
          status={ e.status }
          date={ e.saleDate }
          total={ e.totalPrice }
          id={ e.id }
          key={ index }
        />
      ))}
    </>

  );
}

export default PagesOrder;
