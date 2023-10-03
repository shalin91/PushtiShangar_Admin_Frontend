import React, { useContext, useEffect, useState } from "react";
import { Card, CardBody, CardHeader, Col, Container, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { Link } from "react-router-dom";
import SignContext from "../../contextAPI/Context/SignContext";
import AddStocks from "./AddStocks";

function Stocks() {
  const { GetStocks , DeleteStocks  } = useContext(SignContext);
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

  const handleDeleteStocks = async (id) => {
    const res = await DeleteStocks(id);
    console.log(res);
    if (res.success) {
      // Product was successfully deleted
      // Perform any necessary state updates or notifications
      // Reset productToDelete and close the modal
      setContentToDelete(null);
      setDeleteModal(false);
      // Refresh the product list after deletion
      Getstocks();
    } else {
      // Handle deletion error, show error message
      // You might want to display an error notification
    }
  };



  useEffect(() => {
    Getstocks();
  }, []);

  document.title = "Stocks | By Shalin";
  return (
    <>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="All Stocks" pageTitle="Stocks" />
          <Row>
            <Col lg={12}>
            <AddStocks refreshTable={Getstocks} />
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Stock Manage Of Products</h4>
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
                      {/* <Col className="col-sm-auto">
                        <div>
                          <Link
                            to="/addstocks"
                            className="btn btn-success add-btn me-1"
                            id="create-btn"
                          >
                            <i className="ri-add-line align-bottom me-1"></i>{" "}
                            Add
                          </Link>
                        </div>
                      </Col> */}
                    </Row>
                    <div className="table-responsive table-card mt-1 mb-3">
                      <table
                        className="table align-middle table-nowrap"
                        id="customerTable"
                      >
                        <thead className="table-light">
                          <tr>
                            
                            <th className="name">Index</th>
                            <th className="name">Product-Name</th>
                            <th className="name">Quantity</th>
                            <th className="name">Price</th>
                            <th className="action">Action</th>
                          </tr>
                        </thead>

                        <tbody className="list form-check-all">
                          {ContentData.map((content , key) => (
                            <tr key={content.id}>
                              

                              <td className="product-name">
                                {key+1}
                              </td>
                              <td className="product-name">
                                {content.name}
                              </td>
                              <td className="product-name">
                                {content.quantity}
                              </td>
                              {/* <td className="product-name">
                                {content.quantity}
                              </td> */}
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
                                      to={`/editstocks/${content._id}`}
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
                                          setContentToDelete(content);
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

      {/* modal Delete Content */}
      <Modal
        isOpen={deletemodal}
        role="dialog"
        autoFocus={true}
        centered
        id="removeItemModal"
        toggle={toggledeletemodal}
      >
        <ModalHeader
          toggle={() => {
            setDeleteModal(!deletemodal);
          }}
        ></ModalHeader>
        <ModalBody>
          <div className="mt-2 text-center">
            <lord-icon
              src="https://cdn.lordicon.com/gsqxdxog.json"
              trigger="loop"
              colors="primary:#f7b84b,secondary:#f06548"
              style={{ width: "100px", height: "100px" }}
            ></lord-icon>
            <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
              <h4>Are you sure ?</h4>
              <p className="text-muted mx-4 mb-0">
                Are you Sure You want to Remove this Stocks ?
              </p>
            </div>
          </div>
          <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
            <button
              type="button"
              className="btn w-sm btn-light"
              onClick={() => {
                setDeleteModal(!deletemodal);
              }}
            >
              Close
            </button>
            <button
              type="button"
              className="btn w-sm btn-danger"
              onClick={() => {
                handleDeleteStocks(ContentToDelete._id);
                setDeleteModal(false);
              }}
            >
              Yes, Delete It!
            </button>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}

export default Stocks;
