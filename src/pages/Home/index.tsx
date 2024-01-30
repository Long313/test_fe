import React, { useEffect, useRef, useState } from "react";
import logo from "./logo.svg";
import "./homeStyle.css";
import { Button } from "@mui/material";
import { ItemType } from "../../common/type";
import { PRODUCTS_URL_API, SEARCH_PRODUCTS_URL_API } from "../../constants";
import { getAllProduct, searchProduct } from "../../services/api";
import Header from "../../components/Header";
import Content from "../../components/Content/Content";

function Home() {
  const [data, setData] = useState<ItemType[]>([]);
  const [limit, setLimit] = useState<number>(10);
  const [skip, setSkip] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [paramsSearch, setParamsSearch] = useState<string>("");
  const [searchData, setSearchData] = useState<ItemType[]>([]);

  useEffect(() => {
    getListProduct();
  }, [limit]);
  const getListProduct = async () => {
    try {
      const res = await getListAllProduct(PRODUCTS_URL_API, { limit, skip });
      setData(res.products);
    } catch (err: any) {
      throw new Error(err);
    }
  };
  const getListAllProduct = async (url: string, params: any) => {
    const res = await getAllProduct(url, params);
    return res.data;
  };
  const handleLoadMore = () => {
    setLimit((pre) => pre + 10);
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo(0, containerRef.current.scrollHeight);
    }
  }, [data]);
  const handleGetParamsSearch = (value: string) => {
    setParamsSearch(value);
  };
  useEffect(() => {
    getSearchData(paramsSearch);
  }, [paramsSearch]);

  const getSearchData = async (param: string) => {
    try {
      const data = await getListSearchData(SEARCH_PRODUCTS_URL_API, {
        q: param,
      });
      setSearchData(data);
    } catch (err: any) {
      throw new Error(err);
    }
  };

  const getListSearchData = async (url: string, param: any) => {
    const res = await searchProduct(url, param);
    console.log("res", res);
    return res.data.products;
  };
  useEffect(() => {
    if (!paramsSearch) {
      setSearchData([]);
    }
  }, [paramsSearch]);
  return (
    <div className="App">
      <Header onSearch={handleGetParamsSearch} />
      <div className="container_app" ref={containerRef}>
        {paramsSearch && searchData?.length > 0 ? (
          <Content data={searchData} />
        ) : (
          <div>
            <Content data={data} />
            <div className="container_button">
              <button onClick={handleLoadMore} className="button_loadmore">
                Load More
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
