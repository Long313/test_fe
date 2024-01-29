import { useState } from "react";
import { ItemType } from "../../common/type";
import "./contentStyle.css";
import Rating from "../Rating";
import { FaHeart } from "react-icons/fa";

export default function Content(props: any) {
  const { data } = props;
  const [rating, setRating] = useState(0);
  const [isLike, setIsLike] = useState(false);
  const handleLikeClick = (id : number) => {
    setIsLike(!isLike);
  }
  return (
    <div className="container_content">
      {data.length > 0 &&
        data.map((item: ItemType) => {
          const stars = Math.round(item.rating);
          
          return (
            <div key={item.id} className="container_item_infor">
              <p className="discount">
                Discount {Math.round(Number(item.discountPercentage))}%
              </p>
              <img src={item.thumbnail} alt="img-phone" className="phone_img" />
              <div className="container_text">
                <p className="title">{item.title}</p>
                {/* <p>{item.brand}</p> */}
                {/* <p>{item.description}</p> */}
                {/* <p className="price">{Math.floor(item.price)}$</p> */}
                <div>
                  <Rating value={stars} max={5} />
                  <FaHeart                   
                    color={isLike && item.id ? "red" : "gray"}
                    onClick={() => handleLikeClick(item.id)}
                  />
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
