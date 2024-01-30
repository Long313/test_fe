import { useEffect, useState } from "react";
import "./productDetail.css";
import { Link, useParams } from "react-router-dom";
import { PRODUCTS_URL_API } from "../../constants";
import { getOneProduct } from "../../services/api";
import Header from "../../components/Header";
import arrow from "../../images/arrowRight.svg";
import home from "../../images/home.svg";
import { capitalizeFirstLetter } from "../../common/type";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

interface DetailType {
  category: string;
  brand: string;
  title: string;
  thumbnail: string;
  images: string[];
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
    console.log("search", searchParam);
  };
  const handleDragStart = () => {};
  const items = dataDetail?.images.map((item: any) => {
    return <img src={item} onDragStart={handleDragStart} role="presentation" />;
  });

  return (
    <div>
      <Header onSearch={handleGetParamsSearch} />
      <div className="container_path">
        <Link to="/">
          <img src={home} alt="home" className="home_img" />
        </Link>
        <Link to="/">
          <span>Home</span>
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
              <AliceCarousel mouseTracking items={items} />
            </div>
          </div>
          <div className="container_detail_right"></div>
        </div>
      </div>
      ;
    </div>
  );
}
