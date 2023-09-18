import axios from "axios";
import SignContext from "../Context/SignContext";
import React from "react";

export const SignState = (props) => {
  const url = `${process.env.REACT_APP_BASE_URL}`;

  //Register User
  const registerUser = async (UserInfo , profilePhoto ) => {
    const formData = new FormData();
    try{
    formData.append("name" , UserInfo.name);
    formData.append("email" , UserInfo.email);
    formData.append("password" , UserInfo.password);
    formData.append("confirmPassword" , UserInfo.confirmPassword);
    formData.append("roles" , UserInfo.roles);
    formData.append("status" , UserInfo.status);
    if (profilePhoto) {
      formData.append("profilePhoto", profilePhoto);
    }
    const response = await axios.post(`${url}/api/register`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  }
  catch (error) {
    console.error("Error during API call:", error);
  }
  };


  // try {
  //   if (UserInfo.password !== UserInfo.confirmPassword) {
  //     return {
  //       success: false,
  //       msg: "Password and confirm password do not match",
  //     };
  //   }
  //   const response = await axios.post(`${url}/api/register`, UserInfo);
  //   return response;
  // } catch (error) {
  //   return ({ success: false, msg: "server Error" })
  // }



  //Login User
  const loginUser = async (UserInfo) => {
    try {
      const response = await axios.post(`${url}/api/login`, UserInfo);
      return response;
    } catch (error) {
      console.error("Error during API call:", error);
      // return ({ success: false, msg: "server Error" })
    }
  };

  //Forgot Password
  const forgotPassword = async (UserInfo) => {
    try {
      const response = await axios.post(
        `${url}/api/forgotpassword`,
        UserInfo
      );

      return response;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  //Reset Password
  const resetPassword = async (resetToken, password) => {
    try {
      const response = await axios.put(
        `${url}/api/users/resetpassword/${resetToken}`,
        { password: password }
      );
      return response.data;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  // Update Password
  const changePassword = async (UserInfo, Token) => {
    try {
      const response = await axios.post(`${url}/api/updatepassword`, {
        ...UserInfo,
        token: Token,
      });
      return response;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  // Get LoggedInUser
  const getLoggedInUser = async (Token) => {
    try {
      const response = await axios.post(`${url}/api/getloggedinuser`, {
        token: Token,
      });
      return response;
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  // Get Specific user
  const getSpecificUser = async (id, role) => {
    try {
      const response = await axios.post(`${url}/api/getspecificuser`, {
        id: id,
        roles: [role],
      });
      return response;
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  // GetUsers
  const getUsers = async () => {
    try {
      const response = await axios.post(`${url}/api/getusers`);
      return response;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };


  // Update User
  const updateUser = async (userInfo,profilePhoto) => {
    try {
      const formData = new FormData();
      formData.append("name", userInfo.name);
      formData.append("roles", userInfo.roles);
      formData.append("status", userInfo.status);
      formData.append("id", userInfo._id);
      if (profilePhoto) {
        formData.append("profilePhoto", profilePhoto);
      }

      const response = await axios.post(`${url}/api/updateuser`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response;
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  // delete user
  const deleteUser = async (userId) => {
    try {
      const response = await axios.post(`${url}/api/deleteuser`, {
        id: userId,
      });
      return response;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  // Get roles
  const GetRoles = async () => {
    try {
      const response = await axios.post(`${url}/api/getroles`, {});
      return response;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  // GetrolesSpecificpermissions
  const GetRoleSpecificPermission = async (role) => {
    try {
      const response = await axios.post(`${url}/api/getrolespecificpermisson`, {
        role: role,
      });
      return response.data;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  // Add Product
  const addProduct = async (ProductData , imageGallery ,mainImage) => {
    try {
      const formData = new FormData();
      formData.append("name", ProductData.name);
      formData.append("description", ProductData.description);
      formData.append("category", ProductData.category);
      formData.append("subCategory", ProductData.subCategory);
      formData.append("original", ProductData.original);
      formData.append("discounted", ProductData.discounted);
      formData.append("stock", ProductData.stock);
      formData.append("sku", ProductData.sku);
      formData.append("status", ProductData.status);
      // formData.append("original", ProductData.original);
      // formData.append("original", ProductData.original);
      if (mainImage) {
        formData.append("mainImage", mainImage);
      }
      if (imageGallery) {
        console.log(imageGallery)
        formData.append("imageGallery", imageGallery);
      }
      const response = await axios.post(
        `${url}/api/addproduct`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response;
    } catch (error) {
      console.error('Axios Error:', error);
    }
  };
  
  // Add Category
  const addCategory = async (categoryData) => {
    try {
      const response = await axios.post(`${url}/api/addcategory`, categoryData);
      return response 
    } catch (error) {
      console.error('Error adding category:', error);
      return { success: false, msg: 'An error occurred while adding the category.' };
    }
  }

  // Get Categories
  const getCategories = async () => {
    try {
      const response = await axios.post(`${url}/api/getcategories`);
      return response;
    } catch (error) {
      return ({ success: false, msg: "server Error" })
    }
  };

  //Get Specific SubCategories 
  const getSpecificSubcategories = async (categoryId) => {
    try {
      const response = await axios.post(`${url}/api/${categoryId}/subcategories`);
      return response;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  // Get Products  
  const getProducts = async () => {
    try {
      const response = await axios.post(`${url}/api/getallproducts`);
      return response;
    
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  // Update Products
  const updateProduct = async (productData, id ,mainImage) => {
    try {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("name", productData.name);
      formData.append("description", productData.description);
      formData.append("category", productData.category);
      formData.append("subCategory", productData.subCategory);
      formData.append("original", productData.prices.original);
      formData.append("discounted", productData.prices.discounted);
      formData.append("stock", productData.stock);
      formData.append("sku", productData.sku);
      formData.append("status", productData.status);
      
      if (mainImage) {
        formData.append("mainImage", mainImage);
      }
      const response = await axios.post(`${url}/api/updateproduct`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response;
    } catch (error) {
      console.error('Axios Error:', error);
      return { success: false, msg: "server Error" };
    }
  };

  // GetSpecific Product
  const getSpecificProduct = async (ProductId) => {
    try {
      const response = await axios.post(`${url}/api/getspecificproduct`, {
        id: ProductId,
      });
      return response;
    } catch (error) {
      return ({ success: false, msg: "server Error" })
    }
  };

  // Delete Product 
  const deleteProduct = async (ProductId) =>{
    try {
      const response = await axios.post(`${url}/api/deleteproduct`, {
        id: ProductId,
      });
      return response;
    } catch (error) {
      return ({ success: false, msg: "server Error" })
    }
  } 

  // Get All Customer
  const getCustomers = async () => {
    try {
      const response = await axios.post(`${url}/customer/getcustomers`);
      return response;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  // Create Customer 
  const createCustomer = async (customerInfo)=>{
    try {
      const response = await axios.post(`${url}/customer/register`, customerInfo);
      return response 
    } catch (error) {
      console.error('Error adding category:', error);
      return { success: false, msg: 'An error occurred while adding the category.' };
    }
  }

  // Get Specific Customer
  const GetSpecificCustomer = async (id) => {
    try {
      const response = await axios.post(`${url}/customer/getSpecificCustomer`, {
        id: id,
      });
      return response;
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  // Get All Content
  const GetContent = async () => {
    try {
      const response = await axios.post(`${url}/content/getcontent`);
      return response;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  // Add Content
  const addContent = async (ContentData) => {
    try {
      const response = await axios.post(`${url}/content/createcontent`, ContentData);
      return response 
    } catch (error) {
      console.error('Error adding content:', error);
      return { success: false, msg: 'An error occurred while adding the category.' };
    }
  } 

  // Get Specific Content
  const GetSpecificContent = async (id) => {
    try {
      const response = await axios.post(`${url}/content/getspecificcontent/${id}`, {

      });
      return response;
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  // Update Content
  const UpdateContent = async (contentData ,id) => {
    try {
      const response = await axios.post(`${url}/content/updatecontent/${id}`, contentData);
      return response;
    } catch (error) {
      console.error('Axios Error:', error);
    }
  };

  // Delete content
  const DeleteContent = async (id) =>{
    try {
      const response = await axios.post(`${url}/content/deletecontent/${id}`, {
    
      });
      return response;
    } catch (error) {
      return ({ success: false, msg: "server Error" })
    }
  } 

  // Get GalleryCategory 
  const GetGalleryCat = async () => {
    try {
      const response = await axios.post(`${url}/gallery/getgallerycat`);
      return response;
    
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  // create GalleryCat
  const createGalleryCat = async (GalleryData ,imagePath) => {
    try {
      const formData = new FormData();
      formData.append("gallaryCategoryTitle", GalleryData.gallaryCategoryTitle);
      formData.append("description", GalleryData.description);
      formData.append("active", GalleryData.active);
      formData.append("deleted", GalleryData.deleted);
      if (imagePath) {
        formData.append("imagePath", imagePath);
      }
      const response = await axios.post(
        `${url}/gallery/creategallery`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response;
    } catch (error) {
      console.error('Axios Error:', error);
    }
  };

  // Get SpecificGalleryCat By Id
  const GetSpecificGalleryCatbyId = async (galleryId) => {
    try {
      const response = await axios.post(`${url}/gallery/getspecificgallery/${galleryId}`, {

      });
      return response;
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  // Update GalleryCat
  const UpdateGalleryCat = async (GalleryData, imagePath , GallaryId) => {
    try {
      const formData = new FormData();
      console.log(GallaryId)
      formData.append("gallaryCategoryTitle", GalleryData.gallaryCategoryTitle);
      formData.append("description", GalleryData.description);
      formData.append("active", GalleryData.active);
      formData.append("deleted", GalleryData.deleted);
      
      if (imagePath) {
        formData.append("imagePath", imagePath);
      }
      const response = await axios.post(`${url}/gallery/updategallery/${GallaryId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response;
    } catch (error) {
      console.error('Axios Error:', error);
      return { success: false, msg: "server Error" };
    }
  };

  // Delete GalleryContent 
  const DeleteGalleryCat = async (id) =>{
    try {
      const response = await axios.post(`${url}/gallery/deletegallerycat/${id}`, {
    
      });
      return response;
    } catch (error) {
      return ({ success: false, msg: "server Error" })
    }
  } 

  // Get GalleryDetails
  const GetGalleryDetails = async () => {
    try {
      const response = await axios.post(`${url}/gallerydetails/getgalleries`);
      return response;
    
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  // create galleryDetails
  const createGalleryDetails = async (GalleryDetailsData ,imagePath) => {
    try {
      const formData = new FormData();
      formData.append("imageTitle", GalleryDetailsData.imageTitle);
      formData.append("description", GalleryDetailsData.description);
      formData.append("galleryCategory", GalleryDetailsData.galleryCategory);
      formData.append("active", GalleryDetailsData.active);
      formData.append("deleted", GalleryDetailsData.deleted);
      if (imagePath) {
        formData.append("imagePath", imagePath);
      }
      const response = await axios.post(
        `${url}/gallerydetails/creategalleryitem`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response;
    } catch (error) {
      console.error('Axios Error:', error);
    }
  };

  // GetSpecific GalleryDetails
  const GetSpecificGalleryDetails = async (id) => {
    try {
      const response = await axios.post(`${url}/gallerydetails/getspecificgalleryitem/${id}`, {

      });
      return response;
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };
 
  // Update GalleyDetails
  const updateGalleryDetails = async (GalleryDetailsData ,imagePath , id) => {
    try {
      const formData = new FormData();
      formData.append("imageTitle", GalleryDetailsData.imageTitle);
      formData.append("description", GalleryDetailsData.description);
      formData.append("galleryCategory", GalleryDetailsData.galleryCategory);
      formData.append("active", GalleryDetailsData.active);
      formData.append("deleted", GalleryDetailsData.deleted);
      if (imagePath) {
        formData.append("imagePath", imagePath);
      }
      const response = await axios.post(
        `${url}/gallerydetails/updategalleryitem/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response;
    } catch (error) {
      console.error('Axios Error:', error);
    }
  };

   // Delete GalleryDetails 
   const DeleteGalleryDetails = async (id) =>{
    try {
      const response = await axios.post(`${url}/gallerydetails/deletegalleryitem/${id}`, {
    
      });
      return response;
    } catch (error) {
      return ({ success: false, msg: "server Error" })
    }
  } 




  return (
    <SignContext.Provider
      value={{
        registerUser,
        loginUser,
        forgotPassword,
        resetPassword,
        changePassword,
        getLoggedInUser,
        getSpecificUser,
        getUsers,
        updateUser,
        deleteUser,
        GetRoles,
        GetRoleSpecificPermission,
        addProduct,
        addCategory,
        getCategories,
        getSpecificSubcategories,
        getProducts,
        updateProduct,
        getSpecificProduct,
        deleteProduct,
        getCustomers,
        createCustomer,
        GetSpecificCustomer,
        GetContent,
        addContent,
        GetSpecificContent,
        UpdateContent,
        DeleteContent,
        GetGalleryCat,
        createGalleryCat,
        GetSpecificGalleryCatbyId,
        UpdateGalleryCat,
        DeleteGalleryCat,
        GetGalleryDetails,
        createGalleryDetails,
        GetSpecificGalleryDetails,
        updateGalleryDetails,
        DeleteGalleryDetails,
      }}
    >
      {props.children}
    </SignContext.Provider>
  );
};
