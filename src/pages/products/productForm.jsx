import React, { useCallback, useState, useMemo, useEffect } from "react";
import JoditEditor from "jodit-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Formik, useFormik } from "formik";
import Cleave from "cleave.js/react";
import Dropzone from "react-dropzone";

import {
  Card,
  Col,
  Row,
  FormFeedback,
  Spinner,
  Form,
  Container,
  Label,
  Input,
  Button,
} from "reactstrap";
import * as Yup from "yup";
import {
  addProduct,
  getProducts,
  updateProduct,
  getCategory,
  getSubCategory,
  getSubSubCategory,
  getGst,
  getColor,
  getMaterial,
  getSeason,
} from "../../helpers/backend_helper";
import {
  GET_CATEGORY,
  GET_GST,
  GET_SUB_CATEGORY,
  GET_SUB_SUB_CATEGORY,
  GET_COLOR,
  GET_MATERIAL,
  GET_SEASON,
} from "../../store/product/actionTypes";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { TagsInput } from "react-tag-input-component";

const ProductForm = () => {
  const categoryData = useSelector((state) => state.Product.category);
  const subCategoryData = useSelector((state) => state.Product.subCategory);
  const subSubCategoryData = useSelector((state) => state.Product.subSubCategory);
  const GstData = useSelector((state) => state.Product.gst);
  const colorsData = useSelector((state) => state.Product.colors);
  const seasonsData = useSelector((state) => state.Product.seasons);
  const materialsData = useSelector((state) => state.Product.materials);

  const [subCatDropbind, setSubCatDropbind] = useState([]);
  const [subSubCatDropbind, setSubSubCatDropbind] = useState([]);
  const [selectedFiles, setselectedFiles] = useState([]);
  const [buttnLoading, setButtnLoading] = useState(false);
  const [SilverGoldDropdown, showSilverGoldDropdown] = useState(false);
  const [selectedMulti2, setselectedMulti2] = useState([]);
  const [selectedItems, setselectedItems] = useState([]);
  const [selected, setSelected] = useState([]);

  const { state } = useLocation();

  function handleAcceptedFiles(files) {
    const updatedSelectedFiles = selectedFiles.concat(files);
    productForm.setFieldValue("imageGallery", updatedSelectedFiles);
    files.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    console.log(files);
    setselectedFiles(updatedSelectedFiles);
  }

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
  const dispatch = useDispatch();
  const fetchDropdownData = async () => {
    try {
      const res = await getCategory();
      dispatch({
        type: GET_CATEGORY,
        payload: {
          actionType: "GET_CATEGORIES",
          data: res,
        },
      });
      // setCategoryData(res);

      const res2 = await getSubCategory();
      dispatch({
        type: GET_SUB_CATEGORY,
        payload: {
          actionType: "GET_SUB_CATEGORY",
          data: res2,
        },
      });
      // setSubCategoryData(res2);
      setSubCatDropbind(res2);

      const res3 = await getSubSubCategory();
      dispatch({
        type: GET_SUB_SUB_CATEGORY,
        payload: {
          actionType: "GET_SUB_SUB_CATEGORY",
          data: res3,
        },
      });
      // setSubSubCategoryData(res3);
      setSubSubCatDropbind(res3);

      const gstRes = await getGst();
      dispatch({
        type: GET_GST,
        payload: {
          actionType: "GET_GST",
          data: gstRes,
        },
      });

      const colorRes = await getColor();
      dispatch({
        type: GET_COLOR,
        payload: {
          actionType: "GET_COLOR",
          data: colorRes.color,
        },
      });

      const seasonRes = await getSeason();
      dispatch({
        type: GET_SEASON,
        payload: {
          actionType: "GET_SEASON",
          data: seasonRes.season,
        },
      });

      const materialRes = await getMaterial();
      dispatch({
        type: GET_MATERIAL,
        payload: {
          actionType: "GET_MATERIAL",
          data: materialRes.material,
        },
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (
      categoryData.length === 0 ||
      subCategoryData.length === 0 ||
      subSubCategoryData === 0
    ) {
      fetchDropdownData();
    }
    setSubSubCatDropbind(subSubCatDropbind);
    setSubCatDropbind(subCatDropbind);
    console.log("colled");
  }, [state]);

  const productForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: (state && state.name) || "",
      original: (state && state.prices.original) || "",
      discounted: (state && state.prices.discounted) || "",
      category: (state && state.category) || "",
      subCategory: (state && state.subCategory) || "",
      subSubCategory: (state && state.subSubCategory) || "",
      stock: (state && state.stock.quantity) || "",
      sku: (state && state.sku) || "",
      isProductPopular: (state && state.isProductPopular) || true,
      isProductNew: (state && state.isProductNew) || true,
      isActive: (state && state.isActive) || true,
      description: (state && state.description) || "",
      imageGallery: (state && state.imageGallery) || [],
      gst: (state && state.gst) || [],
      waight: (state && state.waight) || "",
      laboureCost: (state && state.laboureCost) || "",
      doscountedLaboureCost: (state && state.doscountedLaboureCost) || "",
      color: (state && state.color) || "",
      season: (state && state.season) || "",
      material: (state && state.material) || "",
      calculationOnWaight: (state && state) || false,
      filterBy: (state && state) || [],
      tags: (state && state) || [],
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
      formData.append("selectedFilters", selectedItems);

     
      try {
        setButtnLoading(true);
        if (state) {
          await updateProduct(formData, state._id);
        } else {
          await addProduct(formData);
        }
        console.log(values);
        productForm.resetForm();
        setButtnLoading(false);
      } catch (error) {
        setButtnLoading(false);

        console.log("Error submitting the form data:", error);
      }
    },
  });

  return (
    
    <div className="page-content">
      <Container fluid>
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
                          <label className="form-label" htmlFor="subCategory">
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
                            value={productForm.values.subSubCategory || ""}
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
                        {!SilverGoldDropdown ? (
                          <React.Fragment>
                            <Col sm={3}>
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
                            <Col sm={3}>
                              <div className="mb-3">
                                <label
                                  className="form-label"
                                  htmlFor="product-price-input"
                                >
                                  Discount
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
                          </React.Fragment>
                        ) : (
                          <React.Fragment>
                            <Col sm={2}>
                              <div className="mb-3">
                                <label
                                  className="form-label"
                                  htmlFor="product-price-input"
                                >
                                  waight
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
                                  laboure cost
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
                            <Col sm={2}>
                              <div className="mb-3">
                                <label
                                  className="form-label"
                                  htmlFor="product-price-input"
                                >
                                  descounted laboure cost
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
                          </React.Fragment>
                        )}
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
                                    <option key={gst._id} value={gst._id}>
                                      {gst.gst + "% GST"}
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
                                placeholder="Enter Stock"
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
                        <Col sm={2}>
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
                              onChange={(e) => {
                                showSilverGoldDropdown(e.target.checked);
                              }}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="isOnWeight"
                            >
                              Calculation on weight
                            </label>
                          </div>
                        </Col>

                        {SilverGoldDropdown ? (
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
                                <option value={null} disabled>
                                  select element
                                </option>
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
                          </Col>
                        ) : null}
                      </Row>

                      <Col lg={4}>
                        <div className="mb-3">
                          <Label
                            htmlFor="choices-multiple-remove-button"
                            className="form-label text-muted"
                          >
                            filter by
                          </Label>
                          <Select
                            value={selectedMulti2}
                            isMulti={true}
                            isClearable={true}
                            onChange={(selectedMulti2) => {
                              setselectedMulti2(selectedMulti2);
                              setselectedItems(
                                selectedMulti2.map((i) => i.value)
                              );
                              console.log(selectedMulti2);
                              console.log(selectedItems);
                            }}
                            options={[
                              { value: "Color", label: "Color" },
                              { value: "Material", label: "Material" },
                              { value: "Season", label: "Season" },
                            ]}
                          />
                        </div>
                      </Col>

                      {selectedItems.includes("Color") ? (
                        <Col sm={2}>
                          <div className="mb-3">
                            <label className="form-label" htmlFor="color">
                              Color
                            </label>
                            <select
                              className="form-select"
                              id="color"
                              name="color"
                              aria-label="color"
                              onChange={(e) => {
                                // Handle color selection here
                              }}
                            >
                              <option value={null} disabled>
                                Select color
                              </option>
                              {colorsData
                              ? colorsData.map((category) => (
                                  <option
                                    key={category._id}
                                    value={category._id}
                                  >
                                    {category.name}
                                  </option>
                                ))
                              : null}
                              
                              
                            </select>
                            {/* Error handling code here */}
                          </div>
                        </Col>
                      ) : null}

                      {selectedItems.includes("Material") ? (
                        <Col sm={2}>
                          <div className="mb-3">
                            <label className="form-label" htmlFor="material">
                              Material
                            </label>
                            <select
                              className="form-select"
                              id="material"
                              name="material"
                              aria-label="material"
                              onChange={(e) => {
                                // Handle material selection here
                              }}
                            >
                              <option value={null} disabled>
                                Select material
                              </option>
                              {seasonsData
                              ? seasonsData.map((category) => (
                                  <option
                                    key={category._id}
                                    value={category._id}
                                  >
                                    {category.name}
                                  </option>
                                ))
                              : null}
                            </select>
                            {/* Error handling code here */}
                          </div>
                        </Col>
                      ) : null}

                      {selectedItems.includes("Season") ? (
                        <Col sm={2}>
                          <div className="mb-3">
                            <label className="form-label" htmlFor="season">
                              Season
                            </label>
                            <select
                              className="form-select"
                              id="season"
                              name="season"
                              aria-label="season"
                              onChange={(e) => {
                                // Handle season selection here
                              }}
                            >
                              <option value={null} disabled>
                                Select season
                              </option>
                              {materialsData
                              ? materialsData.map((category) => (
                                  <option
                                    key={category._id}
                                    value={category._id}
                                  >
                                    {category.name}
                                  </option>
                                ))
                              : null}
                            </select>
                            {/* Error handling code here */}
                          </div>
                        </Col>
                      ) : null}

                      <Col md={12}>
                        <div>
                          <label className="form-label" htmlFor="tags">
                            Add tags for searching
                          </label>

                          <TagsInput
                            value={selected}
                            onChange={setSelected}
                            name="tags"
                            placeHolder="enter tags"
                          />
                          {/* <em>press enter or comma to add new tag</em> */}
                        </div>
                      </Col>

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
                              productForm.setFieldValue("description", product)
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
                                  <h5>Drop files here or click to upload.</h5>
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
                                          <strong>{f.formattedSize}</strong>
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
                                            updatedSelectedFiles.splice(i, 1); // Remove the element at index i
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
                  className="btn btn-danger w-lg m-3"
                  onClick={() => {
                    setselectedFiles([]);

                    productForm.resetForm();
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
                      {!!state ? "Update" : "submit"}
                    </button>
                  </React.Fragment>
                ) : (
                  <Button color="primary" className="btn-load" outline disabled>
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
      </Container>
    </div>
  );
};

export default ProductForm;
