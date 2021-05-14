import fetch from "isomorphic-fetch";
import { API } from "../config";
import queryString from "query-string";
import { isAuth } from "./auth";
import { handleResponse } from "./auth";

// *********************** Create Blog **********************
export const createBlog = (blog, token) => {
  let createBlogEndpoint;

  if (isAuth() && isAuth().role === 1) {
    createBlogEndpoint = `${API}/api/blog`;
  } else {
    createBlogEndpoint = `${API}/api/user/blog`;
  }

  return fetch(`${createBlogEndpoint}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: blog,
  })
    .then((response) => {
      handleResponse(response);
      return response.json();
    })
    .catch((err) => console.log(err));
};

// *********************** listBlogWithTagsAndCategory ********************
export const listBlogWithTagsAndCategory = (skip, limit) => {
  const data = {
    limit,
    skip,
  };

  return fetch(`${API}/api/blogs-categories-tags`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

// **************************** Single Blog *****************************
export const singleBlog = (slug) => {
  return fetch(`${API}/api/blog/${slug}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

// *********************** List all related blogs ****************************
export const listRelated = (blog) => {
  return fetch(`${API}/api/blogs/related`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(blog),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const list = (username) => {
  let listBlogEndpoint;

  if (username) {
    listBlogEndpoint = `${API}/api/${username}/blogs`;
  } else {
    listBlogEndpoint = `${API}/api/blogs`;
  }

  return fetch(`${listBlogEndpoint}`, {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

export const removeBlog = (slug, token) => {
  let removeBlogEndpoint;

  if (isAuth() && isAuth().role === 1) {
    removeBlogEndpoint = `${API}/api/blog/${slug}`;
  } else {
    removeBlogEndpoint = `${API}/api/user/blog/${slug}`;
  }

  return fetch(`${removeBlogEndpoint}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      handleResponse(response);
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const updateBlog = (blog, token, slug) => {
  let updateBlogEndpoint;

  if (isAuth() && isAuth().role === 1) {
    updateBlogEndpoint = `${API}/api/blog/${slug}`;
  } else if (isAuth() && isAuth().role === 0) {
    updateBlogEndpoint = `${API}/api/user/blog/${slug}`;
  }

  return fetch(`${updateBlogEndpoint}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: blog,
  })
    .then((response) => {
      handleResponse(response)
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const listSearch = (params) => {
  let query = queryString.stringify(params);
  console.log("query params", query);
  return fetch(`${API}/api/blog/search?${query}`, {
    method: "GET",
  })
    .then((response) => {
      handleResponse(response);
      return response.json();
    })
    .catch((err) => console.log(err));
};
