import { Link, useParams } from "react-router-dom";
import Header from "../../components/Header";
import "./categoryProductStyle.css";
import arrow from "../../images/arrowRight.svg";
import home from "../../images/home.svg";
import { useEffect, useState } from "react";
import { ItemType, capitalizeFirstLetter } from "../../common/type";
import Content from "../../components/Content/Content";
import { getListProductOfCategory } from "../../services/api";
import { PRODUCTS_CATEGORY_URL_API } from "../../constants";

function CategoryProduct() {
  const [data, setData] = useState<ItemType[]>([]);
  let { name } = useParams();
  const handleGetParamsSearch = (searchParam: string) => {
    
  };
  useEffect(() => {
    getCategoryProduct();
  }, []);
  const getCategoryProduct = async () => {
    try {
      const data = await getListCategoryProduct(name);
      setData(data);
    } catch (err: any) {
      throw new Error(err);
    }
  };
  const getListCategoryProduct = async (name: any) => {
    const res = await getListProductOfCategory(PRODUCTS_CATEGORY_URL_API, name);
    return res.data.products;
  };
  return (
    <div className="container_product_category">
      <Header onSearch={handleGetParamsSearch} />
      <div className="container_path">
        <Link to="/">
          <img src={home} alt="home" className="home_img" />
        </Link>
        <Link to="/">
          <span className="home_link">Home</span>
        </Link>
        <img src={arrow} alt="arrow right" />
        <span>Product</span>
        <img src={arrow} alt="arrow right" />
        <span>{capitalizeFirstLetter(name)}</span>
      </div>
      <div className="container_home_right">
        {data.length > 0 && <Content data={data} />}
      </div>
    </div>
  );
}

export default CategoryProduct;
