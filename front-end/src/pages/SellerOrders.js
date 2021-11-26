import React, { useState, useEffect } from 'react';
import OrderCard from '../components/OrderCard';
import saleAPI from '../service/saleAPI';
import Header from '../components/Header';

function SellerOrders() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const getApi = async () => {
      const result = await saleAPI() || { sales: [] };

      setOrders(result.sales);
    };
    getApi();
  }, [setOrders]);
  console.log(orders);
  return (
    <main>
      <Header />
      { orders.map((order, index) => (<OrderCard
        key={ index }
        id={ order.id }
        deliveryAddress={ order.deliveryAddress }
        deliveryNumber={ order.deliveryNumber }
        status={ order.status }
        totalPrice={ order.totalPrice }
        saleDate={ order.saleDate }
      />)) }
    </main>
  );
}

export default SellerOrders;
