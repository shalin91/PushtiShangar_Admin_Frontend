import React, { useContext, useEffect, useState } from "react";
import { Card, Col, Container, Form, Input, Label, Row } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import UiContent from "../../Components/Common/UiContent";
import { useParams } from "react-router-dom";
import SignContext from "../../contextAPI/Context/SignContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EditCoupons = () => {
  const { id } = useParams();
  const { GetSpecificCouponbyId, UpdateCoupon } = useContext(SignContext);
  const [CouponData, setCouponData] = useState({
    name: "",
    type: "",
    start: new Date(),
    expiry: new Date(),
    discount: 0,
    active: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : type === "number" ? parseFloat(value) : value;
  
    setCouponData({
      ...CouponData,
      [name]: newValue,
    });
  };

  const handleDateChange = (date) => {
    // Update the state with the selected date
    setCouponData({
      ...CouponData,
      expiry: date,
    });
  };
  
  const handleStartDateChange = (date) => {
    // Update the state with the selected date
    setCouponData({
      ...CouponData,
      start: date,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await UpdateCoupon(CouponData, id);
    console.log(id);

    console.log(res);
    if (res.success) {
      // Handle success
      // For example, display a success message and reset the form
      console.log("Coupon updated successfully");
      setCouponData({
        
      });
    } else {
      // Handle error
      console.error("Error adding content:", res.msg);
    }
  };

  const getspecificCouponbyId = async (id) => {
    const res = await GetSpecificCouponbyId(id);
    console.log(res);
    if (res.success) {
      setCouponData(res.coupon);
    }
  };


  useEffect(() => {
    getspecificCouponbyId(id);
  }, [id]);

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
                            placeholder="Coupon-Name"
                            value={CouponData.name}
                            onChange={handleChange}
                          />
                        </Col>
                        <Col lg={6}>
                          <Label className="form-label" htmlFor="category">
                            Coupon Type
                          </Label>
                          <select
                            className="form-select"
                            name="type"
                            value={CouponData.type}
                            onChange={handleChange}
                          >
                            <option value="%">%</option>
                            <option value="₹">₹</option>
                          </select>
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
                              type="number"
                              name="discount"
                              placeholder="add Discount"
                              value={CouponData.discount}
                              onChange={handleChange}
                            />
                          </div>
                        </Col>
                        <Col lg={6}>
                          <Label className="form-label" htmlFor="category">
                            Start Date
                          </Label>
                          <DatePicker
                            className="form-control"
                            selected={CouponData.start}
                            onChange={(date) => handleStartDateChange(date)}
                            placeholderText="Select a date"
                          />
                        </Col>
                        <Col lg={6}>
                          <Label className="form-label g-2" htmlFor="category">
                            Valid Till
                          </Label>
                          <DatePicker
                            className="form-control"
                            selected={CouponData.expiry}
                            onChange={(date) => handleDateChange(date)}
                            placeholderText="Select a date"
                          />
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

export default EditCoupons;
