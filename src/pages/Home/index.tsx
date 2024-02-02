import { useEffect, useRef, useState } from "react";
import "./homeStyle.css";
import { ItemType } from "../../common/type";
import { PRODUCTS_URL_API, SEARCH_PRODUCTS_URL_API } from "../../constants";
import { getAllProduct, searchProduct } from "../../services/api";
import Header from "../../components/Header";
import Content from "../../components/Content/Content";
import InfiniteScroll from "react-infinite-scroll-component";
import { IoIosArrowUp } from "react-icons/io";
import { Link } from "react-router-dom";
import { sortListProduct } from "../../common";

function Home() {
  const [data, setData] = useState<ItemType[]>([]);
  const [limit, setLimit] = useState<number>(20);
  const [skip, setSkip] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [paramsSearch, setParamsSearch] = useState<string>("");
  const [searchData, setSearchData] = useState<ItemType[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [showGoToTop, setShowGoToTop] = useState<boolean>(false);
  const [scrollY, setScrollY] = useState<number>(0);
  const [sortName, setSortName] = useState<string>("");
  useEffect(() => {
    getListProduct();
  }, [limit]);
  const getListProduct = async () => {
    try {
      const res = await getListAllProduct(PRODUCTS_URL_API, { limit, skip });
      setData(res.products);
      setTotal(res.total);
    } catch (err: any) {
      throw new Error(err);
    }
  };
  const getListAllProduct = async (url: string, params: any) => {
    const res = await getAllProduct(url, params);
    return res.data;
  };
  const handleLoadMore = () => {
    setLimit((pre) => pre + 20);
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
    console.log("res", res.data);
    return res.data.products;
  };
  useEffect(() => {
    if (!paramsSearch) {
      setSearchData([]);
    }
  }, [paramsSearch]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowGoToTop(true);
        setHasMore(true);
      } else if (window.scrollY === 0) {
        setShowGoToTop(false);
        setHasMore(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    setHasMore(false);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleChangeSortName = (e: Event | any) => {
    setSortName(e.target.value);
  };
  useEffect(() => {
    const newList = sortListProduct(sortName, data);
    console.log("newList", newList);
  }, [sortName]);
  return (
    <div className="App">
      <Header onSearch={handleGetParamsSearch} />
      <div className="container_app" ref={containerRef}>
        <div className="container_home_left">
          <ul>
            <li>
              <Link to="products/category/smartphones">
                <span>Smartphone</span>
              </Link>
            </li>
            <li>
              <Link to="products/category/laptops">Laptop</Link>
            </li>
            <li>
              <Link to="products/category/fragrances">Fragrances</Link>
            </li>
            <li>
              <Link to="products/category/skincare">Skin care</Link>
            </li>
            <li>
              <Link to="products/category/groceries">Groceries</Link>
            </li>
            <li>
              <Link to="products/category/home-decoration">
                Home decoration
              </Link>
            </li>
            <li>
              <Link to="products/category/furniture">Furniture</Link>
            </li>
            <li>
              <Link to="products/category/womens-dresses">Women dress</Link>
            </li>
            <li>
              <Link to="products/category/mens-shirts">Men shirt</Link>
            </li>
            <li>
              <Link to="products/category/mens-shoes">Men shoes</Link>
            </li>
            <li>
              <Link to="products/category/womens-watches">Women bag</Link>
            </li>
            <li>
              <Link to="products/category/womens-jewellery">
                Women jewellery
              </Link>
            </li>
            <li>
              <Link to="products/category/sunglasses">Sunglasses</Link>
            </li>
            <li>
              <Link to="products/category/lighting">Lighting</Link>
            </li>
          </ul>
          <div className="container_select">
            <p>Sort products</p>
            <select onChange={(e) => handleChangeSortName(e)}>
              <option value="">Sort Item</option>
              <option value="name">Sort by name product from A to Z</option>
              <option value="increase">Price from low to high</option>
              <option value="decrease">Price from hight to low</option>
            </select>
          </div>
        </div>
        <div className="container_home_right">
          {paramsSearch && searchData?.length > 0 ? (
            <Content data={searchData} />
          ) : (
            <div>
              <InfiniteScroll
                dataLength={data.length}
                next={handleLoadMore}
                hasMore={hasMore}
                loader={
                  !hasMore ? (
                    <div></div>
                  ) : (
                    <div className="load-wrapp">
                      <div className="load-6">
                        <div className="letter-holder">
                          <div className="l-1 letter">L</div>
                          <div className="l-2 letter">o</div>
                          <div className="l-3 letter">a</div>
                          <div className="l-4 letter">d</div>
                          <div className="l-5 letter">i</div>
                          <div className="l-6 letter">n</div>
                          <div className="l-7 letter">g</div>
                          <div className="l-8 letter">.</div>
                          <div className="l-9 letter">.</div>
                          <div className="l-10 letter">.</div>
                        </div>
                      </div>
                    </div>
                  )
                }
              >
                <Content data={data} />
              </InfiniteScroll>
            </div>
          )}
        </div>
        {showGoToTop && (
          <button onClick={scrollToTop} className="button_go_to_top">
            <span>
              <IoIosArrowUp size={20} />
            </span>
            <span>Go to top</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default Home;
