import fetch from "isomorphic-fetch";
import { API } from "../config";


// *********************** Create Category **********************
export const create = (category, token) => {
  return fetch(`${API}/api/category`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};


// **************** List All Categories *******************
export const getCategories = () => {
  return fetch(`${API}/api/categories`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};


// ****************** Get Single Ctegory *****************
export const singleCategory = (slug) => {
  return fetch(`${API}/api/category/${slug}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

// *********************** Delete Category **********************
export const removeCategory = (slug, token) => {
  return fetch(`${API}/api/category/${slug}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
