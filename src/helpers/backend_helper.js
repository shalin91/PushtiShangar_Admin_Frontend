import { APIClient } from "./api_helper";

import * as url from "./url_helper";

const api = new APIClient();

const hostedUrl = `${process.env.REACT_APP_BASE_URL}`;


// Gets the logged in user data from local session
export const getLoggedInUser = () => {
  const user = localStorage.getItem("user");
  if (user) return JSON.parse(user);
  return null;
};

// Register Method
export const postFakeRegister = (data) =>
  api.create(url.POST_FAKE_REGISTER, data);

// Login Method
export const postFakeLogin = (data) => api.create(url.POST_FAKE_LOGIN, data);

// postForgetPwd
export const postFakeForgetPwd = (data) =>
  api.create(url.POST_FAKE_PASSWORD_FORGET, data);

// Edit profile
export const postJwtProfile = (data) =>
  api.create(url.POST_EDIT_JWT_PROFILE, data);

export const postFakeProfile = (data) =>
  api.update(url.POST_EDIT_PROFILE + "/" + data.idx, data);

// Register Method
export const postJwtRegister = (url, data) => {
  return api.create(url, data).catch((err) => {
    var message;
    if (err.response && err.response.status) {
      switch (err.response.status) {
        case 404:
          message = "Sorry! the page you are looking for could not be found";
          break;
        case 500:
          message =
            "Sorry! something went wrong, please contact our support team";
          break;
        case 401:
          message = "Invalid credentials";
          break;
        default:
          message = err[1];
          break;
      }
    }
    throw message;
  });
};

//category
export const addCategory = (data) =>
  api.create(hostedUrl+"/category/addcategory", data);
export const deleteCategory = (data) =>
  api.create(hostedUrl+"/category/deletecategory/" + data._id);
export const getCategory = async () =>
  await api.create(hostedUrl+"/category/getcategories");
export const updateCategory = (data, id) =>
  api.create(hostedUrl+"/category/updatecategory/" + id, data);

// export const getProducts = async() => await api.create(hostedUrl+"/product/getallproducts");
// export const deleteProduct = async(id) => await api.create(`${hostedUrl}/product/deleteproduct/${id}` , {});

// sub category
export const getSubCategory = async () =>
  await api.create(hostedUrl+"/subcategory/getsubcategories");

//sub sub category

export const getSubSubCategory = async () =>
  await api.create(hostedUrl+"/subsubcategory/getsubsubcategories");

export const getGst = async () =>
  await api.create(hostedUrl+"/gst/getGst");

//product
export const getProducts = async () =>
  await api.create(hostedUrl+"/product/getallproducts");
export const addProduct = async (data) =>
  await api.create(hostedUrl+"/product/addproduct", data);
export const updateProduct = async (data, id) =>
  await api.create(`${hostedUrl}/product/updateproduct/${id}`, data);
export const deleteProduct = async (id) =>
  await api.create(`${hostedUrl}/product/deleteproduct/${id}`);

export const getColor = async () =>
  await api.create(hostedUrl+"/color/getcolors");
export const getMaterial = async () =>
  await api.create(hostedUrl+"/material/getmaterial");
export const getSeason = async () =>
  await api.create(hostedUrl+"/season/getseasons");

export const getDailyPrice = async () =>
  await api.create(hostedUrl+"/dailyrates/getprices");
