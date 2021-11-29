import React from 'react';
import DetailsCheckout from '../components/DetailsCheckout';
import Header from '../components/Header';
import Total from '../components/Total';
import FooterCheckout from '../components/FooterCheckout';

function Checkout() {
  return (
    <main>
      <Header />
      <h4>Finalizar Pedido</h4>
      <DetailsCheckout isRemoveBtn />
      <Total />
      <FooterCheckout />
    </main>
  );
}

export default Checkout;
