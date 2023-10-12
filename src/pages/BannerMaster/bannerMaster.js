import React, { useState, useEffect, useCallback } from "react";
import {
  Col,
  Container,
  Card,
  CardBody,
  Form,
  CardHeader,
  FormFeedback,
  Input,
  Modal,
  Button,
  ModalBody,
  Spinner,
  ModalHeader,
  Row,
  Label,
} from "reactstrap";
import Loader from "../../Components/Common/Loader";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { ToastContainer } from "react-toastify";
import DeleteModal from "../../Components/Common/DeleteModal";
import * as Yup from "yup";
import { Formik, useFormik } from "formik";
import {
  addNewBanner,
  deleteBanner,
  getBanner,
  updateBanner,
} from "../../helpers/backend_helper";

import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
// import FilePondPluginFilePoster from "filepond-plugin-file-poster";

// import "filepond-plugin-file-poster/dist/filepond-plugin-file-poster.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Register the plugins
registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview
  // FilePondPluginFilePoster
);

const BannerMaster = () => {
  document.title = "Category Master";
  const url = `${process.env.REACT_APP_BASE_URL}`;
  const [deleteModal, setDeleteModal] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [recordForSubmit, setrecordForSubmit] = useState(null);

  const [submitted, setSubmitted] = useState(false);
  const [files, setFiles] = useState([]);
  const [valuesForUpdate, setValuesForUpdate] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [buttnLoading, setButtnLoading] = useState(false);
  const [selectedType, setSelectedType] = useState(false);

  const fetchData = async () => {
    try {
      const response = await getBanner();
      setTableData(response.data);
      console.log(response)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    setFiles([]);
  }, [isEdit]);

  const toggle = useCallback(() => {
    if (showModal) {
      setShowModal(false);
    } else {
      setShowModal(true);
    }
  }, [showModal]);

  const handledeleteProduct = async () => {
    if (valuesForUpdate) {
      await deleteBanner(valuesForUpdate);
      fetchData();
      setDeleteModal(false);
    }
  };

  const categoryValidation = Yup.object().shape({
    name: Yup.string().required("required"),
    description: Yup.string().min(5, "Too short"),
  });

  const bannerForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: (valuesForUpdate && valuesForUpdate.name) || "",
      bannerType: (valuesForUpdate && valuesForUpdate.bannerType) || "",
      bannerText: (valuesForUpdate && valuesForUpdate.bannerText) || "",
      description: (valuesForUpdate && valuesForUpdate.description) || "",
    },
    validationSchema: categoryValidation,
    onSubmit: async (values) => {
      console.log(files[0].file);
      setSubmitted(true);
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("bannerType", values.bannerType);
      formData.append("bannerText", values.bannerText);
      formData.append("description", values.description);
      if (files.length !== 0) {
        formData.append("image", files[0].file);
      }
      setButtnLoading(true);
      if (isEdit) {
        await updateBanner(formData, valuesForUpdate._id);
      } else {
        
        await addNewBanner(formData);
      }
      setButtnLoading(false);
      setIsEdit(false);
      setSubmitted(false);
      bannerForm.resetForm();
      toggle();
    },
  });

  return (
    <div className="page-content">
      <DeleteModal
        show={deleteModal}
        onDeleteClick={() => handledeleteProduct()}
        onCloseClick={() => setDeleteModal(false)}
      />
      <Container fluid>
        <BreadCrumb title="Category" pageTitle="Category" />
        <Row>
          <Col lg={12}>
            <Card id="orderList">
              <CardHeader className="card-header border-0">
                <div className="d-flex align-items-center">
                  <h5 className="card-title mb-0 flex-grow-1">Category </h5>

                  <div className="flex-shrink-0">
                    <div className="d-flex gap-1 flex-wrap">
                      <button
                        type="button"
                        className="btn btn-primary add-btn"
                        id="create-btn"
                        onClick={() => {
                          setIsEdit(false);
                          setValuesForUpdate("");
                          setFiles([]);

                          toggle();
                        }}
                      >
                        <i className="ri-add-line align-bottom me-1"></i> Create
                        Category
                      </button>{" "}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardBody className="pt-0">
                <div>
                  <table className="table">
                    <thead className="table-active">
                      <tr>
                        <th>index</th>
                        <th>Category Title</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableData.length ? (
                        tableData.map((item, key) => (
                          <tr key={key}>
                            <td>{key + 1}</td>
                            <td>{item.name}</td>
                            <td>
                              {" "}
                              {item.isActive ? (
                                <div>
                                  <span className="badge badge-soft-success badge-border">
                                    Active
                                  </span>
                                </div>
                              ) : (
                                <div>
                                  <span className="badge badge-soft-danger badge-border">
                                    NotActive
                                  </span>
                                </div>
                              )}
                            </td>

                            <td>
                              <button
                                className="btn btn-sm btn-soft-danger remove-list"
                                onClick={() => {
                                  setValuesForUpdate(item);
                                  setDeleteModal(true);
                                }}
                              >
                                <i className="ri-delete-bin-5-fill align-bottom" />
                              </button>
                              <button
                                className="btn btn-sm btn-soft-info edit-list"
                                onClick={() => {
                                  setIsEdit(true);
                                  setValuesForUpdate(item);
                                  setShowModal(true);
                                }}
                              >
                                <i className="ri-pencil-fill align-bottom" />
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <Loader error={tableData} />
                      )}
                    </tbody>
                  </table>
                </div>
                <Modal
                  id="showModal"
                  isOpen={showModal}
                  toggle={toggle}
                  centered
                >
                  <ModalHeader className="bg-light p-3" toggle={toggle}>
                    {!!isEdit ? "Edit Category" : "Add Category"}
                  </ModalHeader>
                  <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                      bannerForm.handleSubmit();
                      return false;
                    }}
                  >
                    <ModalBody>
                      <div className="mb-3">
                        <FilePond
                          files={files}
                          onupdatefiles={setFiles}
                          allowMultiple={false}
                          maxFiles={3}
                          name="files"
                          className="filepond filepond-input-multiple"
                          allowFilePoster={true}
                        ></FilePond>
                        <img
                          src={
                            files.length === 0
                              ? `${url}/cagtegory/${valuesForUpdate.image}`
                              : null
                          }
                          alt=""
                          style={{
                            width: "450px",
                            height: "auto",
                            maxHeight: "250px",
                            objectFit: "cover",
                            borderRadius: "3px",
                          }}
                        />

                        {submitted && files.length === 0 ? (
                          <p style={{ color: "red" }}>Please select an image</p>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label htmlFor="name" className="form-label">
                          banner title*
                        </Label>
                        <Input
                          name="name"
                          id="name"
                          className="form-control"
                          placeholder="Enter categry titel"
                          type="text"
                          onChange={bannerForm.handleChange}
                          onBlur={bannerForm.handleBlur}
                          value={bannerForm.values.name || ""}
                          invalid={
                            bannerForm.touched.name &&
                            bannerForm.errors.name
                              ? true
                              : false
                          }
                        />
                        {bannerForm.touched.name &&
                        bannerForm.errors.name ? (
                          <FormFeedback type="invalid">
                            {bannerForm.errors.name}
                          </FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label htmlFor="name" className="form-label">
                        banner type 
                        </Label>
                        <select
                          className="form-select"
                          id="bannerType"
                          name="bannerType"
                          aria-label="bannerType"
                          onChange={bannerForm.handleChange}
                          onBlur={bannerForm.handleBlur}
                          value={bannerForm.values.bannerType || ""}
                         
                        >
                          <option value="">Select banner type</option>
                          <option value="top-right">top-right</option>
                          <option value="carousel">carousel</option>
                          <option value="bottom">bottom</option>
                          
                        </select>
                        {bannerForm.touched.name &&
                        bannerForm.errors.name ? (
                          <FormFeedback type="invalid">
                            {bannerForm.errors.name}
                          </FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label htmlFor="bannerText" className="form-label">
                          banner text*
                        </Label>
                        <Input
                          name="bannerText"
                          id="bannerText"
                          className="form-control"
                          placeholder="bannerText"
                          type="text"
                          onChange={bannerForm.handleChange}
                          onBlur={bannerForm.handleBlur}
                          value={bannerForm.values.bannerText || ""}
                          invalid={
                            bannerForm.touched.bannerText &&
                            bannerForm.errors.bannerText
                              ? true
                              : false
                          }
                        />
                        {bannerForm.touched.bannerText &&
                        bannerForm.errors.bannerText ? (
                          <FormFeedback type="invalid">
                            {bannerForm.errors.bannerText}
                          </FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label htmlFor="id-field" className="form-label">
                          description
                        </Label>
                        <Input
                          name="description"
                          id="description"
                          className="form-control"
                          placeholder="Enter description"
                          type="textarea"
                          onChange={bannerForm.handleChange}
                          onBlur={bannerForm.handleBlur}
                          value={bannerForm.values.description || ""}
                          invalid={
                            bannerForm.touched.description &&
                            bannerForm.errors.description
                              ? true
                              : false
                          }
                        />
                        {bannerForm.touched.description &&
                        bannerForm.errors.description ? (
                          <FormFeedback type="invalid">
                            {bannerForm.errors.description}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </ModalBody>
                    <div className="modal-footer">
                      <div className="hstack gap-2 justify-content-end">
                        <button
                          type="button"
                          className="btn btn-light"
                          onClick={() => {
                            setShowModal(false);
                            setValuesForUpdate("");
                          }}
                        >
                          Close
                        </button>

                        {!buttnLoading ? (
                          <React.Fragment>
                            <button
                              type="submit"
                              className="btn btn-primary"
                              id="addNewTodo"
                            >
                              {!!isEdit ? "Update" : "Add Category"}
                            </button>
                          </React.Fragment>
                        ) : (
                          <Button
                            color="primary"
                            className="btn-load"
                            outline
                            disabled
                          >
                            <span className="d-flex align-items-center">
                              <Spinner size="sm" className="flex-shrink-0">
                                {" "}
                                Loading...{" "}
                              </Spinner>
                              <span className="flex-grow-1 ms-2">
                                Loading...
                              </span>
                            </span>
                          </Button>
                        )}
                      </div>
                    </div>
                  </Form>
                </Modal>
                <ToastContainer closeButton={false} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default BannerMaster;
