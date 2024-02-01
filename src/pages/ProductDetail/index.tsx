import { useEffect, useState } from "react";
import "./productDetail.css";
import { Link, useParams } from "react-router-dom";
import { PRODUCTS_URL_API } from "../../constants";
import { getOneProduct } from "../../services/api";
import Header from "../../components/Header";
import arrow from "../../images/arrowRight.svg";
import home from "../../images/home.svg";
import { capitalizeFirstLetter } from "../../common/type";
import { toast } from "react-toastify";
import { FaCartShopping } from "react-icons/fa6";

interface DetailType {
  category: string;
  brand: string;
  title: string;
  thumbnail: string;
  images: string[];
  description: string;
  price: number;
}

export default function ProductDetail() {
  const [dataDetail, setDataDetail] = useState<DetailType | null>(null);
  let { id } = useParams();
  useEffect(() => {
    if (id) {
      getDataDetailProduct(id);
    }
  }, []);

  const getDataDetailProduct = async (id: string) => {
    try {
      const data = await getDataDetail(PRODUCTS_URL_API, id);
      setDataDetail(data);
    } catch (err: any) {
      throw new Error(err);
    }
  };

  const getDataDetail = async (url: string, id: string) => {
    const res = await getOneProduct(url, id);
    return res.data;
  };
  const handleGetParamsSearch = (searchParam: string) => {
  };

  const handleAddToCart = () => {
    toast.success("Add product into cart success 🚀", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  return (
    <div>
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
        <span className="category">
          {capitalizeFirstLetter(dataDetail?.category)}
        </span>
        <img src={arrow} alt="arrow right" />
        <span>{capitalizeFirstLetter(dataDetail?.brand)}</span>
        <img src={arrow} alt="arrow right" />
        <span>{capitalizeFirstLetter(dataDetail?.title)}</span>
      </div>
      <div className="container_detail">
        <h2>{capitalizeFirstLetter(dataDetail?.title)}</h2>
        <div className="container_infor">
          <div className="container_detail_left">
            <div className="container_img_detail">
              <img src={dataDetail?.thumbnail} alt="img-product" />
            </div>
          </div>
          <div className="container_detail_right">
            <button onClick={handleAddToCart} className="button_add">
              <span className="text">ADD TO CART</span>
              <div className="container_icon">
                <FaCartShopping size={22}/>
                <p className="add_icon">+</p>
              </div>
            </button>
            <div className="container_infor_product">
              <p className="title">Information Product</p>
              <p className="desciption">{dataDetail?.description}</p>
              <p className="price">{dataDetail?.price} $</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
