import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  Input,
  Label,
  Row,
} from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import JoditEditor from "jodit-react";
import {
  addCategory,
  
  getCategory,
  getSubCategory,
  getSubSubCategory,
} from "../../../helpers/backend_helper";
import Dropzone from "react-dropzone";

const EcommerceNewAddProduct = () => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [subSubCategoryData, setSubSubCategoryData] = useState([]);
  const [subSubCatDropbind, setSubSubCatDropbind] = useState([]);
  const [subCatDropbind, setSubCatDropbind] = useState([]);
  const [recordForSubmit, setrecordForSubmit] = useState(null);
  const [errorBanner, setErrorBanner] = useState("");
  const [successBanner, setSuccessBanner] = useState("");
  const [buttnLoading, setButtnLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const fetchData = async () => {
    try {
      const response = await getSubSubCategory();
      setTableData(response);

      const res = await getCategory();
      setCategoryData(res);

      const res2 = await getSubCategory();
      setSubCategoryData(res2);

      const res3 = await getSubSubCategory();
      setSubSubCategoryData(res2);


    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handelCategorySelect = (id) => {
    console.log(id)
    const data = subCategoryData.filter((item) => item.Category === id);
    setSubCatDropbind(data);
    console.log(subCategoryData)

  };

  const handelSubCategorySelect = (id) => {
    console.log(id)
    const data = subCategoryData.filter((item) => item.Category === id);
    setSubCatDropbind(data);
    console.log(subCategoryData)

  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Add Product" pageTitle="Products" />
          <Row>
            <Col lg={12}>
              <Form>
                <Card>
                  <div className="card-body">
                    <div className="live-preview">
                      <Row className="align-items-center g-3">
                        {/* Cateogry */}
                        <Col sm={4}>
                          <div className="mb-3">
                            <label
                              className="form-label"
                              htmlFor="category-select"
                            >
                              Category
                            </label>
                            <select
                              className="form-select"
                              id="category-select"
                              name="category"
                              aria-label="Category"
                              onChange={(e) => {
                                // handleChange(e)
                                handelCategorySelect(e.target.value);
                              }}
                            >
                              {/* Populate the options dynamically */}
                              <option value="">Select Category</option>
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
                          </div>
                        </Col>
                        {/* Sub Category */}
                        <Col sm={4}>
                          <div className="mb-3">
                            <label
                              className="form-label"
                              htmlFor="category-select"
                            >
                              SubCategory
                            </label>
                            <select
                              className="form-select"
                              id="category-select"
                              name="category"
                              aria-label="Category"
                              // value={selectedCategory}
                              // onChange={handleCategoryChange}
                            >
                              {/* Populate the options dynamically */}
                              <option value="">Select Category</option>
                              {subCatDropbind
                                ? subCatDropbind.map((item) => (
                                    <option key={item._id} value={item._id}>
                                      {item.name}
                                    </option>
                                  ))
                                : null}
                            </select>
                          </div>
                        </Col>
                        {/* Sub Sub Category */}
                        <Col sm={4}>
                          <div className="mb-3">
                            <label
                              className="form-label"
                              htmlFor="category-select"
                            >
                              SubSubCategory
                            </label>
                            <select
                              className="form-select"
                              id="category-select"
                              name="category"
                              aria-label="Category"
                              // value={selectedCategory}
                              // onChange={handleCategoryChange}
                            >
                              {/* Populate the options dynamically */}
                              <option value="">Select Category</option>
                              
                              {/* Add more options as needed */}
                            </select>
                          </div>
                        </Col>
                      </Row>
                      <Row className="align-items-center g-3">
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
                                className="form-control"
                                id="product-orders-input"
                                placeholder="Enter Title"
                                name="gallaryCategoryTitle"
                                aria-label="orders"
                                aria-describedby="product-orders-addon"
                                // value={GalleryData.gallaryCategoryTitle}
                                // onChange={handleChange}
                              />
                            </div>
                          </div>
                        </Col>
                        {/* SKU */}
                        <Col sm={6}>
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
                                id="product-orders-input"
                                placeholder="Enter Title"
                                name="gallaryCategoryTitle"
                                aria-label="orders"
                                aria-describedby="product-orders-addon"
                                // value={GalleryData.gallaryCategoryTitle}
                                // onChange={handleChange}
                              />
                            </div>
                          </div>
                        </Col>
                        {/* Description */}
                        <Col lg={12}>
                          <div className="mb-3">
                            <Label>Product Description</Label>
                            <JoditEditor
                              // config={config}
                              tabIndex={1}
                              id="content"
                              name="content"
                              // value={editorContent}
                              // onChange={handleEditorChange}
                            />
                          </div>
                        </Col>
                      </Row>
                      <Row className="align-items-center g-3">
                        <Col sm={6}>
                          <div className="mb-3">
                            <label
                              className="form-label"
                              htmlFor="category-select"
                            >
                              Add Product main Image.
                            </label>
                            <div className="text-center">
                              <div className="position-relative d-inline-block">
                                <div className="position-absolute top-100 start-100 translate-middle">
                                  <label
                                    htmlFor="product-image-input"
                                    className="mb-0"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="right"
                                    title=""
                                    data-bs-original-title="Select Image"
                                  >
                                    <div className="avatar-xs">
                                      <div className="avatar-title bg-light border rounded-circle text-muted cursor-pointer">
                                        <i className="ri-image-fill"></i>
                                      </div>
                                    </div>
                                  </label>
                                  <input
                                    className="form-control d-none"
                                    defaultValue=""
                                    id="product-image-input"
                                    type="file"
                                    accept="image/png, image/gif, image/jpeg"
                                  />
                                </div>
                                <div className="avatar-lg">
                                  <div className="avatar-title bg-light rounded">
                                    <img
                                      src=""
                                      id="product-img"
                                      alt=""
                                      className="avatar-md h-auto"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Col>
                        <Col sm={6}>
                          <div className="mb-3">
                            <label
                              className="form-label"
                              htmlFor="category-select"
                            >
                              Add Product Image Gallery.
                            </label>
                            {/* <Dropzone
                          // onDrop={(acceptedFiles) => {
                          //   handleAcceptedFiles(acceptedFiles);
                          // }}
                          >
                            {({ getRootProps, getInputProps }) => (
                              <div className="dropzone dz-clickable">
                                <div
                                  className="dz-message needsclick"
                                  {...getRootProps()}
                                >
                                  <div className="mb-3">
                                    <i className="display-4 text-muted ri-upload-cloud-2-fill" />
                                  </div>
                                  <h5>Drop files here or click to upload.</h5>
                                </div>
                              </div>
                            )}
                          </Dropzone> */}
                          </div>
                        </Col>
                      </Row>
                      <Row className="align-items-center g-3">
                        {/* Price */}
                        <Col sm={6}>
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
                                type="text"
                                className="form-control"
                                id="product-price-input"
                                placeholder="Enter price"
                                name="original"
                                aria-label="Price"
                                aria-describedby="product-price-addon"
                                // value={ProductData.original}
                                // onChange={handleChange}
                                // invalid={
                                //   validation.errors.price &&
                                //   validation.touched.price
                                //     ? true
                                //     : false
                                // }
                              />
                              {/* {validation.errors.price &&
                                validation.touched.price ? (
                                  <FormFeedback type="invalid">
                                    {validation.errors.price}
                                  </FormFeedback>
                                ) : null} */}
                            </div>
                          </div>
                        </Col>

                        {/* Discounted Price */}
                        <Col sm={6}>
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
                                id="product-price-addon"
                              >
                                ₹
                              </span>
                              <Input
                                type="text"
                                className="form-control"
                                id="product-price-input"
                                placeholder="Enter price"
                                name="original"
                                aria-label="Price"
                                aria-describedby="product-price-addon"
                                // value={ProductData.original}
                                // onChange={handleChange}
                                // invalid={
                                //   validation.errors.price &&
                                //   validation.touched.price
                                //     ? true
                                //     : false
                                // }
                              />
                              {/* {validation.errors.price &&
                                validation.touched.price ? (
                                  <FormFeedback type="invalid">
                                    {validation.errors.price}
                                  </FormFeedback>
                                ) : null} */}
                            </div>
                          </div>
                        </Col>

                        {/* Stocks */}
                        <Col sm={6}>
                          <div className="mb-3">
                            <label
                              className="form-label"
                              htmlFor="product-stock-input"
                            >
                              Stocks
                            </label>
                            <div className="input-group mb-3">
                              <Input
                                type="text"
                                className="form-control"
                                id="product-stock-input"
                                placeholder="Enter Stocks"
                                name="stock"
                                // value={ProductData.stock}
                                // onChange={handleChange}
                                // invalid={
                                //   validation.errors.stock &&
                                //   validation.touched.stock
                                //     ? true
                                //     : false
                                // }
                              />
                              {/* {validation.errors.stock &&
                                validation.touched.stock ? (
                                  <FormFeedback type="invalid">
                                    {validation.errors.stock}
                                  </FormFeedback>
                                ) : null} */}
                            </div>
                          </div>
                        </Col>

                        {/* Status */}
                        <Col sm={6}>
                          <div className="mb-3">
                            <label
                              className="form-label"
                              htmlFor="product-status-dropdown"
                            >
                              Status
                            </label>
                            <div className="input-group mb-3">
                              <select
                                className="form-select"
                                id="product-status-dropdown"
                                name="status"
                                aria-label="status"
                                aria-describedby="product-status-addon"
                                // value={ProductData.status}
                                // onChange={handleChange}
                                // invalid={
                                //   validation.errors.status &&
                                //   validation.touched.status
                                //     ? true
                                //     : false
                                // }
                              >
                                <option value="">Select Status</option>
                                <option value="active">active</option>
                                <option value="inactive">inactive</option>
                              </select>
                              {/* {validation.errors.status &&
                                validation.touched.status ? (
                                  <FormFeedback type="invalid">
                                    {validation.errors.status}
                                  </FormFeedback>
                                ) : null} */}
                            </div>
                          </div>
                        </Col>
                      </Row>
                      <Row className="align-items-center g-3">
                        <Col sm={2}>
                          <div className="mb-3 form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="isProductPopular"
                              name="isProductPopular"
                              // checked={ProductData.isProductPopular}
                              // onChange={handleCheckboxChange}
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
                              // checked={ProductData.isProductNew}
                              // onChange={handleCheckboxChange}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="isProductNew"
                            >
                              Is New Product
                            </label>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Card>
                <div className="text-end mb-3 me-4">
                  <button
                    type="submit"
                    className="btn btn-success w-sm"
                    // onClick={togglesuccessmodal}
                  >
                    Submit
                  </button>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default EcommerceNewAddProduct;
