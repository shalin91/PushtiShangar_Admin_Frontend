import React, { useContext, useEffect, useState } from "react";
import SignContext from "../../contextAPI/Context/SignContext";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { Link } from "react-router-dom";

const AllOrders = () => {
  const { GetAllOrders, getCustomers } = useContext(SignContext);
  const [OrdersData, setOrdersData] = useState([]);
  const [CustomerNameMapping, setCustomerNameMapping] = useState({});

  const GetOrders = async () => {
    const res = await GetAllOrders();
    console.log(res);

    setOrdersData(res.orders);
  };

  useEffect(() => {
    GetOrders();
  }, []);

  return (
    <>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="All Orders" pageTitle="Orders" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Orders</h4>
                </CardHeader>
                <CardBody>
                  <div id="contentList">
                    <Row className="g-4 mb-3">
                      <Col className="col-sm">
                        <div className="d-flex justify-content-sm-end">
                          <div className="search-box ms-2">
                            <input
                              type="text"
                              className="form-control search"
                              placeholder="Search..."
                            />
                            <i className="ri-search-line search-icon"></i>
                          </div>
                        </div>
                      </Col>
                      <Col className="col-sm-auto">
                        <div>
                          <Link
                            to="/addcoupon"
                            className="btn btn-success add-btn me-1"
                            id="create-btn"
                          >
                            <i className="ri-add-line align-bottom me-1"></i>{" "}
                            Add
                          </Link>
                        </div>
                      </Col>
                    </Row>
                    <div className="table-responsive table-card mt-1 mb-3">
                      <table
                        className="table align-middle table-nowrap"
                        id="customerTable"
                      >
                        <thead className="table-light">
                          <tr>
                            <th className="name">Index</th>
                            <th className="name">Order Id</th>
                            <th className="name">First Name</th>
                            <th className="name">Last Name</th>
                            <th className="name">Total Amount</th>
                            <th className="name">Payment Method</th>
                            {/* <th className="name">Expiry</th> */}
                            <th className="name">Status</th>
                            <th className="action">Action</th>
                          </tr>
                        </thead>

                        <tbody className="list form-check-all">
                          {OrdersData.map((order, key) => (
                            <tr key={order.id}>
                              <th scope="row">
                                <div className="form-check">
                                  <td className="product-name">{key + 1}</td>
                                </div>
                              </th>
                              <td className="product-name">{order._id}</td>
                              <td className="product-name">{order.FirstName}</td>
                              <td className="product-name">{order.LastName}</td>
                              <td className="product-name">
                                ₹{order.totalAmount}
                              </td>
                              <td className="product-name">
                                {order.paymentMethod}
                              </td>
                              <td className="status">
                                {order.status === "completed" ? (
                                  <span
                                    className="badge badge-soft"
                                    style={{
                                      backgroundColor: "#28a745",
                                      color: "white",
                                    }}
                                  >
                                    {order.status}
                                  </span>
                                ) : (
                                  <span
                                    className="badge badge-soft"
                                    style={{
                                      backgroundColor: "#dc3545",
                                      color: "white",
                                    }}
                                  >
                                    {order.status}
                                  </span>
                                )}
                              </td>

                              {/* Add other columns here as needed */}
                              <td>
                                <div className="d-flex gap-2">
                                  <div className="view">
                                    <Link
                                      to={`/vieworder/${order._id}`}
                                      className="btn btn-sm btn-info view-item-btn"
                                    >
                                      View
                                    </Link>
                                  </div>
                                  <div className="edit">
                                    <Link
                                      // to={`/editcoupon/${coupon._id}`}
                                      className="btn btn-sm btn-success edit-item-btn"
                                    >
                                      <i className="ri-pencil-line"></i>
                                    </Link>
                                  </div>
                                  <div className="remove">
                                    <button
                                      className="btn btn-sm btn-danger remove-item-btn"
                                      data-bs-toggle="modal"
                                      data-bs-target="#deleteRecordModal"
                                      // onClick={() => {
                                      //   toggledeletemodal();
                                      //   setContentToDelete(coupon);
                                      // }}
                                    >
                                      <i className="ri-delete-bin-line"></i>
                                    </button>
                                  </div>
                                  {/* <div className="action">
                                    <button className="btn btn-sm btn-secondary">
                                      <i className="ri-settings-3-line"></i>
                                    </button>
                                  </div> */}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default AllOrders;
