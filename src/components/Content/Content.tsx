import { useState } from "react";
import { ItemType, capitalizeFirstLetter } from "../../common/type";
import "./contentStyle.css";
import Rating from "../Rating";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Content(props: any) {
  const { data } = props;
  const [rating, setRating] = useState(0);
  const [listLiked, setListLiked] = useState<number[]>([]);
  const handleLikeClick = (event: React.MouseEvent, id: number) => {
    const newListLiked = [...listLiked];
    const index = newListLiked.indexOf(id);
    if (index !== -1) {
      newListLiked.splice(index, 1);
    } else {
      newListLiked.push(id);
    }

    setListLiked(newListLiked);
  };

  return (
    <div className="container_content">
      {data.length > 0 &&
        data.map((item: ItemType) => {
          const stars = Math.round(item.rating);
          return (
            <Link
              to={`/product/${item.id}`}
            >
              <div key={item.id} className="container_item_infor">
                <p className="discount">
                  Discount {Math.round(Number(item.discountPercentage))}%
                </p>
                <div className="container_img">
                  <img src={item.thumbnail} alt="img-phone" className="img" />
                </div>
                <div className="container_text">
                  <p className="title">{capitalizeFirstLetter(item.title)}</p>
                  <p className="price">{Math.floor(item.price)}$</p>
                </div>
                <div className="container_icon">
                  <Rating value={stars} max={5} />
                  <div className="container_like">
                    <p className="text_like">Like</p>
                    <FaHeart
                      color={listLiked.includes(item.id) ? "red" : "gray"}
                      onClick={(event) => {
                        event.stopPropagation();
                        handleLikeClick(event, item.id);
                      }}
                    />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
    </div>
  );
}
