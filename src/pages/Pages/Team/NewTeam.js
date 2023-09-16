import React, { useContext, useEffect, useState } from "react";
import SignContext from "../../../contextAPI/Context/SignContext";
import {
  CardBody,
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
import { Link, useParams } from "react-router-dom";

const NewTeam = () => {
  const url = `${process.env.REACT_APP_BASE_URL}`;
  const { id } = useParams();
  const {
    registerUser,
    getUsers,
    deleteUser,
    updateUser,
    getSpecificUser,
    GetRoles,
  } = useContext(SignContext);
  const [usersData, setUsersData] = useState([]);
  const [UserInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    photo: "",
    roles: "",
    status: "",
  });
  const [editUserInfo, setEditUserInfo] = useState({
    name: "",
    email: "",
    photo: "",
    roles: "",
    status: "",
  });
  const [Roles, setRoles] = useState([]);
  const [profilePhoto, setProfilePhoto] = useState("");
  const [modal, setModal] = useState(false);
  const [EditModal, setEditModal] = useState(false);
  const [deletemodal, setDeleteModal] = useState(false);
  const [UserToDelete, setUserToDelete] = useState(null);
  const [Error, setError] = useState("");
  const [Success, setSuccess] = useState("");
  const roles = JSON.parse(localStorage.getItem("rights")).role;
  console.log(roles);

  const getusers = async () => {
    const res = await getUsers();
    console.log(res);
    const transformedData = res.users.map((user, index) => ({
      ...user,
      id: index + 1,
    }));
    setUsersData(transformedData);
  };

  const getRoles = async () => {
    const res = await GetRoles();
    console.log(res);
    setRoles(res);
  };

  const getspecificUser = async (id) => {
    const res = await getSpecificUser(id);
    // console.log(res);
    if (res.success) {
      setEditUserInfo(res); // Update editUserInfo with fetched data
    } else {
      console.log(res.msg);
    }
  };

  const handleChange = (e) => {
    if (EditModal) {
      setEditUserInfo({ ...editUserInfo, [e.target.name]: e.target.value });
    } else {
      setUserInfo({ ...UserInfo, [e.target.name]: e.target.value });
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setProfilePhoto(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await registerUser(UserInfo, profilePhoto);
    console.log(res);
    // if (res.success) {
    //   navigate("/login");
    // }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const resUpdate = await updateUser(editUserInfo,profilePhoto);
    console.log(resUpdate);
    if (resUpdate.success) {
      getusers();
      setSuccess(resUpdate.msg);
    } else {
      setError(resUpdate.msg);
    }
  };

  const handleDeleteUser = async (userId) => {
    const res = await deleteUser(userId);
    console.log(res);
    if (res.success) {
      // Product was successfully deleted
      // Perform any necessary state updates or notifications
      // Reset productToDelete and close the modal
      setUserToDelete(null);
      setDeleteModal(false);
      // Refresh the product list after deletion
      getusers();
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
    getspecificUser(id);
    console.log(id);
  };

  // console.log(editUserInfo);

  useEffect(() => {
    getusers();
    getRoles();
    getspecificUser(id);
  }, [id]);

  document.title = "Team | by Shalin";

  return (
    <>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="All Users" pageTitle="Profile" />

          <Row>
            <Col lg={12}>
              <CardHeader>
                <h4 className="card-title mb-0">Users</h4>
              </CardHeader>
              <CardBody>
                <div id="customerList">
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
                          className="btn btn-success add-btn me-1"
                          id="create-btn"
                          onClick={togglemodal}
                        >
                          <i className="ri-add-line align-bottom me-1"></i> Add
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
                          <th scope="col" style={{ width: "40px" }}>
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
                          <th className="Image">Photo</th>
                          <th className="Email" style={{ width: "170px" }}>
                            Email
                          </th>
                          <th className="roles">Roles</th>
                          <th className="status">Status</th>
                          <th className="action">Action</th>
                        </tr>
                      </thead>
                      <tbody className="list form-check-all">
                        {usersData.map((user) => (
                          <tr key={user._id}>
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
                            <td className="name">{user.name}</td>
                            <td className="Image">
                              <div
                                style={{
                                  maxWidth: "50px",
                                  maxHeight: "50px",
                                  overflow: "hidden",
                                  display: "inline-block",
                                }}
                              >
                                <img
                                  src={`${url}/${user.photo}`}
                                  alt="userImage"
                                  style={{
                                    width: "100%",
                                    height: "auto",
                                  }}
                                />
                              </div>
                            </td>
                            <td className="Email" style={{ width: "170px" }}>
                              {user.email}
                            </td>
                            <td className="roles">{user.roles}</td>
                            <td className="status">
                              {user.status === "active" ? (
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
                            <td className="action">
                              <button
                                className="btn btn-info btn-sm me-2"
                                onClick={() => toggleEditmodal(user._id)}
                              >
                                <i className="ri-pencil-line"></i> Edit
                              </button>
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() => {
                                  toggledeletemodal();
                                  setUserToDelete(user);
                                }}
                              >
                                <i className="ri-delete-bin-line"></i> Delete
                              </button>
                            </td>
                            {/* Add other columns here as needed */}
                            <td>{/* Add edit and remove buttons here */}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardBody>
            </Col>
          </Row>
        </Container>
      </div>

      {/* modal Add Address */}
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
            Add User
          </h5>
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={(e) => handleSubmit(e)}>
            <div className="mb-3">
              <Label for="profile-photo" className="form-label">
                Profile Photo
              </Label>
              <input
                type="file"
                className="form-control"
                id="profile-photo"
                accept=".jpg, .jpeg, .png" // Add accepted image formats
                onChange={handlePhotoChange} // Call a function to handle the file upload
              />
            </div>

            <div className="mb-3">
              <Label for="addaddress-Name" className="form-label">
                Name
              </Label>
              <Input
                type="text"
                className="form-control"
                id="Name"
                placeholder="Enter Name"
                name="name"
                value={UserInfo.name}
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
                value={UserInfo.email}
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
                value={UserInfo.password}
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
                value={UserInfo.confirmPassword}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>
            <div className="mb-3">
              <Label for="state" className="form-label">
                Roles
              </Label>
              <select
                className="form-select"
                id="state"
                name="roles"
                value={UserInfo.roles}
                onChange={(e) => {
                  handleChange(e);
                }}
              >
                {Roles.map((role) => {
                  return (
                    <option key={role.role} value={role.role}>
                      {role.role}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="mb-3">
              <Label for="state" className="form-label">
                Status
              </Label>
              <select
                className="form-select"
                id="autoSizingSelect"
                name="status"
                value={UserInfo.status}
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
            Edit User
          </h5>
        </ModalHeader>
        <ModalBody>
        <Form onSubmit={(e) => handleUpdate(e)}>
            <div className="mb-3">
              <Label for="profile-photo" className="form-label">
                Profile Photo
              </Label>
              <input
                type="file"
                className="form-control"
                id="profile-photo"
                accept=".jpg, .jpeg, .png" // Add accepted image formats
                // value={`${url}/${UserInfo.photo}`}
                onChange={handlePhotoChange} // Call a function to handle the file upload
              />
            </div>

            <div className="mb-3">
              <Label for="addaddress-Name" className="form-label">
                Name
              </Label>
              <Input
                type="text"
                className="form-control"
                id="Name"
                placeholder="Enter Name"
                name="name"
                value={editUserInfo.name}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>

            <div className="mb-3">
              <Label for="state" className="form-label">
                Roles
              </Label>
              <select
                className="form-select"
                id="state"
                name="roles"
                value={editUserInfo.roles}
                onChange={(e) => {
                  handleChange(e);
                }}
              >
                {Roles.map((role) => {
                  return (
                    <option key={role.role} value={role.role}>
                      {role.role}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="mb-3">
              <Label for="state" className="form-label">
                Status
              </Label>
              <select
                className="form-select"
                id="autoSizingSelect"
                name="status"
                value={editUserInfo.status}
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
                Are you Sure You want to Remove this user ?
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
                handleDeleteUser(UserToDelete);
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

export default NewTeam;
