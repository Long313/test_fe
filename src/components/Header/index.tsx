import { useEffect, useState } from "react";
import "./headerStyle.css";
import useDebounce from "../../hooks/useDebounce";
import { PRODUCTS_URL_API, SEARCH_PRODUCTS_URL_API } from "../../constants";
import { getAllProduct } from "../../services/api";
interface HeaderType {
  onSearch?: any;
}
export default function Header(props: HeaderType) {
  const { onSearch } = props;
  const [searchProduct, setSearchProduct] = useState<string>("");
  const productValue = useDebounce(searchProduct, 100);
  useEffect(() => {
    onSearch(productValue);
  }, [searchProduct]);
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
            setSearchProduct(e.target.value);
          }}
        />
      </div>
    </div>
  );
}
