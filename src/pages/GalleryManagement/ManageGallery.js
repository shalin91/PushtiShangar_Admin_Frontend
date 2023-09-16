import React, { useContext, useEffect, useState } from 'react'
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap'
import BreadCrumb from '../../Components/Common/BreadCrumb'
import { Link, useParams } from 'react-router-dom'
import SignContext from '../../contextAPI/Context/SignContext'

const ManageGallery = () => {
  const url = `${process.env.REACT_APP_BASE_URL}`;
  const {id} = useParams();
  const { GetGalleryDetails} = useContext(SignContext);
  const [GalleryDetData, setGalleryDetData] = useState([]);

  const getgalleryDetails = async () => {
    const res = await GetGalleryDetails();
    console.log(res);

    const transformedData = res.data.map((gallerydet, index) => ({
      ...gallerydet,
      id: index + 1,
    }));
    console.log(transformedData);
    setGalleryDetData(transformedData);
  };

  useEffect(() => {
    getgalleryDetails();
  }, [ ]);

  document.title = "Gallery | By Shalin";
  return (
   <>
   <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Gallery" pageTitle="Gallery Details" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Gallery-Details</h4>
                </CardHeader>
                <CardBody>
                  <div id="GalleryList">
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
                            to="/creategallerydet"
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
                            <th className="name">Gallery-Image</th>
                            <th className="name">Gallery-Title</th>
                            <th className="name">Status</th>
                            <th className="action">Action</th>
                          </tr>
                        </thead>
                        <tbody className="list form-check-all">
                          {GalleryDetData.map((galleryDet) => (
                            <tr key={galleryDet.id}>
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
                              <td className="Gallery-image">
                                <div
                                  style={{
                                    maxWidth: "50px",
                                    maxHeight: "50px",
                                    overflow: "hidden",
                                    display: "inline-block",
                                  }}
                                >
                                  <img
                                    src={`${url}/gallery-images/${galleryDet.imagePath}`}
                                    alt="ImagePath"
                                    style={{
                                      width: "100%",
                                      height: "auto",
                                    }}
                                  />
                                </div>
                              </td>
                              <td className="product-name">
                                {galleryDet.imageTitle}
                              </td>
                              <td className="status">
                                {galleryDet.active === true ? (
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
                                      to={`/editgallerydet/${galleryDet._id}`}
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
  )
}

export default ManageGallery