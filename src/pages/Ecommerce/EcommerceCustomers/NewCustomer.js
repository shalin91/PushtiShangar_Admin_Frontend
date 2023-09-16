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
import { Link } from "react-router-dom";

const NewCustomer = () => {
  const { getCustomers, createCustomer , GetSpecificCustomer } = useContext(SignContext);
  const [CustomersData, setCustomersData] = useState([]);
  const [CustomerInfo, setCustomerInfo] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    status: "",
  });
  const [modal, setModal] = useState(false);
  const [EditModal, setEditModal] = useState(false);
  const [deletemodal, setDeleteModal] = useState(false);

  const togglemodal = () => {
    setModal(!modal);
  };

  const toggleEditmodal = () => {
    setEditModal(!modal);
    // getspecificUser(id);
    // console.log(id);
  };

  const Getcustomers = async () => {
    const res = await getCustomers();
    console.log(res);

    const transformedData = res.customers.map((customer, index) => ({
      ...customer,
      id: index + 1,
    }));
    setCustomersData(transformedData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await createCustomer(CustomerInfo);
    console.log(res);
    getCustomers();
    // if (res.success) {
    //   navigate("/login");
    // }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo({
      ...CustomerInfo,
      [name]: value,
    });
  };

  useEffect(() => {
    Getcustomers();
  }, []);

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
                                    onClick={() => toggleEditmodal(customer._id)}
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
                                    //   onClick={() => {
                                    //     toggledeletemodal();
                                    //     setProductToDelete(product);
                                    //   }}
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
          <Form
          // onSubmit={(e) => handleUpdate(e)}
          >
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
    </>
  );
};

export default NewCustomer;
