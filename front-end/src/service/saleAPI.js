import axios from 'axios';

const URL = 'http://localhost:3001/sales';

const getSale = async () => {
  try {
    const result = await axios.get(URL);
    return result.data;
  } catch (e) {
    return e.response.data.message;
  }
};

export default getSale;
