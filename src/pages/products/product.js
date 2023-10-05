import React, { useCallback, useState, useMemo, useEffect } from "react";
import JoditEditor from "jodit-react";
import {
  Card,
  CardBody,
  Col,
  Row,
  FormFeedback,
  Spinner,
  CardHeader,
  Form,
  Container,
  Label,
  Input,
  Button,
  CardFooter,
} from "reactstrap";
import { isEmpty } from "lodash";
import DeleteModal from "../../Components/Common/DeleteModal";
import FeatherIcon from "feather-icons-react";
import Dropzone from "react-dropzone";
import { Link, useNavigate } from "react-router-dom";
import { Formik, useFormik } from "formik";
import { ToastContainer } from "react-toastify";
import Cleave from "cleave.js/react";

import * as Yup from "yup";
import {
  addProduct,
  deleteProduct,
  getProducts,
  updateProduct,
  getCategory,
  getSubCategory,
  getSubSubCategory,
  getGst,
} from "../../helpers/backend_helper";

const ProductMaster = () => {
  const url = `${process.env.REACT_APP_BASE_URL}`;
  const [IsformActive, setIsformActive] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [productData, setProductData] = useState([]);
  const [allProductData, setallProductData] = useState([]);
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [subCatDropbind, setSubCatDropbind] = useState([]);
  const [subSubCategoryData, setSubSubCategoryData] = useState([]);
  const [subSubCatDropbind, setSubSubCatDropbind] = useState([]);
  const [GstData, setGstData] = useState([]);
  const [selectedFiles, setselectedFiles] = useState([]);
  const [buttnLoading, setButtnLoading] = useState(false);
  const [valuesForUpdate, setValuesForUpdate] = useState("");
  const [SilverGoldDropdown, showSilverGoldDropdown] = useState(false);

  function handleAcceptedFiles(files) {
    const updatedSelectedFiles = selectedFiles.concat(files);

    productForm.setFieldValue("imageGallery", updatedSelectedFiles);

    files.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        // formattedSize: formatBytes(file.size),
      })
    );
    console.log(files);
    setselectedFiles(updatedSelectedFiles);
  }

  const fetchDropdownData = async () => {
    try {
      const res = await getCategory();
      setCategoryData(res);

      const res2 = await getSubCategory();
      setSubCategoryData(res2);
      setSubCatDropbind(res2)

      const res3 = await getSubSubCategory();
      setSubSubCategoryData(res3);
      setSubSubCatDropbind(res3)

      const gstData = await getGst();
      setGstData(gstData);


    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handelCategorySelect = (e) => {
    const data = subCategoryData.filter(
      (item) => item.Category === e.target.value
    );
    setSubCatDropbind(data);
  };

  const handelSubCategorySelect = (event) => {
    const data = subSubCategoryData.filter(
      (item) => item.SubCategory === event.target.value
    );
    setSubSubCatDropbind(data);
  };

  const config = useMemo(
    () => ({
      readonly: false,
    }),
    []
  );

  const searchList = (e) => {
    let inputVal = e.toLowerCase();

    function filterItems(arr, query) {
      return arr.filter(function (el) {
        return el.name.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||  el.sku.toLowerCase().indexOf(query.toLowerCase()) !== -1;
      });
    }

    let filterData = filterItems(allProductData, inputVal);
    setProductData(filterData);
    if (filterData.length === 0) {
      document.getElementById("noresult").style.display = "block";
      document.getElementById("todo-task").style.display = "none";
    } else {
      document.getElementById("noresult").style.display = "none";
      document.getElementById("todo-task").style.display = "block";
    }
  };

  const fetchData = async () => {
    try {
      setIsFetchingData(true);

      const response = await getProducts();

      setProductData(response.products);
      setallProductData(response.products);
      setIsFetchingData(false);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const toggle = useCallback(() => {
    if (IsformActive) {
      setIsformActive(false);
    } else {
      setIsformActive(true);
    }
  }, [IsformActive]);

  useEffect(() => {
    if (!productData.length) {
      fetchData();
      fetchDropdownData();
    }
  }, [getProducts, selectedFiles]);

  const handleDeleteModal = (itemForDelete) => {
    setValuesForUpdate(itemForDelete);
    setDeleteModal(true);
  };

  const handledeleteProduct = async () => {
    if (valuesForUpdate) {
      await deleteProduct(valuesForUpdate._id);
      fetchData();
      setDeleteModal(false);
    }
  };

  const handleEdit = useCallback(
    (arg) => {
      setIsEdit(true);
      const selectedItem = arg;
      setValuesForUpdate({
        _id: selectedItem._id,
        name: selectedItem.name,
        original: selectedItem.prices ? selectedItem.prices.original : null,
        discounted: selectedItem.prices ? selectedItem.prices.discounted : null,
        category: selectedItem.category,
        subCategory: selectedItem.subCategory,
        subSubCategory: selectedItem.subSubCategory,
        sku: selectedItem.sku,
        isProductPopular: selectedItem.isProductPopular,
        isProductNew: selectedItem.isProductNew,
        isActive: selectedItem.isActive,
        description: selectedItem.description,
        stock: selectedItem.stock ? selectedItem.stock.quantity : null,
        prices: selectedItem.prices,
        gst: selectedItem.gst,
      });
      const images = selectedItem.imageGallery.map((item) => {
        return { name: item, preview: `${url}/products/${item}` };
      });

      setselectedFiles(images);
      console.log("values", selectedItem);

      toggle();
    },
    [toggle]
  );

  const productForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: (valuesForUpdate && valuesForUpdate.name) || "",
      original: (valuesForUpdate && valuesForUpdate.original) || "",
      discounted: (valuesForUpdate && valuesForUpdate.discounted) || "",
      category: (valuesForUpdate && valuesForUpdate.category) || "",
      subCategory: (valuesForUpdate && valuesForUpdate.subCategory) || "",
      subSubCategory: (valuesForUpdate && valuesForUpdate.subSubCategory) || "",
      stock: (valuesForUpdate && valuesForUpdate.stock) || "",
      prices: (valuesForUpdate && valuesForUpdate.prices) || "",
      sku: (valuesForUpdate && valuesForUpdate.sku) || "",
      isProductPopular:
        (valuesForUpdate && valuesForUpdate.isProductPopular) || true,
      isProductNew: (valuesForUpdate && valuesForUpdate.isProductNew) || true,
      isActive: (valuesForUpdate && valuesForUpdate.isActive) || true,
      description: (valuesForUpdate && valuesForUpdate.description) || "",
      imageGallery: (valuesForUpdate && valuesForUpdate.imageGallery) || [],
      gst: (valuesForUpdate && valuesForUpdate.gst) || [],
    },

    validationSchema: Yup.object({
      // name: Yup.string().required("required"),
      // original: Yup.number().typeError("Must be a number").required("required"),
      // stock: Yup.number().typeError("Must be a number").required("required"),
      // discounted: Yup.number()
      //   .typeError("Must be a number")
      //   .required("required"),
      // sku: Yup.string().required("required"),
      // category: Yup.string().required("required"),
      // subCategory: Yup.string().required("required"),
      // description: Yup.string().required("required"),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("category", values.category);
      formData.append("subCategory", values.subCategory);
      formData.append("subSubCategory", values.subSubCategory);
      formData.append("original", values.original);
      formData.append("discounted", values.discounted);
      formData.append("stock", values.stock);
      formData.append("sku", values.sku);
      formData.append("isProductPopular", values.isProductPopular);
      formData.append("isProductNew", values.isProductNew);
      formData.append("gst", values.gst);
      formData.append("isActive", values.isActive);
      for (let i = 0; i < values.imageGallery.length; i++) {
        formData.append("imageGallery", values.imageGallery[i]);
      }
      console.log(valuesForUpdate)
      try {
        setButtnLoading(true);
        if (isEdit) {
          await updateProduct(formData, valuesForUpdate._id);
        } else {
          await addProduct(formData);
        }
        console.log(formData);
        productForm.resetForm();
        toggle();
        setButtnLoading(false);

        fetchData();
      } catch (error) {
        setButtnLoading(false);

        console.log("Error submitting the form data:", error);
      }
    },
  });

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={() => handledeleteProduct()}
        onCloseClick={() => setDeleteModal(false)}
      />
      <ToastContainer closeButton={false} />
      <div className="page-content">
        <Container fluid>
          <Card>
            <CardHeader className="d-flex justify-content-between align-items-center">
              {!IsformActive ? (
                <React.Fragment>
                  <h4 className="card-title mb-0">Product Master</h4>
                  <Row className="align-items-center">
                    <Col className="col-lg-auto">
                      <div className="search-box">
                        <input
                          type="text"
                          id="searchTaskList"
                          className="form-control search"
                          placeholder="Search by product name"
                          onKeyUp={(e) => searchList(e.target.value)}
                        />
                        <i className="ri-search-line search-icon"></i>
                      </div>
                    </Col>
                    <Col className="col-lg-auto">
                      <button
                        className="btn btn-primary createTask"
                        type="button"
                        onClick={() => toggle()}
                      >
                        <i className="ri-add-fill align-bottom" /> Add New
                        Product
                      </button>
                    </Col>
                  </Row>
                </React.Fragment>
              ) : !isEdit ? (
                <h4 className="card-title mb-0">Add new product</h4>
              ) : (
                <h4 className="card-title mb-0">update product</h4>
              )}
            </CardHeader>

            {IsformActive ? (
              <Row>
                <Col lg={12}>
                  <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                      productForm.handleSubmit();
                      return false;
                    }}
                  >
                    <Card>
                      <div className="card-body">
                        <div className="live-preview">
                          <Row className="align-items-center g-3">
                            {/* Cateogry */}
                            <Col sm={2}>
                              <div className="mb-3">
                                <label
                                  className="form-label"
                                  htmlFor="category-select"
                                >
                                  Category
                                </label>
                                <select
                                  className="form-select"
                                  id="category"
                                  name="category"
                                  aria-label="category"
                                  onBlur={productForm.handleBlur}
                                  value={productForm.values.category || ""}
                                  onChange={(e) => {
                                    productForm.handleChange(e);
                                    handelCategorySelect(e);
                                  }}
                                >
                                  <option value={null}>--select--</option>
                                  {categoryData
                                    ? categoryData.map((category) => (
                                        <option
                                          key={category._id}
                                          value={category._id}
                                        >
                                          {category.name}
                                        </option>
                                      ))
                                    : null}
                                </select>
                                {productForm.touched.category &&
                                productForm.errors.category ? (
                                  <FormFeedback type="invalid">
                                    {productForm.errors.category}
                                  </FormFeedback>
                                ) : null}
                              </div>
                            </Col>
                            {/* Sub Category */}
                            <Col sm={2}>
                              <div className="mb-3">
                                <label
                                  className="form-label"
                                  htmlFor="subCategory"
                                >
                                  SubCategory
                                </label>
                                <select
                                  className="form-select"
                                  id="subCategory"
                                  name="subCategory"
                                  aria-label="subCategory"
                                  onBlur={productForm.handleBlur}
                                  value={productForm.values.subCategory || ""}
                                  onChange={(e) => {
                                    productForm.handleChange(e);
                                    handelSubCategorySelect(e);
                                  }}
                                  invalid={
                                    productForm.errors.subCategory &&
                                    productForm.touched.subCategory
                                      ? true
                                      : false
                                  }
                                >
                                  {/* Populate the options dynamically */}
                                  <option value={null}>--select--</option>
                                  {subCatDropbind
                                    ? subCatDropbind.map((item) => (
                                        <option key={item._id} value={item._id}>
                                          {item.name}
                                        </option>
                                      ))
                                    : null}
                                </select>
                                {productForm.touched.subCategory &&
                                productForm.errors.subCategory ? (
                                  <FormFeedback type="invalid">
                                    {productForm.errors.subCategory}
                                  </FormFeedback>
                                ) : null}
                              </div>
                            </Col>
                            {/* Sub Sub Category */}
                            <Col sm={2}>
                              <div className="mb-3">
                                <label
                                  className="form-label"
                                  htmlFor="subSubCategory"
                                >
                                  SubSubCategory
                                </label>
                                <select
                                  className="form-select"
                                  id="subSubCategory"
                                  name="subSubCategory"
                                  aria-label="Category"
                                  onBlur={productForm.handleBlur}
                                  value={
                                    productForm.values.subSubCategory || ""
                                  }
                                  onChange={(e) => {
                                    productForm.handleChange(e);
                                  }}
                                  invalid={
                                    productForm.errors.subSubCategory &&
                                    productForm.touched.subSubCategory
                                      ? true
                                      : false
                                  }
                                >
                                  {/* Populate the options dynamically */}
                                  <option value="">--select--</option>

                                  {subSubCatDropbind
                                    ? subSubCatDropbind.map((item) => (
                                        <option key={item._id} value={item._id}>
                                          {item.name}
                                        </option>
                                      ))
                                    : null}
                                </select>
                                {productForm.touched.subSubCategory &&
                                productForm.errors.subSubCategory ? (
                                  <FormFeedback type="invalid">
                                    {productForm.errors.subSubCategory}
                                  </FormFeedback>
                                ) : null}
                              </div>
                            </Col>

                            {/* Ttile */}
                            <Col sm={6}>
                              <div className="mb-3">
                                <label
                                  className="form-label"
                                  htmlFor="product-orders-input"
                                >
                                  Product Title
                                </label>
                                <div className="input-group mb-3">
                                  <Input
                                    type="text"
                                    id="name"
                                    placeholder="Enter Stock"
                                    name="name"
                                    aria-label="name"
                                    value={productForm.values.name}
                                    onChange={productForm.handleChange}
                                    onBlur={productForm.handleBlur}
                                    invalid={
                                      productForm.errors.name &&
                                      productForm.touched.name
                                        ? true
                                        : false
                                    }
                                  />
                                  {productForm.errors.name &&
                                  productForm.touched.name ? (
                                    <FormFeedback type="invalid">
                                      {productForm.errors.name}
                                    </FormFeedback>
                                  ) : null}
                                </div>
                              </div>
                            </Col>
                          </Row>

                          <Row className="align-items-center g-3">
                            <Row className="align-items-center g-1 mx-2">
                              {/* Price */}
                              <Col sm={2}>
                                <div className="mb-3">
                                  <label
                                    className="form-label"
                                    htmlFor="product-price-input"
                                  >
                                    Price
                                  </label>
                                  <div className="input-group mb-3">
                                    <span
                                      className="input-group-text"
                                      id="product-price-addon"
                                    >
                                      ₹
                                    </span>

                                    <Input
                                      placeholder="Enter price"
                                      options={{
                                        numeral: true,
                                        numeralThousandsGroupStyle: "thousand",
                                      }}
                                      id="price"
                                      name="original"
                                      className="form-control"
                                      value={productForm.values.original}
                                      onChange={productForm.handleChange}
                                      onBlur={productForm.handleBlur}
                                      invalid={
                                        productForm.errors.original &&
                                        productForm.touched.original
                                          ? true
                                          : false
                                      }
                                    />

                                    {productForm.errors.original &&
                                    productForm.touched.original ? (
                                      <FormFeedback type="invalid">
                                        {productForm.errors.original}
                                      </FormFeedback>
                                    ) : null}
                                  </div>
                                </div>
                              </Col>

                              {/* Discounted Price */}
                              <Col sm={2}>
                                <div className="mb-3">
                                  <label
                                    className="form-label"
                                    htmlFor="product-price-input"
                                  >
                                    Discounted Price
                                  </label>
                                  <div className="input-group mb-3">
                                    <span
                                      className="input-group-text"
                                      id="discounted"
                                    >
                                      ₹
                                    </span>
                                    <Input
                                      placeholder="Enter price"
                                      options={{
                                        numeral: true,
                                        numeralThousandsGroupStyle: "thousand",
                                      }}
                                      id="price"
                                      name="discounted"
                                      className="form-control"
                                      value={productForm.values.discounted}
                                      onChange={productForm.handleChange}
                                      onBlur={productForm.handleBlur}
                                      invalid={
                                        productForm.errors.discounted &&
                                        productForm.touched.discounted
                                          ? true
                                          : false
                                      }
                                    />
                                    {productForm.errors.discounted &&
                                    productForm.touched.discounted ? (
                                      <FormFeedback type="invalid">
                                        {productForm.errors.discounted}
                                      </FormFeedback>
                                    ) : null}
                                  </div>
                                </div>
                              </Col>
                              {/* Gst */}
                              <Col sm={2}>
                                <div className="mb-3">
                                  <label
                                    className="form-label"
                                    htmlFor="category-select"
                                  >
                                    gst
                                  </label>
                                  <select
                                    className="form-select"
                                    id="gst"
                                    name="gst"
                                    aria-label="gst"
                                    onBlur={productForm.handleBlur}
                                    value={productForm.values.gst || ""}
                                    onChange={(e) => {
                                      productForm.handleChange(e);
                                    }}
                                  >
                                    <option value={null}>--select--</option>
                                    {GstData
                                      ? GstData.map((gst) => (
                                          <option
                                            key={gst._id}
                                            value={gst._id}
                                          >
                                            {gst.gst+"% GST"}
                                          </option>
                                        ))
                                      : null}
                                  </select>
                                  {productForm.touched.gst &&
                                  productForm.errors.gst ? (
                                    <FormFeedback type="invalid">
                                      {productForm.errors.gst}
                                    </FormFeedback>
                                  ) : null}
                                </div>
                              </Col>
                              {/* Stocks */}
                              <Col sm={2}>
                                <div className="mb-3">
                                  <label
                                    className="form-label"
                                    htmlFor="product-orders-input"
                                  >
                                    Stock
                                  </label>
                                  <div className="input-group mb-3">
                                    <Input
                                      type="text"
                                      id="stock"
                                      placeholder="Enter Title"
                                      name="stock"
                                      aria-label="stock"
                                      value={productForm.values.stock}
                                      onChange={productForm.handleChange}
                                      onBlur={productForm.handleBlur}
                                      invalid={
                                        productForm.errors.stock &&
                                        productForm.touched.stock
                                          ? true
                                          : false
                                      }
                                    />
                                    {productForm.errors.stock &&
                                    productForm.touched.stock ? (
                                      <FormFeedback type="invalid">
                                        {productForm.errors.stock}
                                      </FormFeedback>
                                    ) : null}
                                  </div>
                                </div>
                              </Col>

                              {/* SKU */}
                              <Col sm={4}>
                                <div className="mb-3">
                                  <label
                                    className="form-label"
                                    htmlFor="product-orders-input"
                                  >
                                    SKU
                                  </label>
                                  <div className="input-group mb-3">
                                    <Input
                                      type="text"
                                      className="form-control"
                                      id="sku"
                                      placeholder="Enter SKU"
                                      name="sku"
                                      aria-label="sku"
                                      aria-describedby="product-orders-addon"
                                      value={productForm.values.sku}
                                      onChange={productForm.handleChange}
                                      onBlur={productForm.handleBlur}
                                      invalid={
                                        productForm.errors.sku &&
                                        productForm.touched.sku
                                          ? true
                                          : false
                                      }
                                    />
                                    {productForm.errors.sku &&
                                    productForm.touched.sku ? (
                                      <FormFeedback type="invalid">
                                        {productForm.errors.sku}
                                      </FormFeedback>
                                    ) : null}
                                  </div>
                                </div>
                              </Col>
                            </Row>

                            {/* Attributes checkboxes */}
                            <Row className="align-items-center">
                              <Col sm={2}>
                                <div className="mb-3 form-check">
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="isProductPopular"
                                    name="isProductPopular"
                                    checked={productForm.isProductPopular}
                                    da
                                    onChange={productForm.handleChange}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="isProductPopular"
                                  >
                                    Is Popular Product
                                  </label>
                                </div>
                              </Col>
                              <Col sm={2}>
                                <div className="mb-3 form-check">
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="isProductNew"
                                    name="isProductNew"
                                    checked={productForm.values.isProductNew}
                                    onChange={productForm.handleChange}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="isProductNew"
                                  >
                                    Is New Product
                                  </label>
                                </div>
                              </Col>
                              <Col sm={2}>
                                <div className="mb-3 form-check">
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="isActive"
                                    name="isActive"
                                    checked={productForm.values.isActive}
                                    onChange={productForm.handleChange}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="isActive"
                                  >
                                    Is Active
                                  </label>
                                </div>
                              </Col>

                              <Col sm={2}>
                                <div className="mb-3 form-check">
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="isOnWeight"
                                    name="isOnWeight"
                                    onChange={(e)=>{showSilverGoldDropdown(e.target.checked)}}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="isOnWeight"
                                  >
                                    Calculation on weight
                                  </label>
                                </div>
                              </Col>

                              {SilverGoldDropdown?
                                <Col sm={2}>
                                <div className="mb-3">
                                  
                                  <select
                                    className="form-select"
                                    id="silverGold"
                                    name="silverGold"
                                    aria-label="silverGold"
                                    // onBlur={productForm.handleBlur}
                                    // value={productForm.values.gst || ""}
                                    onChange={(e) => {
                                      // productForm.handleChange(e);
                                    }}
                                  >
                                    <option value={null} disabled>select element</option>
                                    <option value={"gold"}>gold</option>
                                    <option value={"silver"}>silver</option>
                                  
                                        
                                       
                                  </select>
                                  {productForm.touched.gst &&
                                  productForm.errors.gst ? (
                                    <FormFeedback type="invalid">
                                      {productForm.errors.gst}
                                    </FormFeedback>
                                  ) : null}
                                </div>
                              </Col>:null
                              }
                            
                            </Row>

                            

                            {/* Description */}
                            <Col lg={12}>
                              <div className="mb-3">
                                <Label>Product Description</Label>
                                <JoditEditor
                                  config={config}
                                  tabIndex={1}
                                  id="description"
                                  name="description"
                                  value={productForm.values.description}
                                  onChange={(product) =>
                                    productForm.setFieldValue(
                                      "description",
                                      product
                                    )
                                  }
                                  onBlur={productForm.handleBlur}
                                  invalid={
                                    productForm.errors.description &&
                                    productForm.touched.description
                                      ? true
                                      : false
                                  }
                                />
                                {productForm.errors.description &&
                                productForm.touched.description ? (
                                  <FormFeedback type="invalid">
                                    {productForm.errors.description}
                                  </FormFeedback>
                                ) : null}
                              </div>
                            </Col>
                          </Row>

                          <Row className="align-items-center g-3">
                            <Col sm={12}>
                              <div>
                                <h5 className="fs-14 mb-1">Product Gallery</h5>
                                <p className="text-muted">
                                  Add Product Gallery Images.
                                </p>

                                <Dropzone
                                  onDrop={(acceptedFiles) => {
                                    handleAcceptedFiles(acceptedFiles);
                                  }}
                                >
                                  {({ getRootProps, getInputProps }) => (
                                    <div className="dropzone dz-clickable">
                                      <div
                                        className="dz-message needsclick"
                                        {...getRootProps()}
                                      >
                                        <input
                                          {...getInputProps()}
                                          accept="image/*"
                                          name="imageGallery"
                                          multiple
                                        />
                                        <div className="mb-3">
                                          <i className="display-4 text-muted ri-upload-cloud-2-fill" />
                                        </div>
                                        <h5>
                                          Drop files here or click to upload.
                                        </h5>
                                      </div>
                                    </div>
                                  )}
                                </Dropzone>
                                <div
                                  className="list-unstyled mb-0"
                                  id="file-previews"
                                >
                                  {selectedFiles.map((f, i) => {
                                    return (
                                      <Card
                                        className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                                        key={i + "-file"}
                                      >
                                        <div className="p-2">
                                          <Row className="align-items-center">
                                            <Col className="col-auto">
                                              <img
                                                data-dz-thumbnail=""
                                                height="80"
                                                className="avatar-sm rounded bg-light"
                                                alt={f.name}
                                                src={f.preview}
                                              />
                                            </Col>
                                            <Col>
                                              <Link
                                                to="#"
                                                className="text-muted font-weight-bold"
                                              >
                                                {f.name}
                                              </Link>
                                              <p className="mb-0">
                                                <strong>
                                                  {f.formattedSize}
                                                </strong>
                                              </p>
                                            </Col>
                                            <Col className="col-auto">
                                              <button
                                                type="button"
                                                className="btn btn-danger btn-sm"
                                                onClick={(e) => {
                                                  const updatedSelectedFiles = [
                                                    ...selectedFiles,
                                                  ];
                                                  updatedSelectedFiles.splice(
                                                    i,
                                                    1
                                                  ); // Remove the element at index i
                                                  setselectedFiles(
                                                    updatedSelectedFiles
                                                  ); // Update the state
                                                }}
                                              >
                                                <i className="ri-delete-bin-5-fill align-bottom" />
                                              </button>
                                            </Col>
                                          </Row>
                                        </div>
                                      </Card>
                                    );
                                  })}
                                </div>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </div>
                    </Card>
                    <div className="text-center mb-3 me-4">
                      <button
                        className="btn btn-danger w-lg mr-3"
                        onClick={() => {
                          setselectedFiles([]);
                          setValuesForUpdate("");
                          productForm.resetForm();
                          setIsEdit(false);
                          toggle();
                        }}
                      >
                        Cancel
                      </button>

                      {!buttnLoading ? (
                        <React.Fragment>
                          <button
                            type="submit"
                            className="btn btn-primary"
                            id="addNewTodo"
                          >
                            {!!isEdit ? "Update" : "submit"}
                          </button>
                        </React.Fragment>
                      ) : (
                        <Button
                          color="primary"
                          className="btn-load"
                          outline
                          disabled
                        >
                          <span className="d-flex align-items-center">
                            <Spinner size="sm" className="flex-shrink-0">
                              {" "}
                              Loading...{" "}
                            </Spinner>
                            <span className="flex-grow-1 ms-2">Loading...</span>
                          </span>
                        </Button>
                      )}
                    </div>
                  </Form>
                </Col>
              </Row>
            ) : (
              <CardBody>
                <div
                  className="todo-content position-relative px-4 mx-n4"
                  id="todo-task"
                >
                  {isEmpty(productData) &&
                    (isFetchingData ? (
                      <div id="elmLoader">
                        <div
                          className="spinner-border text-primary avatar-sm"
                          role="status"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    ) : (
                      <div id="elmLoader" className="py-4 mt-4 text-center">
                        <div className="d-flex flex-column align-items-center">
                          <i
                            className="las la-exclamation-triangle"
                            style={{ fontSize: "48px" }}
                          ></i>

                          <h5 className="mt-4">Sorry No data to display</h5>
                        </div>
                      </div>
                    ))}

                  <table className="table align-middle position-relative">
                    <thead className="table-active">
                      <tr>
                        <th scope="col">index</th>

                        <th scope="col">image</th>
                        <th scope="col">name</th>
                        <th scope="col">category</th>
                        <th className="stock">Stock</th>
                        <th className="price">Original Price</th>
                        <th className="price">Discounted</th>
                        <th scope="col">actions</th>
                      </tr>
                    </thead>

                    <tbody id="task-list">
                      {productData
                        ? productData.map((item, key) => (
                            <tr key={key}>
                              <td>{key + 1}</td>
                              <td>
                                <img
                                  src={`${url}/products/${item.imageGallery[0]}`}
                                  alt="Banner"
                                  style={{
                                    width: "100px",
                                    height: "auto",
                                    maxHeight: "100px",
                                    objectFit: "cover",
                                    borderRadius: "3px",
                                  }}
                                />
                              </td>
                              <td>
                                {" "}
                                <div>{item.name}</div>
                                <div>{`${item.sku}`}</div>
                              </td>
                              <td>{item.category}</td>
                              <td>{item.stock ? item.stock.quantity : null}</td>
                              <td>
                                {item.prices ? item.prices.original : null}
                              </td>
                              <td>
                                {item.prices ? item.prices.discounted : null}
                              </td>
                              <td>
                                <div className="hstack gap-2">
                                  <button
                                    className="btn btn-sm btn-soft-danger remove-list"
                                    onClick={() => handleDeleteModal(item)}
                                  >
                                    <i className="ri-delete-bin-5-fill align-bottom" />
                                  </button>
                                  <button
                                    className="btn btn-sm btn-soft-info edit-list"
                                    onClick={() => {
                                      handleEdit(item);
                                    }}
                                  >
                                    <i className="ri-pencil-fill align-bottom" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        : null}
                    </tbody>
                  </table>
                </div>
                <div
                  className="py-4 mt-4 text-center"
                  id="noresult"
                  style={{ display: "none" }}
                >
                  <h1>
                    <FeatherIcon icon="search" />
                  </h1>
                  <h5 className="mt-4">Sorry! No Result Found</h5>
                </div>
              </CardBody>
            )}
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ProductMaster;
