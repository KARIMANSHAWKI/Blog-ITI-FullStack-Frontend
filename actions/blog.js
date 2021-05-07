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


export const listBlogWithTagsAndCategory = (skip, limit) => {
  const data = {
    limit,
    skip
  }

  return fetch(`${API}/api/blogs-categories-tags`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      'Content-Type' : 'application/json'
    },
    body :JSON.stringify(data)
    
  })
    .then(response => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const singleBlog = slug => {
      return fetch(`${API}/api/blog/${slug}`,{
        method : 'GET'
      }).then(res =>{
        return res.json();
      })
      .catch(err=> console.log(err))
}