import React, { useContext, useState } from "react";
import SignContext from "../../contextAPI/Context/SignContext";
import UiContent from "../../Components/Common/UiContent";
import { Card, Col, Container, Form, Input, Label, Row } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddCoupons = () => {
  const { CreateCoupon } = useContext(SignContext);
  const [CouponData, setCouponData] = useState({
    name: "",
    type: "",
    expiry: "",
    discount: "",
    active: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setCouponData({
      ...CouponData,
      [name]: newValue,
    });
  };

  const handleDateChange = (date) => {
  // Update the state with the selected date
  setCouponData({
    ...CouponData,
    validTill: date,
  });
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await CreateCoupon(CouponData);

    console.log(res);
    if (res.success) {
      // Handle success
      // For example, display a success message and reset the form
      console.log("Coupon added successfully");
      setCouponData({
        name: "",
        type: "",
        expiry: "",
        discount: "",
        active: "",
      });
    } else {
      // Handle error
      console.error("Error adding content:", res.msg);
    }
  };

  document.title = "Add Coupon | Content";

  return (
    <>
      <UiContent />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Add Coupon" pageTitle="Coupon" />
          <Row>
            <Col lg={12}>
              <Form onSubmit={handleSubmit}>
                <Card>
                  <div className="card-body">
                    <div className="live-preview">
                      <Row className="align-items-center g-3">
                        <Col lg={6}>
                          <Label className="form-label" htmlFor="category">
                            Coupon Name
                          </Label>
                          <Input
                            className="form-control"
                            type="text"
                            name="name"
                            placeholder="add Coupon-Name"
                            value={CouponData.name}
                            onChange={handleChange}
                          />
                        </Col>
                        <Col lg={6}>
                          <Label className="form-label" htmlFor="category">
                            Coupon Type
                          </Label>
                          <Input
                            className="form-control"
                            type="text"
                            name="type"
                            placeholder="add Type"
                            value={CouponData.type}
                            onChange={handleChange}
                          />
                        </Col>
                      </Row>
                      <Row className="align-items-center g-3">
                      <Col lg={6}>
                        <div className="mt-3">
                          <Label className="form-label" htmlFor="category">
                            Discount
                          </Label>
                          <Input
                            className="form-control"
                            type="text"
                            name="discount"
                            placeholder="add Content-Type"
                            value={CouponData.discount}
                            onChange={handleChange}
                          />
                          </div>
                        </Col>
                        <Col lg={6}>
                          <div className="mt-3">
                          <Label className="form-label g-2" htmlFor="category">
                            Valid Till
                          </Label>
                          <DatePicker
                            className="form-control"
                            selected={CouponData.validTill}
                            onChange={(date) => handleDateChange(date)} 
                            placeholderText="Select a date"
                          />
                        </div>
                        </Col>
                        
                        <div className="mt-3">
                            <Input
                              type="checkbox"
                              id="isActive"
                              label="Is Active"
                              name="active"
                              checked={CouponData.active}
                              onChange={handleChange}
                            />
                            <label className="me-2">Is Active</label>
                          </div>
                      </Row>
                    </div>
                  </div>
                </Card>
                <div className="text-end mb-3">
                  <button
                    type="submit"
                    className="btn btn-success w-sm"
                    //   onClick={togglesuccessmodal}
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

export default AddCoupons;
