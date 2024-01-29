import { useEffect, useState } from "react";
import "./headerStyle.css";
import useDebounce from "../../hooks/useDebounce";
import { PRODUCTS_URL_API, SEARCH_PRODUCTS_URL_API } from "../../constants";
import { getAllProduct } from "../../services/api";
export default function Header() {
  const [product, setProduct] = useState<string>("");
  const productValue = useDebounce(product, 500);

   return (
    <div className="container_header">
      <div className="container_seach_field">
        <label htmlFor="search_input" className="label_seach_field">
          Product
        </label>
        <input
          id="search_input"
          placeholder="Enter to search"
          value={productValue}
          onChange={(e) => {
            setProduct(e.target.value);
          }}
        />
      </div>
    </div>
  );
}
