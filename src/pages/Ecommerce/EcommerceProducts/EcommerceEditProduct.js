import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import {
  Alert,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormFeedback,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Nav,
  NavItem,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import SignContext from "../../../contextAPI/Context/SignContext";
import { useMemo } from "react";
import JoditEditor from "jodit-react";

const EcommerceEditProduct = () => {
  document.title = "Update Product | Shalin";
  const { id } = useParams();
  const {
    updateProduct,
    getSpecificProduct,
    getCategories,
    getSpecificSubcategories,
  } = useContext(SignContext);
  const [Error, setError] = useState("");
  const [Success, setSuccess] = useState("");
  const [ProductData, setProductData] = useState({
    name: "",
    description: "",
    category: "",
    subCategory: "",
    prices: {
      original: "",
      discounted: "",
    },
    mainImageUrl: "",
    stock: "",
    sku: "",
    status: "",
    isProductPopular: true,
    isProductNew: true,
  });
  const [CategoryData, setCategoryData] = useState({
    name: "",
    subCategories: [],
  });
  const [ProductCategories, setProductCategories] = useState([]);
  const [specificSubcategories, setSpecificSubcategories] = useState([]);
  const [MainImage, setMainImage] = useState([]);
  const [editorContent, setEditorContent] = useState("");

  const getspecificProduct = async (ProductId) => {
    const res = await getSpecificProduct(ProductId);
    console.log(res);
    if (res.success) {
      setProductData(res.product);

      if (res.product.category) {
        getspecificSubcategories(res.product.category);
      }
    }
  };

  const getspecificSubcategories = async (categoryId) => {
    const res = await getSpecificSubcategories(categoryId);
    console.log(res);
    if (res.success) {
      setSpecificSubcategories(res.subCategories);
    }
  };

  const getcategories = async () => {
    const res = await getCategories();
    console.log(res);
    if (res.success) {
      setProductCategories(res.categories);
    }
  };

  const handleChange = (e) => {
    const { name, value, type , checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setProductData({ ...ProductData, [name]: newValue })
    console.log(newValue)

    // If the selected field is 'category', fetch the specific subcategories
    if (name === "category") {
      // Update the selected category in the ProductData state
      setProductData({ ...ProductData, [name]: value });

      // Call the backend API to get the specific subcategories based on the category ID
      getspecificSubcategories(value);
    } else {
      // For other fields, update the ProductData state as usual
      setProductData({ ...ProductData, [name]: value });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setMainImage({ file: file, preview: URL.createObjectURL(file) });
  };

  const handleEditorChange = (newContent) => {
    // Step 3: Implement a function to update the editor content
    setEditorContent(newContent);

    // Also update the content field in the ContentData state
    setProductData({
      ...ProductData,
      description: newContent,
    });
  };

  // const handleCheckboxChange = (e) => {
  //   const { name, checked } = e.target;
  //   setProductData((ProductData) => ({
  //     ...ProductData,
  //     [name]: checked,
  //   }));
  // };

  const handleChangeCategory = (e) => {
    const { name, value } = e.target;
    if (name === "subCategories") {
      // Split the input value into an array of subcategories
      const subCategoriesArray = value.split("\n");
      setCategoryData({ ...CategoryData, [name]: subCategoriesArray });
    } else {
      setCategoryData({ ...CategoryData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await updateProduct(ProductData, id, MainImage.file);
    console.log(res);
    if (res.success) {
      setSuccess(res.msg);
      // setTimeout(() => {
      //   navigate("/menumaster");
      // }, 1000);
    } else {
      setError(res.msg);
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  };

  const config = useMemo(
    () => ({
      readonly: false,
    }),
    []
  );

  useEffect(() => {
    getspecificProduct(id);
    getcategories();
    if (ProductData.category) {
      getspecificSubcategories(ProductData.category);
    }
  }, [id]);

  return (
    <>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Update Product" pageTitle="Products" />
          <Row>
            <Col lg={12}>
              <Form onSubmit={(e) => handleSubmit(e)}>
                <Card>
                  <CardBody>
                    <div className="mb-3">
                      <Label
                        className="form-label"
                        htmlFor="product-title-input"
                      >
                        Product Title
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="product-title-input"
                        placeholder="Enter product title"
                        name="name"
                        value={ProductData.name}
                        onChange={handleChange}
                        // invalid={
                        //   validation.errors.name && validation.touched.name
                        //     ? true
                        //     : false
                        // }
                      />

                      {/* {validation.errors.name && validation.touched.name ? (
                      <FormFeedback type="invalid">
                        {validation.errors.name}
                      </FormFeedback>
                    ) : null} */}
                    </div>

                    <div>
                      <Label>Product Description</Label>
                      <JoditEditor
                        config={config}
                        tabIndex={1}
                        id="description"
                        name="description"
                        value={ProductData.description}
                        onChange={handleEditorChange}
                      />
                    </div>
                  </CardBody>
                </Card>

                <Col lg={12}>
                  <Card>
                    <CardHeader>
                      <h5 className="card-title mb-0">Product Categories</h5>
                    </CardHeader>
                    <CardBody>
                      <p className="text-muted mb-2">
                        {" "}
                        Select product category
                      </p>

                      <Input
                        name="category"
                        type="select"
                        className="form-select"
                        id="category-field"
                        value={ProductData.category}
                        onChange={handleChange}
                      >
                        {/* Render the options for the categories */}
                        {ProductCategories.map((productCategory) => {
                          return (
                            <option
                              key={productCategory.name}
                              value={productCategory._id}
                            >
                              {productCategory.name}
                            </option>
                          );
                        })}
                      </Input>
                      {/* {validation.touched.category &&
                      validation.errors.category ? (
                        <FormFeedback type="invalid">
                          {validation.errors.category}
                        </FormFeedback>
                      ) : null} */}
                    </CardBody>
                  </Card>

                  <Card>
                    <CardHeader>
                      <h5 className="card-title mb-0">
                        Product Sub-Categories
                      </h5>
                    </CardHeader>
                    <CardBody>
                      <p className="text-muted mb-2">
                        {" "}
                        Select product subcategory
                      </p>

                      <Input
                        name="subCategory"
                        type="select"
                        className="form-select"
                        id="category-field"
                        value={ProductData.subCategory}
                        onChange={handleChange}
                      >
                        <option value="select subcategory">
                          Select Subcategory
                        </option>
                        {specificSubcategories.map((subcategory) => {
                          return (
                            <option key={subcategory} value={subcategory}>
                              {subcategory}
                            </option>
                          );
                        })}
                      </Input>
                      {/* {validation.touched.category &&
                      validation.errors.category ? (
                        <FormFeedback type="invalid">
                          {validation.errors.category}
                        </FormFeedback>
                      ) : null} */}
                    </CardBody>
                  </Card>
                </Col>

                <Card>
                  <CardHeader>
                    <h5 className="card-title mb-0">Product Gallery</h5>
                  </CardHeader>
                  <CardBody>
                    <div className="mb-4">
                      <h5 className="fs-14 mb-1">Product Image</h5>
                      <p className="text-muted">Add Product Image.</p>
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
                                <div
                                  className="avatar-title bg-light border rounded-circle text-muted cursor-pointer"
                                  onClick={() => {
                                    document
                                      .getElementById("mainImage")
                                      .click();
                                  }}
                                >
                                  <i className="ri-image-fill"></i>
                                </div>
                              </div>
                            </label>
                            <input
                              className="form-control d-none"
                              defaultValue=""
                              name="mainImage"
                              id="mainImage"
                              type="file"
                              accept="image/png, image/gif, image/jpeg"
                              onChange={handleImageChange}
                            />
                          </div>
                          <div className="avatar-lg">
                            <div className="avatar-title bg-light rounded">
                              <img
                                src={MainImage.preview}
                                id="product-img"
                                alt=""
                                className="avatar-md h-auto"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* <div>
                    <h5 className="fs-14 mb-1">Product Gallery</h5>
                    <p className="text-muted">Add Product Gallery Images.</p>

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
                            <div className="mb-3">
                              <i className="display-4 text-muted ri-upload-cloud-2-fill" />
                            </div>
                            <h5>Drop files here or click to upload.</h5>
                          </div>
                        </div>
                      )}
                    </Dropzone>
                    <div className="list-unstyled mb-0" id="file-previews">
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
                              </Row>
                            </div>
                          </Card>
                        );
                      })}
                    </div>
                  </div> */}
                  </CardBody>
                </Card>

                <Card>
                  <CardHeader>
                    <h5 className="header"> General Info </h5>
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col sm={4}>
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
                              value={ProductData.stock}
                              onChange={handleChange}
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

                      <Col sm={4}>
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
                              value={ProductData.prices.original}
                              onChange={handleChange}
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

                      <Col sm={4}>
                        <div className="mb-3">
                          <label
                            className="form-label"
                            htmlFor="product-Discount-input"
                          >
                            Discounted Price
                          </label>
                          <div className="input-group mb-3">
                            <span
                              className="input-group-text"
                              id="product-Discount-addon"
                            >
                              ₹
                            </span>
                            <Input
                              type="text"
                              className="form-control"
                              id="product-Discount-input"
                              placeholder="Enter Discounted Price"
                              name="discounted"
                              aria-label="product_discount"
                              aria-describedby="product-orders-addon"
                              value={ProductData.prices.discounted}
                              onChange={handleChange}
                              // invalid={
                              //   validation.errors.product_discount &&
                              //   validation.touched.product_discount
                              //     ? true
                              //     : false
                              // }
                            />
                            {/* {validation.errors.product_discount &&
                          validation.touched.product_discount ? (
                            <FormFeedback type="invalid">
                              {validation.errors.product_discount}
                            </FormFeedback>
                          ) : null} */}
                          </div>
                        </div>
                      </Col>

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
                              placeholder="Enter sku"
                              name="sku"
                              aria-label="orders"
                              aria-describedby="product-orders-addon"
                              value={ProductData.sku}
                              onChange={handleChange}
                              // invalid={
                              //   validation.errors.orders &&
                              //   validation.touched.orders
                              //     ? true
                              //     : false
                              // }
                            />
                            {/* {validation.errors.orders &&
                                validation.touched.orders ? (
                                  <FormFeedback type="invalid">
                                    {validation.errors.orders}
                                  </FormFeedback>
                                ) : null} */}
                          </div>
                        </div>
                      </Col>

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
                              value={ProductData.status}
                              onChange={handleChange}
                              // invalid={
                              //   validation.errors.status &&
                              //   validation.touched.status
                              //     ? true
                              //     : false
                              // }
                            >
                              {/* <option value="">Select Status</option> */}
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
                  </CardBody>
                </Card>

                <Card>
                  <CardHeader>
                    <h5 className="card-title mb-0">Product Attributes</h5>
                  </CardHeader>
                  <CardBody>
                    <div className="mb-3 form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="isProductPopular"
                        name="isProductPopular"
                        checked={ProductData.isProductPopular}
                        onChange={handleChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="isProductPopular"
                      >
                        Is Popular Product
                      </label>
                    </div>
                    <div className="mb-3 form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="isProductNew"
                        name="isProductNew"
                        checked={ProductData.isProductNew}
                        onChange={handleChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="isProductNew"
                      >
                        Is New Product
                      </label>
                    </div>
                  </CardBody>
                </Card>

                <div className="text-end mb-3">
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

export default EcommerceEditProduct;
