import fetch from "isomorphic-fetch";
import { API } from "../config";


// *********************** Create Category **********************
export const createBlog = (blog, token) => {
  return fetch(`${API}/api/blog`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: blog
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};