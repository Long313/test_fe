import api from "../utils/api";
const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
};

export const getAllProduct = (url: string, params: any) => {
  return api({
    headers,
    method: "GET",
    url: `/${url}`,
    params: {
      ...params,
    },
  });
};

export const searchProduct = (url: string, params: any) => {
  return api({
    headers,
    method: "GET",
    url: `/${url}`,
    params: {
      ...params,
    },
  });
};

export const getOneProduct = (url: string, id: any) => {
  return api({
    headers,
    method: "GET",
    url: `/${url}/${id}`,

  });
};

export const getListProductOfCategory = (url: string, param : any) => {
  return api({
    headers,
    method: "GET",
    url: `/${url}/${param}`,

  });
};
