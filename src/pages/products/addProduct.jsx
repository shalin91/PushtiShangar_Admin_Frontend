import React, { useEffect, useState,useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import JoditEditor from "jodit-react";
import {
  Card,
  CardBody,
  Col,
  Row,
  Input,
  FormFeedback,
  Button,
  Spinner,
  Label,
} from "reactstrap";
import {
  addProduct,
  getDailyPrice,
  getGst,
  getCategory,
  getSubCategory,
  getSubSubCategory,
  getspecificproduct,
} from "../../helpers/backend_helper";
import {
  GET_GST,
  GET_DAILY_PRICE,
  GET_CATEGORY,
  GET_SUB_CATEGORY,
  GET_SUB_SUB_CATEGORY,
} from "../../store/product/actionTypes";
import { Field, useFormik } from "formik";
import * as Yup from "yup";
import ImageUpload from "./imageUpload";
import ProducTags from "./producTags";
import Filters from "./filters";
import { useNavigate, useParams } from "react-router-dom";

const AddProduct = () => {

const navigate = useNavigate(); 
  const GstData = useSelector((state) => state.Product.gst);
  const DailyRateData = useSelector((state) => state.Product.DailyPrices);
  const categoryData = useSelector((state) => state.Product.category);
  const subCategoryData = useSelector((state) => state.Product.subCategory);
  const subSubCategoryData = useSelector(
    (state) => state.Product.subSubCategory
  );
  const [formVAlues, setFormVAlues] = useState(null);
  const [showSilverGoldDropdown, setShowSilverGoldDropdown] = useState(false);
  const [subCatDropbind, setSubCatDropbind] = useState([]);
  const [subSubCatDropbind, setSubSubCatDropbind] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedFilters, setselectedFilters] = useState([]);
  const [selectedItems, setselectedItems] = useState([]);
  const [selectedcolors, setSelectedcolors] = useState([]);
  const [selectedseasons, setSelectedseasons] = useState([]);
  const [selectedmaterials, setSelectedmaterials] = useState([]);
  const [productForUpdate, setProductForUpdate] = useState([]);

  const {id} = useParams();

  const config = useMemo(
    () => ({
      readonly: false,
    }),
    []
  );

  const dispatch = useDispatch();
  const fetchDropdownData = async () => {
    console.log("called");
    try {
      const res = await getCategory();
      dispatch({
        type: GET_CATEGORY,
        payload: {
          actionType: "GET_CATEGORIES",
          data: res,
        },
      });
  
      const res2 = await getSubCategory();
      dispatch({
        type: GET_SUB_CATEGORY,
        payload: {
          actionType: "GET_SUB_CATEGORY",
          data: res2,
        },
      });
  
      setSubCatDropbind(res2);
      const res3 = await getSubSubCategory();
      dispatch({
        type: GET_SUB_SUB_CATEGORY,
        payload: {
          actionType: "GET_SUB_SUB_CATEGORY",
          data: res3,
        },
      });
  
      setSubSubCatDropbind(res3);
  
      const getDP = await getDailyPrice();
      dispatch({
        type: GET_DAILY_PRICE,
        payload: {
          actionType: "GET_DAILY_PRICE",
          data: getDP.prices,
        },
      });
  
      const gstRes = await getGst();
      dispatch({
        type: GET_GST,
        payload: {
          actionType: "GET_GST",
          data: gstRes,
        },
      });
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

  useEffect(() => {

    if (
      GstData.length === 0 ||
      DailyRateData.length === 0 ||
      categoryData.length === 0 ||
      subCategoryData.length === 0 ||
      subSubCategoryData.length === 0 
    ) {
      fetchDropdownData();
    }
    if (id) {
      getspecificproduct(id).then((pfu) => {
        setFormVAlues(pfu.product);
        console.log(pfu.product);

setShowSilverGoldDropdown(pfu.product.calculationOnWeight)
setSelectedImages(pfu.product.imageGallery)
setSelectedTags(pfu.product.tags)
setselectedFilters(pfu.product.filters)
setSelectedcolors(pfu.product.color)
setSelectedseasons(pfu.product.season)
setSelectedmaterials(pfu.product.material)


      });
    }
  }, [id]);
  

  const productForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: (formVAlues && formVAlues.name) || "",

      category: (formVAlues && formVAlues.category) || "",
      subCategory: (formVAlues && formVAlues.subCategory) || "",
      subSubCategory: (formVAlues && formVAlues.subSubCategory) || null,

      isProductPopular: (formVAlues && formVAlues.isProductPopular) || true,
      isProductNew: (formVAlues && formVAlues.isProductNew) || true,
      isActive: (formVAlues && formVAlues.isActive) || true,
      description: (formVAlues && formVAlues.description) || "",
      original: (formVAlues && formVAlues.prices && formVAlues.prices.original) || "",
      discounted: (formVAlues && formVAlues.prices && formVAlues.prices.discounted) || "",
      calculationOnWeight: (formVAlues && formVAlues.calculationOnWeight) || "",
      weightType: (formVAlues && formVAlues.weightType) || null,
      weight: (formVAlues && formVAlues.weight) || "",
      laborCost: (formVAlues && formVAlues.laborCost) || "",
      discountOnLaborCost: (formVAlues && formVAlues.discountOnLaborCost) || "",
      stock :(formVAlues && formVAlues.stock && formVAlues.stock.quantity) || "",

      sku: (formVAlues && formVAlues.sku) || "",
      gst: (formVAlues && formVAlues.gst) || "",
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
    onSubmit: async (values, { setSubmitting }) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("category", values.category);
      formData.append("subCategory", values.subCategory);
      formData.append("subSubCategory", values.subSubCategory);
      formData.append("original", values.original);
      formData.append("discounted", values.discounted);
      formData.append("calculationOnWeight", showSilverGoldDropdown);
      formData.append("weightType", values.weightType);
      formData.append("weight", values.weight);
      formData.append("laborCost", values.laborCost);
      formData.append("discountOnLaborCost", values.discountOnLaborCost);
      formData.append("isActive", values.isActive);
      formData.append("isProductNew", values.isProductNew);
      formData.append("isProductPopular", values.isProductPopular);
      formData.append("description", values.description);

      formData.append("stock", values.stock);
      formData.append("sku", values.sku);
      formData.append("gst", values.gst);
      formData.append("tags", selectedTags);
      formData.append("filters", selectedItems);
      formData.append("color", selectedcolors);
      formData.append("material", selectedmaterials);
      formData.append("season", selectedseasons);
      for (let i = 0; i < selectedImages.length; i++) {
        formData.append("imageGallery", selectedImages[i]);
      }

      try {
        if (formVAlues) {
          // await updateProduct(formData, formVAlues._id);
        } else {
          console.log(values);
          const addedProduct = await addProduct(formData);
          // setFormVAlues(addedProduct.newProduct);
          navigate("/allproducts")
          setSubmitting(false);
        }
        console.log(values);
        // productForm.resetForm();
      } catch (error) {
        console.log("Error submitting the form data:", error);
      }
    },
  });

  return (
    <div className="page-content">
    <Card>
      <CardBody>
        <form onSubmit={productForm.handleSubmit}>
          <Row>
        <Col sm={8}>
          <Row className="align-items-center  g-1 mx-2">
            <Col sm={4}>
              <div className="mb-3">
                <label className="form-label" htmlFor="category-select">
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
                        <option key={category._id} value={category._id}>
                          {category.name}
                        </option>
                      ))
                    : null}
                </select>
                {productForm.touched.category && productForm.errors.category ? (
                  <FormFeedback type="invalid">
                    {productForm.errors.category}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            {/* Sub Category */}
            <Col sm={4}>
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
            <Col sm={4}>
              <div className="mb-3">
                <label className="form-label" htmlFor="subSubCategory">
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
          </Row>
          <Row className="align-items-center  g-1 mx-2">
            {/* Ttile */}
            <Col sm={12}>
              <div className="mb-3">
                <label className="form-label" htmlFor="product-orders-input">
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
                      productForm.errors.name && productForm.touched.name
                        ? true
                        : false
                    }
                  />
                  {productForm.errors.name && productForm.touched.name ? (
                    <FormFeedback type="invalid">
                      {productForm.errors.name}
                    </FormFeedback>
                  ) : null}
                </div>
              </div>
            </Col>
          </Row>

          <Row className="align-items-center  g-1 mx-2">
            <Col sm={3}>
              <div className="mt-4 mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="isOnWeight"
                  name="isOnWeight"
                  onChange={(e) => {
                    productForm.setFieldValue(
                      "calculationOnWeight",
                      e.target.checked
                    );
                    setShowSilverGoldDropdown(e.target.checked);
                  }}
                />
                <label className="form-check-label" htmlFor="isOnWeight">
                  Calculation on weight
                </label>
              </div>
            </Col>
            {showSilverGoldDropdown ? (
              <Col sm={3}>
                <select
                  className="form-select"
                  id="weightType"
                  name="weightType"
                  aria-label="weightType"
                  onBlur={productForm.handleBlur}
                  value={productForm.values.weightType || null}
                  onChange={(e) => {
                    productForm.handleChange(e);
                  }}
                >
                  <option value={null}>--select--</option>
                  {DailyRateData
                    ? DailyRateData.map((DP) => (
                        <option key={DP._id} value={DP._id}>
                          {DP.ProductType}
                        </option>
                      ))
                    : null}
                </select>
                {productForm.touched.weightType &&
                productForm.errors.weightType ? (
                  <FormFeedback type="invalid">
                    {productForm.errors.weightType}
                  </FormFeedback>
                ) : null}
              </Col>
            ) : null}
          </Row>
          <hr></hr>

          <Row className="align-items-center g-1 mx-2">
            {/* Price */}
            {!showSilverGoldDropdown ? (
              <React.Fragment>
                <Col sm={6}>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="product-price-input">
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
                <Col sm={6}>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="product-price-input">
                      Discount
                    </label>
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="discounted">
                        ₹
                      </span>
                      <Input
                        placeholder="Enter price"
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
                <Col sm={4}>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="product-price-input">
                      weight
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
                        name="weight"
                        className="form-control"
                        value={productForm.values.weight}
                        onChange={productForm.handleChange}
                        onBlur={productForm.handleBlur}
                        invalid={
                          productForm.errors.weight &&
                          productForm.touched.weight
                            ? true
                            : false
                        }
                      />

                      {productForm.errors.weight &&
                      productForm.touched.weight ? (
                        <FormFeedback type="invalid">
                          {productForm.errors.weight}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </div>
                </Col>

                {/* Discounted Price */}
                <Col sm={4}>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="product-price-input">
                      labor cost
                    </label>
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="laborCost">
                        ₹
                      </span>
                      <Input
                        placeholder="Enter laborCost"
                        options={{
                          numeral: true,
                          numeralThousandsGroupStyle: "thousand",
                        }}
                        id="laborCost"
                        name="laborCost"
                        className="form-control"
                        value={productForm.values.laborCost}
                        onChange={productForm.handleChange}
                        onBlur={productForm.handleBlur}
                        invalid={
                          productForm.errors.laborCost &&
                          productForm.touched.laborCost
                            ? true
                            : false
                        }
                      />
                      {productForm.errors.laborCost &&
                      productForm.touched.laborCost ? (
                        <FormFeedback type="invalid">
                          {productForm.errors.laborCost}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </div>
                </Col>
                <Col sm={4}>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="product-price-input">
                      discounted labor cost
                    </label>
                    <div className="input-group mb-3">
                      <span
                        className="input-group-text"
                        id="discountOnLaborCost"
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
                        name="discountOnLaborCost"
                        className="form-control"
                        value={productForm.values.discountOnLaborCost}
                        onChange={productForm.handleChange}
                        onBlur={productForm.handleBlur}
                        invalid={
                          productForm.errors.discountOnLaborCost &&
                          productForm.touched.discountOnLaborCost
                            ? true
                            : false
                        }
                      />
                      {productForm.errors.discountOnLaborCost &&
                      productForm.touched.discountOnLaborCost ? (
                        <FormFeedback type="invalid">
                          {productForm.errors.discountOnLaborCost}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </div>
                </Col>
              </React.Fragment>
            )}
          </Row>

          <Row className="align-items-center g-1 mx-2">
            {/* Gst */}
            <Col sm={4}>
              <div className="mb-3">
                <label className="form-label" htmlFor="gst">
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
                {productForm.touched.gst && productForm.errors.gst ? (
                  <FormFeedback type="invalid">
                    {productForm.errors.gst}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            {/* Stocks */}
            <Col sm={4}>
              <div className="mb-3">
                <label className="form-label" htmlFor="product-orders-input">
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
                      productForm.errors.stock && productForm.touched.stock
                        ? true
                        : false
                    }
                  />
                  {productForm.errors.stock && productForm.touched.stock ? (
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
                <label className="form-label" htmlFor="product-orders-input">
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
                      productForm.errors.sku && productForm.touched.sku
                        ? true
                        : false
                    }
                  />
                  {productForm.errors.sku && productForm.touched.sku ? (
                    <FormFeedback type="invalid">
                      {productForm.errors.sku}
                    </FormFeedback>
                  ) : null}
                </div>
              </div>
            </Col>
          </Row>
          </Col>
          <Col sm={4}>
          <ImageUpload getSelectedImages={setSelectedImages}></ImageUpload>
          </Col>
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

          <ProducTags
            data={selectedTags}
            sendTagsToParent={setSelectedTags}
          ></ProducTags>

          <Filters
            setSelectedcolors={setSelectedcolors}
            selectedcolors={selectedcolors}
            setSelectedseasons={setSelectedseasons}
            selectedseasons={selectedseasons}
            selectedmaterials={selectedmaterials}
            setSelectedmaterials={setSelectedmaterials}
            selectedFilters={selectedFilters}
            selectedItems={selectedItems}
            setselectedFilters={setselectedFilters}
            setselectedItems={setselectedItems}
          ></Filters>

          <Col sm={2}>
            <div className="mt-4 mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="isActive"
                name="isActive"
                onChange={(e) => {
                  productForm.setFieldValue("isActive", e.target.checked);
                }}
              />
              <label className="form-check-label" htmlFor="isOnWeight">
                isActive
              </label>
            </div>
          </Col>

          <Col sm={2}>
            <div className="mt-4 mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="isProductNew"
                name="isProductNew"
                onChange={(e) => {
                  productForm.setFieldValue("isProductNew", e.target.checked);
                }}
              />
              <label className="form-check-label" htmlFor="isProductNew">
                isProductNew
              </label>
            </div>
          </Col>

          <Col sm={2}>
            <div className="mt-4 mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="isProductPopular"
                name="isProductPopular"
                onChange={(e) => {
                  productForm.setFieldValue(
                    "isProductPopular",
                    e.target.checked
                  );
                }}
              />
              <label className="form-check-label" htmlFor="isProductPopular">
                isProductPopular
              </label>
            </div>
          </Col>

          {!productForm.isSubmitting ? (
            <React.Fragment>
              <button type="submit" className="btn btn-primary" id="addNewTodo">
                {formVAlues ? "Update" : "submit"}
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
        </form>
      </CardBody>
    </Card>
    </div>
  );
};

export default AddProduct;
