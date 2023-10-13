import React, { useContext, useEffect, useState } from "react";
import SignContext from "../../contextAPI/Context/SignContext";
import UiContent from "../../Components/Common/UiContent";
import { Card, Col, Container, Form, Input, Label, Row } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import DatePicker from "react-datepicker";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import { Formik } from "formik";

const noSortingGroup = [
  { value: "Madrid", label: "Madrid" },
  { value: "Toronto", label: "Toronto" },
  { value: "Vancouver", label: "Vancouver" },
  { value: "London", label: "London" },
  { value: "Manchester", label: "Manchester" },
  { value: "Liverpool", label: "Liverpool" },
  { value: "Paris", label: "Paris" },
  { value: "Malaga", label: "Malaga" },
  { value: "Washington", label: "Washington" },
  { value: "Lyon", label: "Lyon" },
  { value: "Marseille", label: "Marseille" },
  { value: "Hamburg", label: "Hamburg" },
  { value: "Munich", label: "Munich" },
  { value: "Barcelona", label: "Barcelona" },
  { value: "Berlin", label: "Berlin" },
  { value: "Montreal", label: "Montreal" },
  { value: "New York", label: "New York" },
  { value: "Michigan", label: "Michigan" },
];

const AddStocks = ({ refreshTable, UpdatedStocks }) => {
  const { AddStocks, getProducts,UpdateStocks } = useContext(SignContext);

  const [Product, setProduct] = useState([]);
  const [editingStockId, setEditingStockId] = useState(null);
  const [selectedForUpdate, setSelectedForUpdate] = useState(null);
  const [SelectedProductId, setSelectedProductId] = useState("");



  const handleSavedStocks = async (Values) => {
    if (UpdatedStocks) {
      const res = await UpdateStocks(editingStockId, Values);
      if (res.success) {
        refreshTable();
        setEditingStockId(null);
      } else {
        console.error("Error updating stock:", res.msg);
      }
    } else {
      const res = await AddStocks(Values);
      if (res.success) {
        refreshTable();
        setSelectedProductId("")
      } else {
        console.error("Error adding stock:", res.msg);
      }
    }
  };

  const Getproducts = async () => {
    const res = await getProducts();
    setProduct(res.products);
  };

  useEffect(() => {
    Getproducts();
    setSelectedForUpdate(UpdatedStocks)
    console.log(selectedForUpdate)
  }, [UpdatedStocks]);

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




  document.title = "Add Stocks | Stocks";

  return (
    <>
      <Row>
        <Col lg={12}>
          <Formik
          //enableReinitialize={true}
            initialValues={{
              ProductId: SelectedProductId||"",
              quantity: (selectedForUpdate&& selectedForUpdate.quantity) ||"",
              currentPricePerUnit:(selectedForUpdate&& selectedForUpdate.currentPricePerUnit)|| "",
              date: (selectedForUpdate && new Date(selectedForUpdate.date.split("T")[0])) || null, // Use `null` as a placeholder if date is not provided
            } }
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
              isValid,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Row className="align-items-center g-3">
                  <Col lg={4} md={6}>
                    <Label className="form-label" htmlFor="category">
                      select product with SKU*
                    </Label>
                    <Select
                      value={SelectedProductId}
                      onChange={selectedOption => {
                        setSelectedProductId(selectedOption);
                        handleChange("ProductId")(selectedOption.value);
                        
                      }
                    }
                      options={Product.map((item) => {
                        return { value: item._id, label: item.sku };
                      })}
                    />
                  </Col>

                  <Col lg={2}>
                    <Label className="form-label" htmlFor="category">
                      Add Quantity*
                    </Label>
                    <Input
                      className="form-control"
                      name="quantity"
                      type="number"
                      placeholder="add quantity"
                      value={values.quantity}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Col>
                  <Col lg={2}>
                    <Label className="form-label" htmlFor="category">
                      Add Current Price*
                    </Label>
                    <Input
                      className="form-control"
                      type="number"
                      name="currentPricePerUnit"
                      placeholder="add current price"
                      value={values.currentPricePerUnit}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
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
                  </Col>
                  <Col lg={1}>
                    <div className="text-center">
                      <button
                        disabled={isSubmitting || !isValid}
                        type="submit"
                        className="btn btn-primary w-sm mt-4"
                        //   onClick={togglesuccessmodal}
                      >
                        Submit
                      </button>
                    </div>
                   
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </>
  );
};

export default AddStocks;
