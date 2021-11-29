import React, { useContext } from 'react';
import AppContext from '../Context/AppContext';

function DetailsCheckout() {
  const { dataOrder, setDataOrder } = useContext(AppContext);

  const handleChange = ({ target: { name } }) => {
    const result = dataOrder.filter((el) => el.name !== name);
    setDataOrder(result);
  };

  const dataTesteIdItemNumber = 'customer_checkout__element-order-table-item-number-';

  const dataTesteIdName = 'customer_checkout__element-order-table-name-';
  const dataTesteIdQuantidade = 'customer_checkout__element-order-table-quantity-';
  const dataTesteIdSubTotal = 'customer_checkout__element-order-table-sub-total-';

  const dataTesteIdPrice = 'customer_checkout__element-order-table-unit-price-';

  const dataTesteIdRemoverItem = 'customer_checkout__element-order-table-remove-';

  return (
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Descrição</th>
          <th>Quantidade</th>
          <th>Valor Unitário</th>
          <th>Sub-Total</th>
          <th>Remover Item</th>
        </tr>
      </thead>
      <tbody>
        {dataOrder.length !== 0
        && dataOrder.map(({ name, quantity, price, total }, index) => (
          <tr key={ name }>
            <td
              data-testid={ `${dataTesteIdItemNumber}${index}` }
            >
              {index + 1}
            </td>
            <td
              data-testid={ `${dataTesteIdName}${index}` }
            >
              {name}
            </td>
            <td
              data-testid={ `${dataTesteIdQuantidade}${index}` }
            >
              {quantity}
            </td>
            <td
              data-testid={ `${dataTesteIdPrice}${index}` }
            >
              {Number(price).toFixed(2).toString().replace('.', ',')}
            </td>
            <td
              data-testid={ `${dataTesteIdSubTotal}${index}` }
            >
              {Number(total).toFixed(2).toString().replace('.', ',')}
            </td>
            <td>
              <button
                type="button"
                data-testid={ `${dataTesteIdRemoverItem}${index}` }
                name={ name }
                onClick={ handleChange }
              >
                Remover
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DetailsCheckout;
