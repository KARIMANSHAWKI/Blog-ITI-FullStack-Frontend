import fetch from "isomorphic-fetch";
import { API } from "../config";

// *********************** userPublicProfile**********************
export const userPublicProfile = username => {
  return fetch(`${API}/api/user/${username}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    }
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

// *********************** const**********************
export const getProfile = token => {
  return fetch(`${API}/api/user/profile`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization : `Bearer ${token}`
    }
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};


// *********************** const**********************
export const update = (token, user) => {
  return fetch(`${API}/api/user/update`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization : `Bearer ${token}`
    },
    body : user
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
