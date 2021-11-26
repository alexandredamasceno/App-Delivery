/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
// import Total from '../components/Total';
import Header from '../components/Header';
import DetailsOrder from '../components/DetailsOrder';
import saleProductsAPI from '../service/saleProductsAPI';
import AppContext from '../Context/AppContext';

function PagesOrderDetails() {
  const { id } = useParams();
  const { setProductsAPI, setDetailsOrder, setName } = useContext(AppContext);

  useEffect(() => {
    const getApi = async () => {
      const result = await saleProductsAPI(id);

      setName(result[0].seller.name);
      setDetailsOrder(result[0]);
      setProductsAPI(result[0].products);
    };
    getApi();
  }, []);

  return (
    <>
      <header>
        <Header />
      </header>
      <DetailsOrder isRemoveBtn={ false } />
    </>
  );
}

export default PagesOrderDetails;
