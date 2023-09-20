import React, { useState } from "react";
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
import Dropzone from "react-dropzone";
import { useDropzone } from "react-dropzone";

const EcommerceNewAddProduct = () => {
  const [selectedImages, setSelectedImages] = useState([]);

  const handleImageSelection = (acceptedFiles) => {
    setSelectedImages([...selectedImages, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: handleImageSelection,
  });

  document.title = "Create Product | Shalin";
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
                              // value={selectedCategory}
                              // onChange={handleCategoryChange}
                            >
                              {/* Populate the options dynamically */}
                              <option value="">Select Category</option>
                              <option value="category1">Category 1</option>
                              <option value="category2">Category 2</option>
                              {/* Add more options as needed */}
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
                              <option value="category1">Category 1</option>
                              <option value="category2">Category 2</option>
                              {/* Add more options as needed */}
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
                              <option value="category1">Category 1</option>
                              <option value="category2">Category 2</option>
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
                        <Col sm={12}>
                          <div className="mb-3">
                            <label
                              className="form-label"
                              htmlFor="category-select"
                            >
                              Add Product Image Gallery.
                            </label>
                            <div {...getRootProps()} className="dropzone">
                              <input {...getInputProps()} />
                              <p>
                                Drag &amp; drop some images here, or click to
                                select images
                              </p>
                            </div>
                            <div className="image-thumbnails">
                              {selectedImages.map((file, index) => (
                                <img
                                  key={index}
                                  src={URL.createObjectURL(file)}
                                  alt={`Thumbnail ${index}`}
                                  className="thumbnail"
                                />
                              ))}
                            </div>
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
