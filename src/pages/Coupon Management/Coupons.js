import React, { useContext, useEffect, useState } from "react";
import SignContext from "../../contextAPI/Context/SignContext";
import { Link } from "react-router-dom";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";

const Coupons = () => {
  const { GetCoupons } = useContext(SignContext);
  const [CouponData, setCouponData] = useState([]);
  const [deletemodal, setDeleteModal] = useState(false);
  const [ContentToDelete, setContentToDelete] = useState(null);

  const toggledeletemodal = () => {
    setDeleteModal(!deletemodal);
  };

  const Getcoupons = async () => {
    const res = await GetCoupons();
    console.log(res);

    const transformedData = res.coupons.map((coupons, index) => ({
      ...coupons,
      id: index + 1,
    }));
    setCouponData(transformedData);
  };

  useEffect(() => {
    Getcoupons();
  }, []);

  document.title = "Coupons | By Shalin";

  return (
    <>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="All Contents" pageTitle="Content" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Contents</h4>
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
                            <th scope="col" style={{ width: "50px" }}>
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="checkAll"
                                  value="option"
                                />
                              </div>
                            </th>
                            <th className="name">Name</th>
                            <th className="name">Discount</th>
                            <th className="name">Type</th>
                            <th className="name">Expiry</th>
                            <th className="name">Status</th>
                            <th className="action">Action</th>
                          </tr>
                        </thead>

                        <tbody className="list form-check-all">
                          {CouponData.map((coupon) => (
                            <tr key={coupon.id}>
                              <th scope="row">
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="chk_child"
                                    value="option1"
                                  />
                                </div>
                              </th>
                              <td className="product-name">{coupon.name}</td>
                              <td className="product-name">
                                {coupon.discount}
                              </td>
                              <td className="product-name">{coupon.type}</td>
                              <td className="product-name">
                                {new Date(coupon.expiry).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  }
                                )}
                              </td>
                              <td className="status">
                                {coupon.active === true ? (
                                  <span
                                    className="badge badge-soft"
                                    style={{
                                      backgroundColor: "#28a745",
                                      color: "white",
                                    }}
                                  >
                                    Active
                                  </span>
                                ) : (
                                  <span
                                    className="badge badge-soft"
                                    style={{
                                      backgroundColor: "#dc3545",
                                      color: "white",
                                    }}
                                  >
                                    Inactive
                                  </span>
                                )}
                              </td>

                              {/* Add other columns here as needed */}
                              <td>
                                <div className="d-flex gap-2">
                                  <div className="edit">
                                    <Link
                                      to={`/editcoupon/${coupon._id}`}
                                      className="btn btn-sm btn-success edit-item-btn"
                                    >
                                      Edit
                                    </Link>
                                  </div>
                                  <div className="remove">
                                    <button
                                      className="btn btn-sm btn-danger remove-item-btn"
                                      data-bs-toggle="modal"
                                      data-bs-target="#deleteRecordModal"
                                      onClick={() => {
                                        toggledeletemodal();
                                        setContentToDelete(coupon);
                                      }}
                                    >
                                      Remove
                                    </button>
                                  </div>
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

export default Coupons;
