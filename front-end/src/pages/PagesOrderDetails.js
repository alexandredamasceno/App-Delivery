/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import Header from '../components/Header';
import DetailsOrder from '../components/DetailsOrder';

function PagesOrderDetails() {
  return (
    <>
      <Header />
      <DetailsOrder isRemoveBtn={ false } />
    </>
  );
}

export default PagesOrderDetails;
