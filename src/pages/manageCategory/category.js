import React, { useState, useEffect, useCallback } from "react";
import {
  Col,
  Container,
  Card,
  CardBody,
  Form,
  FormFeedback,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Label,
} from "reactstrap";
import { isEmpty } from "lodash";
import { ToastContainer } from "react-toastify";
import DeleteModal from "../../Components/Common/DeleteModal";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
    getCategory
  
} from "../../helpers/backend_helper";
import Dropzone from "react-dropzone";
// import { BANNER_IMAGE_LINK, USER_IMAGE_LINK } from "../../helpers/url_helper";

const CategoryMaster = () => {
  document.title = "Banner Master";
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setselectedFile] = useState([]);

  const [deleteModal, setDeleteModal] = useState(false);
  const [categoryData, setcategoryData] = useState([]);
  const [bannerForSubmit, setbannerForSubmit] = useState(null);

  const [modalBanner, setModalBanner] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const fetchData = async () => {
    try {
      const response = await getCategory();
      setcategoryData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggle = useCallback(() => {
    if (modalBanner) {
      setModalBanner(false);
      setbannerForSubmit(null);
    } else {
      setModalBanner(true);
    }
  }, [modalBanner]);


  const handleEdit = (item) =>{

  }

  const handleDelete = (selectedCategory) => {
    console.log(selectedCategory);
    setbannerForSubmit(selectedCategory);
    setDeleteModal(true);
  };

  const handleDeleteCategory = async () => {
    if (bannerForSubmit) {
      fetchData();
      setDeleteModal(false);
    }
  };



  return (
    <React.Fragment>
      <ToastContainer closeButton={false} />
      <DeleteModal
        show={deleteModal}
        onDeleteClick={() => handleDeleteCategory()}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <Container fluid>
          <div className="chat-wrapper d-lg-flex gap-1 mx-n4 mt-n4 p-1">
            <div className="file-manager-content w-100 p-4 pb-0">
              <div className="hstack mb-4">
                <h5 className="fw-semibold flex-grow-1 mb-0">Banner Master</h5>
                <div className="hstack gap-2">
                  <div
                    className="btn-group"
                    role="group"
                    aria-label="Basic example"
                  >
                    <Col className="col-lg mx-2">
                      <div className="search-box">
                        <input
                          type="text"
                          id="searchTaskList"
                          className="form-control search"
                          placeholder="Search by Banner Title"
                        />
                        <i className="ri-search-line search-icon"></i>
                      </div>
                    </Col>
                    <Col className="col-lg-auto">
                      <button
                        className="btn btn-primary createTask"
                        type="button"
                      >
                        <i className="ri-add-fill align-bottom" /> Add Banner
                      </button>
                    </Col>
                  </div>
                </div>
              </div>

              <div
                className="todo-content position-relative px-4 mx-n4"
                id="todo-content"
              >
                {isEmpty(categoryData) && (
                  <div id="elmLoader">
                    <div
                      className="spinner-border text-primary avatar-sm"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                )}
                <Row>
                  {categoryData.map((item) => (
                    <Col sm={6} xl={3} key={item.id}>
                      <Card>
                        {/* <img
                          className="card-img-top img-fluid"
                        //   src={BANNER_IMAGE_LINK + item.imagePath}
                          alt="Card cap"
                          style={{
                            width: "100%",
                            height: "200px",
                            objectFit: "cover",
                          }}
                        /> */}
                        <CardBody>
                          <h4 className="card-title mb-2">
                            {item.bannerTitle}
                          </h4>
                          <p className="card-text mb-0">{item.description}</p>
                        </CardBody>
                        <div className="card-footer">
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="hstack gap-2">
                              <button
                                className="btn btn-sm btn-soft-danger remove-list"
                                onClick={() => handleDelete(item)}
                              >
                                <i className="ri-delete-bin-5-fill align-bottom" />
                              </button>
                              <button
                                className="btn btn-sm btn-soft-info edit-list"
                                onClick={() => handleEdit(item)}
                              >
                                <i className="ri-pencil-fill align-bottom" />
                              </button>
                            </div>
                            {item.active ? (
                              <span className="badge badge-soft-success badge-border">
                                Active
                              </span>
                            ) : (
                              <span className="badge badge-soft-danger badge-border">
                                Not Active
                              </span>
                            )}
                          </div>
                        </div>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Modal
        id="createTask"
        isOpen={modalBanner}
        toggle={toggle}
        modalClassName="zoomIn"
        centered
        tabIndex="-1"
      >
        <ModalHeader toggle={toggle} className="p-3 bg-soft-success">
          {" "}
          {!!isEdit ? "Edit Banner" : "Create new Banner"}{" "}
        </ModalHeader>
        <ModalBody>
          <div id="task-error-msg" className="alert alert-danger py-2"></div>

         
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default CategoryMaster;