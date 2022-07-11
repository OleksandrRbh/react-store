// import logo from './logo.svg';
import './index.css';
import Card from '../Card'

import { useState } from 'react'

function App() {
  const [state] = useState({
    product: {
      "id": "76w0hz7015kkr9kjkav",
      "images": [
        "https://content2.rozetka.com.ua/goods/images/big_tile/163399632.jpg",
        "https://content.rozetka.com.ua/goods/images/big_tile/163399633.jpg"
      ],
      "title": "Ноутбук Acer Aspire 3 A315-57G-336G (NX.HZREU.01S) Charcoal Black",
      "rating": 2.89,
      "price": 15999,
      "category": "laptops",
      "brand": "acer"
    }
  })

  return (
    <div className="App">
      <h1>App component</h1>
      <br/>
      <Card product={state.product} />
    </div>
  );
}

export default App;
