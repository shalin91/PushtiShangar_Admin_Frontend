import React, { useContext, useEffect, useState } from "react";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import {
  Card,
  CardBody,
  Col,
  Container,
  CardHeader,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  Input,
  Label,
  FormFeedback,
  Form,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert,
} from "reactstrap";

// Redux
import { useDispatch } from "react-redux";
import {
  addNewProduct as onAddNewProduct,
  updateProduct as onUpdateProduct,
} from "../../../store/ecommerce/action";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import classnames from "classnames";
import Dropzone from "react-dropzone";
import { Link, useNavigate } from "react-router-dom";

//formik
import { useFormik } from "formik";
import * as Yup from "yup";

// Import React FilePond
import { registerPlugin } from "react-filepond";
import Flatpickr from "react-flatpickr";
import Select from "react-select";
// Import FilePond styles
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import SignContext from "../../../contextAPI/Context/SignContext";
import JoditEditor from "jodit-react";
import { useMemo } from "react";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const EcommerceAddProduct = (props) => {
  document.title = "Create Product | Shalin";
  const { addProduct, getCategories, getSpecificSubcategories, addCategory } =
    useContext(SignContext);
  const [Error, setError] = useState("");
  const [Success, setSuccess] = useState("");
  const [ProductData, setProductData] = useState({
    name: "",
    description: "",
    category: "",
    subCategory: "",
    original: "",
    discounted: "",
    mainImageUrl: "",
    // imageGallery: "",
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
  const [ImageGallery, setImageGallery] = useState([]);
  const [modal, setModal] = useState(false);
  const [successmodal, setSuccessModal] = useState(false);
  const [editorContent, setEditorContent] = useState("");

  const togglemodal = () => {
    setModal(!modal);
  };

  const togglesuccessmodal = () => {
    setSuccessModal(!successmodal);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

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

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setProductData((ProductData) => ({
      ...ProductData,
      [name]: checked,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await addProduct(ProductData, ImageGallery, MainImage.file);
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

  const handleSubmitCategory = async (e) => {
    e.preventDefault();
    const resCategory = await addCategory(CategoryData);
    console.log(resCategory);
    if (resCategory.success) {
      setSuccess(resCategory.msg);
      // setTimeout(() => {
      //   navigate("/menumaster");
      // }, 1000);
    } else {
      setError(resCategory.msg);
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  };

  const getcategories = async () => {
    const res = await getCategories();
    // console.log(res);
    if (res.success) {
      setProductCategories(res.categories);
    }
  };

  const getspecificSubcategories = async (categoryId) => {
    const res = await getSpecificSubcategories(categoryId);
    if (res.success) {
      setSpecificSubcategories(res.subCategories);
    }
  };

  const config = useMemo(
    () => ({
      readonly: false,
    }),
    []
  );

  useEffect(() => {
    getcategories();
    if (ProductData.category) {
      getspecificSubcategories(ProductData.category);
    }
  }, []);

  const navigate = useNavigate();

  const [customActiveTab, setcustomActiveTab] = useState("1");
  const toggleCustom = (tab) => {
    if (customActiveTab !== tab) {
      setcustomActiveTab(tab);
    }
  };
  // const [selectedFiles, setselectedFiles] = useState([]);

  // function handleAcceptedFiles(files) {
  //   console.log(files);
  //   files.map((file) =>
  //     Object.assign(file, {
  //       preview: URL.createObjectURL(file),
  //       formattedSize: formatBytes(file.size),
  //     })
  //   );
  //   setselectedFiles(files);
  //   setImageGallery(files);
  // }

  // console.log(selectedFiles);

  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  const dateFormat = () => {
    let d = new Date(),
      months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
    let h = d.getHours() % 12 || 12;
    let ampm = d.getHours() < 12 ? "AM" : "PM";
    return (
      d.getDate() +
      " " +
      months[d.getMonth()] +
      ", " +
      d.getFullYear() +
      ", " +
      h +
      ":" +
      d.getMinutes() +
      " " +
      ampm
    ).toString();
  };

  const [date, setDate] = useState(dateFormat());

  const dateformate = (e) => {
    const dateString = e.toString().split(" ");
    let time = dateString[4];
    let H = +time.substr(0, 2);
    let h = H % 12 || 12;
    h = h <= 9 ? (h = "0" + h) : h;
    let ampm = H < 12 ? "AM" : "PM";
    time = h + time.substr(2, 3) + " " + ampm;

    const date = dateString[2] + " " + dateString[1] + ", " + dateString[3];
    const orderDate = (date + ", " + time).toString();
    setDate(orderDate);
  };

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      name: "",
      price: "",
      stock: "",
      orders: "",
      category: "",
      publishedDate: "",
      status: "",
      rating: 4.5,
      manufacturer_name: "",
      manufacturer_brand: "",
      product_discount: "",
      meta_title: "",
      meta_keyword: "",
      product_tags: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter a Product Title"),
      price: Yup.string().required("Please Enter a Product Price"),
      stock: Yup.string().required("Please Enter a Product stock"),
      orders: Yup.string().required("Please Enter a Product orders"),
      category: Yup.string().required("Please Enter a Product category"),
      status: Yup.string().required("Please Enter a Product status"),
      manufacturer_name: Yup.string().required(
        "Please Enter a Manufacturer Name"
      ),
      manufacturer_brand: Yup.string().required(
        "Please Enter a Manufacturer Brand"
      ),
      product_discount: Yup.string().required(
        "Please Enter a Product Discount"
      ),
      meta_title: Yup.string().required("Please Enter a Meta Title"),
      meta_keyword: Yup.string().required("Please Enter a Meta Keyword"),
      product_tags: Yup.string().required("Please Enter a Product Tags"),
    }),
  });

  return (
    <>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Create Product" pageTitle="Ecommerce" />

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
                        id="content"
                        name="content"
                        value={editorContent}
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
                        <Link
                          to="#"
                          className="float-end text-decoration-underline"
                          onClick={togglemodal}
                        >
                          Add New
                        </Link>
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
                      {validation.touched.category &&
                      validation.errors.category ? (
                        <FormFeedback type="invalid">
                          {validation.errors.category}
                        </FormFeedback>
                      ) : null}
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
                      {validation.touched.category &&
                      validation.errors.category ? (
                        <FormFeedback type="invalid">
                          {validation.errors.category}
                        </FormFeedback>
                      ) : null}
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
                    <Nav className="nav-tabs-custom card-header-tabs border-bottom-0">
                      <NavItem>
                        <NavLink
                          style={{ cursor: "pointer" }}
                          className={classnames({
                            active: customActiveTab === "1",
                          })}
                          onClick={() => {
                            toggleCustom("1");
                          }}
                        >
                          General Info
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </CardHeader>

                  <CardBody>
                    <TabContent activeTab={customActiveTab}>
                      <TabPane id="addproduct-general-info" tabId="1">
                        <Row></Row>
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
                                  invalid={
                                    validation.errors.stock &&
                                    validation.touched.stock
                                      ? true
                                      : false
                                  }
                                />
                                {validation.errors.stock &&
                                validation.touched.stock ? (
                                  <FormFeedback type="invalid">
                                    {validation.errors.stock}
                                  </FormFeedback>
                                ) : null}
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
                                  value={ProductData.original}
                                  onChange={handleChange}
                                  invalid={
                                    validation.errors.price &&
                                    validation.touched.price
                                      ? true
                                      : false
                                  }
                                />
                                {validation.errors.price &&
                                validation.touched.price ? (
                                  <FormFeedback type="invalid">
                                    {validation.errors.price}
                                  </FormFeedback>
                                ) : null}
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
                                  value={ProductData.discounted}
                                  onChange={handleChange}
                                  invalid={
                                    validation.errors.product_discount &&
                                    validation.touched.product_discount
                                      ? true
                                      : false
                                  }
                                />
                                {validation.errors.product_discount &&
                                validation.touched.product_discount ? (
                                  <FormFeedback type="invalid">
                                    {validation.errors.product_discount}
                                  </FormFeedback>
                                ) : null}
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
                                  invalid={
                                    validation.errors.orders &&
                                    validation.touched.orders
                                      ? true
                                      : false
                                  }
                                />
                                {validation.errors.orders &&
                                validation.touched.orders ? (
                                  <FormFeedback type="invalid">
                                    {validation.errors.orders}
                                  </FormFeedback>
                                ) : null}
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
                                  invalid={
                                    validation.errors.status &&
                                    validation.touched.status
                                      ? true
                                      : false
                                  }
                                >
                                  <option value="">Select Status</option>
                                  <option value="active">active</option>
                                  <option value="inactive">inactive</option>
                                </select>
                                {validation.errors.status &&
                                validation.touched.status ? (
                                  <FormFeedback type="invalid">
                                    {validation.errors.status}
                                  </FormFeedback>
                                ) : null}
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </TabPane>
                    </TabContent>
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
                        onChange={handleCheckboxChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="isProductPopular"
                      >
                        Is Popular Product
                      </label>
                      <div>
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="isProductNew"
                          name="isProductNew"
                          checked={ProductData.isProductNew}
                          onChange={handleCheckboxChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="isProductNew"
                        >
                          Is New Product
                        </label>
                      </div>
                    </div>
                  </CardBody>
                </Card>
                <div className="text-end mb-3">
                  <button
                    type="submit"
                    className="btn btn-success w-sm"
                    onClick={togglesuccessmodal}
                  >
                    Submit
                  </button>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>

      {/* modal confirmation pop-up */}
      <Modal
        isOpen={successmodal}
        role="dialog"
        autoFocus={true}
        centered
        id="removeItemModal"
        toggle={togglesuccessmodal}
      >
        <ModalHeader
          toggle={() => {
            setSuccessModal(!successmodal);
          }}
        ></ModalHeader>
        <ModalBody>
          <div className="mt-2 text-center">
            <lord-icon
              src="https://cdn.lordicon.com/azartkjs.json"
              trigger="loop"
              colors="primary:#f7b84b,secondary:#f06548"
              style={{ width: "100px", height: "100px" }}
            ></lord-icon>
            <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
              <h4>Product Saved</h4>
              <p className="text-muted mx-4 mb-0">
                Are you Sure You want to Remove this Address ?
              </p>
            </div>
          </div>
          <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
            <button
              type="button"
              className="btn w-sm btn-light"
              onClick={() => {
                setSuccessModal(!successmodal);
              }}
            >
              Close
            </button>
            <button
              type="button"
              className="btn w-sm btn-success"
              // onClick={() => {
              //   setSuccessModal(!successmodal);
              // }}
            >
              <Link to="/dashboard">Okay, Go to Dashboard !</Link>
            </button>
          </div>
        </ModalBody>
      </Modal>

      {/* modal Add Category */}
      <Modal
        isOpen={modal}
        role="dialog"
        autoFocus={true}
        centered
        id="addCategoryModal"
        toggle={togglemodal}
      >
        <Form onSubmit={(e) => handleSubmitCategory(e)}>
          <ModalHeader
            toggle={() => {
              setModal(!modal);
            }}
          >
            <h5 className="modal-title" id="addAddressModalLabel">
              Add Category
            </h5>
            {Error && Error ? <Alert color="danger"> {Error} </Alert> : null}
            {Success && Success ? (
              <Alert color="success"> {Success} </Alert>
            ) : null}
          </ModalHeader>
          <ModalBody>
            <div>
              <div className="mb-3">
                <Label for="category" className="form-label">
                  Category
                </Label>
                <Input
                  className="form-control"
                  id="Add Category"
                  placeholder="Enter Category"
                  name="name"
                  value={CategoryData.name}
                  onChange={handleChangeCategory}
                />
              </div>

              <div className="mb-3">
                <div className="mb-3">
                  <Label for="subCategories" className="form-label">
                    Sub Categories
                  </Label>
                  <textarea
                    className="form-control"
                    id="Add SubCategory"
                    placeholder="Enter SubCategory"
                    name="subCategories"
                    value={CategoryData.subCategories.join("\n")} // Join array values with newlines
                    onChange={handleChangeCategory}
                  ></textarea>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <button
              type="button"
              className="btn btn-light"
              onClick={() => {
                setModal(!modal);
              }}
            >
              Close
            </button>
            <button
              type="submit"
              className="btn btn-success"
              onClick={() => {
                setModal(!modal);
              }}
            >
              Save
            </button>
          </ModalFooter>
        </Form>
      </Modal>
    </>
  );
};

export default EcommerceAddProduct;
