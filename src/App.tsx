import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import { PRODUCTS_URL_API } from './constants';
import { getAllProduct } from './services/api';
import Content from './components/Content/Content';
import { ItemType } from './common/type';

function App() {
  const [data, setData] = useState<ItemType[]>([]);
  useEffect(() => {
  getListProduct();
  }, []);
  const getListProduct = async () => {
    try {
       const res = await getListAllProduct(PRODUCTS_URL_API);
       console.log("Res123",res);
       setData(res.products)
    } catch (err : any) {
        throw new Error(err)
    }
  } 
  const getListAllProduct = async (url : string) => {
    const res = await getAllProduct(url);
    return res.data
  }
  return (
    <div className="App">
        <Header/>
        <Content data={data}/>
    </div>
  );
}

export default App;
