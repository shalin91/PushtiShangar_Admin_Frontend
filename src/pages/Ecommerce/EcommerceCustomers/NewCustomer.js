import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  Col,
  Container,
  Form,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { Grid } from "gridjs";
import SignContext from "../../../contextAPI/Context/SignContext";
import { Link, useParams } from "react-router-dom";

const NewCustomer = () => {
  const { id } = useParams();
  console.log(id);
  const { getCustomers, createCustomer, GetSpecificCustomer, UpdateCustomer , deleteCustomer } =
    useContext(SignContext);
  const [CustomersData, setCustomersData] = useState([]);
  const [CustomerInfo, setCustomerInfo] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    active: true,
  });
  const [EditCustomerInfo, setEditCustomerInfo] = useState({
    username: "",
    active: true,
    deleted: false,
  });
  const [modal, setModal] = useState(false);
  const [EditModal, setEditModal] = useState(false);
  const [CustomerToDelete, setCustomerToDelete] = useState(null);
  const [deletemodal, setDeleteModal] = useState(false);


  const Getcustomers = async () => {
    const res = await getCustomers();
    console.log(res);

    const transformedData = res.customers.map((customer, index) => ({
      ...customer,
      id: index + 1,
    }));
    setCustomersData(transformedData);
  };

  const getspecificCustomer = async (id) => {
    const res = await GetSpecificCustomer(id);
    console.log(res);
    if (res.success) {
      setEditCustomerInfo(res.customer); // Update editUserInfo with fetched data
    } else {
      console.log(res.msg);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await createCustomer(CustomerInfo);
    console.log(res);
    if (res.success) {
      Getcustomers();
    }
  };

  const handleChange = (e) => {
    if (EditModal) {
      const { name, value, type, checked } = e.target;
      const newValue = type === "checkbox" ? checked : value;

      setEditCustomerInfo({
        ...EditCustomerInfo,
        [name]: newValue,
      });
    } else {
      setCustomerInfo({ ...CustomerInfo, [e.target.name]: e.target.value });
    }
  };

  const handleUpdate = async (EditCustomerInfo) => {
    const resUpdate = await UpdateCustomer(EditCustomerInfo , id);
    console.log(resUpdate);
    if (resUpdate.success) {
      Getcustomers();
      // setSuccess(resUpdate.msg);
    }
    else{
      console.log(resUpdate.msg);
    }
  };

  const handleDeleteCustomer = async (customerId) => {
    const res = await deleteCustomer(customerId);
    console.log(res);
    if (res.success) {
      // Product was successfully deleted
      // Perform any necessary state updates or notifications
      // Reset productToDelete and close the modal
      setCustomerToDelete(null);
      setDeleteModal(false);
      // Refresh the product list after deletion
      Getcustomers();
    } else {
      // Handle deletion error, show error message
      // You might want to display an error notification
    }
  };

  const togglemodal = () => {
    setModal(!modal);
  };

  const toggledeletemodal = () => {
    setDeleteModal(!deletemodal);
  };

  const toggleEditmodal = (id) => {
    setEditModal(!modal);
    getspecificCustomer(id);
    console.log(id);
  };

  useEffect(() => {
    Getcustomers();
    getspecificCustomer(id);
  }, [id]);

  document.title = "Customers | By Shalin";
  return (
    <>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Customers" pageTitle="Setup" />
          <Row>
            <Col lg={12}>
              <Card id="customerList">
                <CardHeader className="border-0">
                  <Row className="g-4 align-items-center">
                    <div className="col-sm">
                      <div>
                        <h5 className="card-title mb-0">Customer List</h5>
                      </div>
                    </div>
                    <div className="col-sm-auto">
                      <div>
                        {/* <button
                          className="btn btn-soft-danger me-1"
                          onClick={() => setDeleteModalMulti(true)}
                        >
                          <i className="ri-delete-bin-2-line"></i>
                        </button> */}
                        <button
                          type="button"
                          className="btn btn-success add-btn"
                          id="create-btn"
                          onClick={togglemodal}
                        >
                          <i className="ri-add-line align-bottom me-1"></i> Add
                          Customer
                        </button>{" "}
                        <button
                          type="button"
                          className="btn btn-info"
                          // onClick={() => setIsExportCSV(true)}
                        >
                          <i className="ri-file-download-line align-bottom me-1"></i>{" "}
                          Export
                        </button>
                      </div>
                    </div>
                  </Row>

                  <div className="table-responsive table-card mt-1 mb-3">
                    <table
                      className="table align-middle table-nowrap"
                      id="customerTable"
                    >
                      <thead className="table-light">
                        <tr>
                          <th scope="col">
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
                          <th className="price">email</th>
                          <th className="status">Status</th>
                          <th className="action">Action</th>
                        </tr>
                      </thead>
                      <tbody className="list form-check-all">
                        {CustomersData.map((customer) => (
                          <tr key={customer.id}>
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
                              {customer.username}
                            </td>
                            <td className="stock">{customer.email}</td>
                            <td className="status">
                              {customer.status === "active" ? (
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
                                    onClick={() =>
                                      toggleEditmodal(customer._id)
                                    }
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
                                        setCustomerToDelete(customer);
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
                </CardHeader>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      {/* modal Add Customer */}
      <Modal
        isOpen={modal}
        role="dialog"
        autoFocus={true}
        centered
        id="addAddressModal"
        toggle={togglemodal}
      >
        <ModalHeader
          toggle={() => {
            setModal(!modal);
          }}
        >
          <h5 className="modal-title" id="addAddressModalLabel">
            Add Customer
          </h5>
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={(e) => handleSubmit(e)}>
            <div className="mb-3"></div>

            <div className="mb-3">
              <Label for="addaddress-Name" className="form-label">
                Name
              </Label>
              <Input
                type="text"
                className="form-control"
                id="Name"
                placeholder="Enter Name"
                name="username"
                value={CustomerInfo.username}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>

            <div className="mb-3">
              <Label for="Email" className="form-label">
                Email
              </Label>
              <Input
                type="text"
                className="form-control"
                id="Email"
                placeholder="Enter Email"
                name="email"
                value={CustomerInfo.email}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>
            <div className="mb-3">
              <Label for="password" className="form-label">
                Password
              </Label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Password"
                value={CustomerInfo.password}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>
            <div className="mb-3">
              <Label for="password" className="form-label">
                Confirm Password
              </Label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={CustomerInfo.confirmPassword}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>
            <div className="mb-3">
              <Label for="state" className="form-label">
                Status
              </Label>
              <select
                className="form-select"
                id="autoSizingSelect"
                name="status"
                value={CustomerInfo.status}
                onChange={(e) => {
                  handleChange(e);
                }}
              >
                <option value="">select status</option>
                <option value="active">active</option>
                <option value="inactive">inactive</option>
              </select>
            </div>

            <ModalFooter>
              <button
                type="button"
                className="btn btn-light"
                onClick={() => {
                  setModal(!modal);
                }}
              >
                Close
              </button>
              <button
                type="submit"
                className="btn btn-success"
                onClick={() => {
                  setModal(!modal);
                }}
              >
                Save
              </button>
            </ModalFooter>
          </Form>
        </ModalBody>
      </Modal>

      {/* Modal Edit Address */}
      <Modal
        isOpen={EditModal}
        role="dialog"
        autoFocus={true}
        centered
        id="addAddressModal"
        toggle={toggleEditmodal}
      >
        <ModalHeader
          toggle={() => {
            setEditModal(!EditModal);
          }}
        >
          <h5 className="modal-title" id="addAddressModalLabel">
            Edit Customer
          </h5>
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={(e) => handleUpdate(e)}>
            <div className="mb-3">
              <Label for="addaddress-Name" className="form-label">
                Name
              </Label>
              <Input
                type="text"
                className="form-control"
                id="Name"
                placeholder="Enter Name"
                name="username"
                value={EditCustomerInfo.username}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>
            <div className="mb-3">
              <Label for="state" className="form-label">
                Status
              </Label>
              <select
                className="form-select"
                id="autoSizingSelect"
                name="status"
                value={EditCustomerInfo.status}
                onChange={(e) => {
                  handleChange(e);
                }}
              >
                <option value="active">active</option>
                <option value="inactive">inactive</option>
              </select>
            </div>
            <div className="mt-3">
              <Input
                type="checkbox"
                id="deleted"
                label="deleted"
                name="deleted"
                checked={EditCustomerInfo.deleted}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              <label className="me-2">Is Deleted</label>
            </div>

            <ModalFooter>
              <button
                type="button"
                className="btn btn-light"
                onClick={() => {
                  setEditModal(!EditModal);
                }}
              >
                Close
              </button>
              <button
                type="submit"
                className="btn btn-success"
                onClick={() => {
                  setEditModal(!EditModal);
                }}
              >
                Save
              </button>
            </ModalFooter>
          </Form>
        </ModalBody>
      </Modal>

      {/* modal Delete Address */}
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
                Are you Sure You want to Remove this Customer ?
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
                handleDeleteCustomer(CustomerToDelete);
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
};

export default NewCustomer;
