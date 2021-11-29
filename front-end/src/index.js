import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';

ReactDOM.render(
<BrowserRouter>
    <App />
</BrowserRouter>,
document.getElementById('root')
);


const a = 10;
const b = 85;

const main = (x,y) =>{
    const result = (x*y)/12
    return result.toFixed(3)
}
console.log(main(a,b));