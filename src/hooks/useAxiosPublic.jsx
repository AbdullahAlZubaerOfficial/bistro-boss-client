import axios from "axios";
// import React from 'react';

const axiosPublic = axios.create({
  baseURL: "https://y-one-kohl.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
