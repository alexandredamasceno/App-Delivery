import axios from 'axios';

const URL = 'http://localhost:3001/saleProducts';

const getSaleProducts = async (id) => {
  try {
    const result = await axios.get(`${URL}/${id}`);
    return result.data;
  } catch (e) {
    return e.response.data.message;
  }
};

export default getSaleProducts;
