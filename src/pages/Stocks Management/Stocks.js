import React, { useContext, useEffect, useState } from "react";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { Link } from "react-router-dom";
import SignContext from "../../contextAPI/Context/SignContext";

function Stocks() {
  const { GetStocks, DeleteContent } = useContext(SignContext);
  const [ContentData, setContentData] = useState([]);
  const [deletemodal, setDeleteModal] = useState(false);
  const [ContentToDelete, setContentToDelete] = useState(null);

  const toggledeletemodal = () => {
    setDeleteModal(!deletemodal);
  };

  const Getstocks = async () => {
    const res = await GetStocks();
    console.log(res);

    const transformedData = res.stocks.map((content, index) => ({
      ...content,
      id: index + 1,
    }));
    setContentData(transformedData);
  }

  useEffect(() => {
    Getstocks();
    console.log(ContentData)
  }, []);


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
                            to="/addcontent"
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
                            <th className="name">Product-Name</th>
                            <th className="name">quantity</th>
                            <th className="name">Price</th>
                            <th className="action">Action</th>
                          </tr>
                        </thead>

                        <tbody className="list form-check-all">
                          {ContentData.map((content) => (
                            <tr key={content.id}>
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

                              <td className="product-name">
                                {content.name}
                              </td>
                              <td className="product-name">
                                {content.quantity}
                              </td>
                              <td className="product-name">
                                {content.currentPricePerUnit}
                              </td>
                              {/* <td className="product-name">
                                {content.contentType}
                              </td> */}
                            
                              {/* Add other columns here as needed */}
                              <td>
                                <div className="d-flex gap-2">
                                  <div className="edit">
                                    <Link
                                      to={`/updatecontent/${content._id}`}
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
                                        // onClick={() => {
                                        //   toggledeletemodal();
                                        //   setContentToDelete(content);
                                        // }}
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
}

export default Stocks;
