/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import saleProductsAPI from '../service/saleProductsAPI';
import AppContext from '../Context/AppContext';
import Header from '../components/Header';
import DetailsSellerOrder from '../components/DetailsSellerOrder';

export default function PagesSellerOrderDetails() {
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
      <Header />
      <DetailsSellerOrder />
    </>
  );
}
