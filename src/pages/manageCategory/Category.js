import React, { useState, useEffect, useCallback } from "react";
import {
  Col,
  Container,
  Card,
  CardBody,
  Form,
  CardHeader,
  Button,
  FormFeedback,
  Spinner,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Label,
} from "reactstrap";
import Loader from "../../Components/Common/Loader";

import { isEmpty } from "lodash";
import BreadCrumb from "../../Components/Common/BreadCrumb";

import { ToastContainer } from "react-toastify";
import DeleteModal from "../../Components/Common/DeleteModal";
import * as Yup from "yup";
import { Formik, useFormik } from "formik";
import {
  addCategory,
  deleteCategory,
  getCategory,
  updateCategory,
} from "../../helpers/backend_helper";
import Dropzone from "react-dropzone";
// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";
// Import FilePond styles
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const CategoryMaster = () => {
  document.title = "Category Master";
  const url = `${process.env.REACT_APP_BASE_URL}`;
  const [deleteModal, setDeleteModal] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [recordForSubmit, setrecordForSubmit] = useState(null);
  const [errorBanner, setErrorBanner] = useState("");
  const [successBanner, setSuccessBanner] = useState("");
  const [buttnLoading, setButtnLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [files, setFiles] = useState([]);
  const [valuesForUpdate, setValuesForUpdate] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const fetchData = async () => {
    try {
      const response = await getCategory();
      setTableData(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggle = useCallback(() => {
    if (showModal) {
      setShowModal(false);
      setrecordForSubmit(null);
    } else {
      setShowModal(true);
    }
  }, [showModal]);

  const handledeleteProduct = async () => {
    if (valuesForUpdate) {
      await deleteCategory(valuesForUpdate);
      fetchData();
      setDeleteModal(false);
    }
  };

  const categoryValidation = Yup.object().shape({
    name: Yup.string().required("required"),
    description: Yup.string().min(5, "Too short"),
  });

  const categoryForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: (valuesForUpdate && valuesForUpdate.name) || "",
      description: (valuesForUpdate && valuesForUpdate.description) || "",
    },
    validationSchema: categoryValidation,
    onSubmit: async (values) => {
      console.log(files[0].file);
      setSubmitted(true);
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description);
      if (files.length !== 0) {
        formData.append("image", files[0].file);
      }

     

      if(isEdit){

        await updateCategory(formData,valuesForUpdate._id)
      }else{
        await addCategory(formData);
      }
      setIsEdit(false)
      categoryForm.resetForm();
      toggle();
      // setButtnLoading(false);
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
        <BreadCrumb title="Orders" pageTitle="Category" />
        <Row>
          <Col lg={12}>
            <Card id="orderList">
              <CardHeader className="card-header border-0">
                <div className="d-flex align-items-center">
                  <h5 className="card-title mb-0 flex-grow-1">Order History</h5>
                  <div className="flex-shrink-0">
                    <div className="d-flex gap-1 flex-wrap">
                      <button
                        type="button"
                        className="btn btn-primary add-btn"
                        id="create-btn"
                        onClick={() => {
                          setIsEdit(false);
                          toggle();
                        }}
                      >
                        <i className="ri-add-line align-bottom me-1"></i> Create
                        Order
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
                                  setIsEdit(true)
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
                    {!!isEdit ? "Edit Order" : "Add Order"}
                  </ModalHeader>
                  <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                      categoryForm.handleSubmit();
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
                        >
                         
                        </FilePond>
                        <img
                            // src={files.length === 0 ? `${url}/cagtegory/${valuesForUpdate.image}` : null}
                            // src="https://nodeapp.barodaweb.com/api/news-images/1694829789855_news_Image.jpeg"
                            src={files.length === 0 ? `${url}/cagtegory/${valuesForUpdate.image}` : null}
                            
                            alt="Preview"
                            className="filepond-preview"
                          />
                        {submitted && files.length === 0 ? (
                          <p style={{ color: "red" }}>Please select an image</p>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label htmlFor="name" className="form-label">
                          category title*
                        </Label>
                        <Input
                          name="name"
                          id="name"
                          className="form-control"
                          placeholder="Enter categry titel"
                          type="text"
                          onChange={categoryForm.handleChange}
                          onBlur={categoryForm.handleBlur}
                          value={categoryForm.values.name || ""}
                          invalid={
                            categoryForm.touched.name &&
                            categoryForm.errors.name
                              ? true
                              : false
                          }
                        />
                        {categoryForm.touched.name &&
                        categoryForm.errors.name ? (
                          <FormFeedback type="invalid">
                            {categoryForm.errors.name}
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
                          onChange={categoryForm.handleChange}
                          onBlur={categoryForm.handleBlur}
                          value={categoryForm.values.description || ""}
                          invalid={
                            categoryForm.touched.description &&
                            categoryForm.errors.description
                              ? true
                              : false
                          }
                        />
                        {categoryForm.touched.description &&
                        categoryForm.errors.description ? (
                          <FormFeedback type="invalid">
                            {categoryForm.errors.description}
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

                        <button type="submit" className="btn btn-success">
                          {!!isEdit ? "Update" : "Add Customer"}
                        </button>
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

export default CategoryMaster;
