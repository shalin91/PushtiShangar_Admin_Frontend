import React, { useContext, useEffect, useState } from "react";
import SignContext from "../../contextAPI/Context/SignContext";
import UiContent from "../../Components/Common/UiContent";
import { Card, Col, Container, Form, Input, Label, Row } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import { Formik } from "formik";

const AddStocks = ({ refreshTable , UpdateStocks}) => {
  const { AddStocks, getProducts } = useContext(SignContext);
  const [StocksData, setStocksData] = useState({
    ProductId: "",
    quantity: "",
    currentPricePerUnit: "",
    date: "",
  });
  const [Product, setProduct] = useState([]);
  const [editingStockId, setEditingStockId] = useState(null);

  const validationSchema = Yup.object().shape({
    ProductId: Yup.string().required("Select a product"),
    quantity: Yup.number()
      .typeError("Quantity must be a number")
      .required("Enter the quantity")
      .positive("Quantity must be a positive number"),
    currentPricePerUnit: Yup.number()
      .typeError("Price must be a number")
      .required("Enter the current price")
      .positive("Price must be a positive number"),
    date: Yup.date().required("Select a date"),
  });

  // const handleChange = (e) => {
  //   const { name, value, type, checked } = e.target;
  //   const newValue = type === "checkbox" ? checked : value;

  //   setStocksData({
  //     ...StocksData,
  //     [name]: newValue,
  //   });
  // };

  const handleSavedStocks = async (Values) => {
    if (editingStockId) {
      // Update the existing stock item
      const res = await UpdateStocks(editingStockId,  Values);
      console.log(res);
      if (res.success) {
        refreshTable();
        setEditingStockId(null);
      } else {
        console.error("Error updating stock:", res.msg);
      }
    } else {
      // Add a new stock item
      const res = await AddStocks(Values);
      console.log(res);
      if (res.success) {
        refreshTable();
      } else {
        console.error("Error adding stock:", res.msg);
      }
    }
    // Reset the form
    // resetForm();
  };

  const Getproducts = async () => {
    const res = await getProducts();
    console.log(res);
    setProduct(res.products);
  };

  useEffect(() => {
    Getproducts();
  }, []);

  document.title = "Add Stocks | Stocks";

  return (
    <>
      <Row>
        <Col lg={12}>
          <Formik
            initialValues={{
              ProductId: "",
              quantity: "",
              currentPricePerUnit: "",
              date: "",
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { resetForm }) => {
              await handleSavedStocks(values);
              resetForm();
              // togglemodal();
            }}
          >
            {({
              isSubmitting,
              handleChange,
              handleSubmit,
              errors,
              touched,
              values,
              handleBlur,
              setFieldValue,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Card>
                  <div className="card-body">
                    <div className="live-preview">
                      <Row className="align-items-center g-3">
                        <Col lg={3}>
                          <Label className="form-label" htmlFor="category">
                            Select Product
                          </Label>
                          <select
                            className="form-select"
                            id="state"
                            name="ProductId"
                            value={values.ProductId}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          >
                            <option value="">Select Product</option>
                            {Product.map((product) => {
                              return (
                                <option key={product._id} value={product._id}>
                                  {product.name}
                                </option>
                              );
                            })}
                          </select>
                          <p className="error text-danger">
                            {errors.ProductId &&
                              touched.ProductId &&
                              errors.ProductId}
                          </p>
                        </Col>
                        <Col lg={3}>
                          <Label className="form-label" htmlFor="category">
                            Add Quantity
                          </Label>
                          <Input
                            className="form-control"
                            type="text"
                            name="quantity"
                            placeholder="add quantity"
                            value={values.quantity}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          <p className="error text-danger">
                            {errors.quantity &&
                              touched.quantity &&
                              errors.quantity}
                          </p>
                        </Col>
                        <Col lg={3}>
                          <Label className="form-label" htmlFor="category">
                            Add Current Price
                          </Label>
                          <Input
                            className="form-control"
                            type="text"
                            name="currentPricePerUnit"
                            placeholder="add current price"
                            value={values.currentPricePerUnit}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          <p className="error text-danger">
                            {errors.currentPricePerUnit &&
                              touched.currentPricePerUnit &&
                              errors.currentPricePerUnit}
                          </p>
                        </Col>
                        <Col lg={3}>
                          <Label className="form-label" htmlFor="category">
                            Date
                          </Label>
                          <DatePicker
                            className="form-control"
                            selected={values.date}
                            onChange={(date) => setFieldValue("date", date)}
                            placeholderText="Select a date"
                          />
                          <p className="error text-danger">
                            {errors.date && touched.date && errors.date}
                          </p>
                        </Col>
                        <div className="text-center mb-3">
                          <button
                            type="submit"
                            className="btn btn-success w-sm"
                            //   onClick={togglesuccessmodal}
                          >
                            Submit
                          </button>
                        </div>
                      </Row>
                    </div>
                  </div>
                </Card>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </>
  );
};

export default AddStocks;
