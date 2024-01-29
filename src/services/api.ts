import { StringLiteralType } from "typescript";
import api from "../utils/api";
const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
 };

 export const getAllProduct = (url: string) => {
    return api({
      headers,
      method: "GET",
      url: `/${url}`
    });
  };

// export const getAllProduct = (url: string, params: any) => {
//   return api({
//     headers,
//     method: "POST",
//     url: `/${url}`,
//     params: {
//       ...params,
//     },
//   });
// };