import React, { useContext, useEffect, useState } from 'react'
import { Card, CardBody, CardHeader, Col, Container, Modal, ModalBody, ModalHeader, Row , Pagination,
  PaginationLink,
  PaginationItem, } from 'reactstrap'
import BreadCrumb from '../../Components/Common/BreadCrumb'
import { Link} from 'react-router-dom'
import SignContext from '../../contextAPI/Context/SignContext'

const ITEMS_PER_PAGE = 10;

const ManageGallery = () => {
  const url = `${process.env.REACT_APP_BASE_URL}`;
  const { GetGalleryDetails , DeleteGalleryDetails} = useContext(SignContext);
  const [GalleryDetData, setGalleryDetData] = useState([]);
  const [deletemodal, setDeleteModal] = useState(false);
  const [GalleryDetToDelete, setGalleryDetToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);


  const toggledeletemodal = () => {
    setDeleteModal(!deletemodal);
  };

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

  const handleDeleteGalleryCategory = async (id) => {
    const res = await DeleteGalleryDetails(id);
    console.log(res);
    if (res.success) {
      // Product was successfully deleted
      // Perform any necessary state updates or notifications
      // Reset productToDelete and close the modal
      setGalleryDetToDelete(null);
      setDeleteModal(false);
      // Refresh the product list after deletion
      getgalleryDetails();
    } else {
      // Handle deletion error, show error message
      // You might want to display an error notification
    }
  };

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = GalleryDetData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    getgalleryDetails();
  }, [ ]);

  document.title = "Gallery-Details";
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
                          {currentItems.map((galleryDet) => (
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
                                      onClick={() => {
                                        toggledeletemodal();
                                        setGalleryDetToDelete(galleryDet);
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
                  <Pagination>
                    <PaginationItem>
                      <PaginationLink
                        previous
                        onClick={() =>
                          setCurrentPage((prev) =>
                            prev === 1 ? prev : prev - 1
                          )
                        }
                      />
                    </PaginationItem>
                    {Array.from({
                      length: Math.ceil(GalleryDetData.length / ITEMS_PER_PAGE),
                    }).map((_, index) => (
                      <PaginationItem
                        key={index + 1}
                        active={index + 1 === currentPage}
                      >
                        <PaginationLink onClick={() => paginate(index + 1)}>
                          {index + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationLink
                        next
                        onClick={() =>
                          setCurrentPage((prev) =>
                            prev ===
                            Math.ceil(GalleryDetData.length / ITEMS_PER_PAGE)
                              ? prev
                              : prev + 1
                          )
                        }
                      />
                    </PaginationItem>
                  </Pagination>
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
                Are you Sure You want to Remove this Gallery-Items ?
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
                handleDeleteGalleryCategory(GalleryDetToDelete._id);
                setDeleteModal(false);
              }}
            >
              Yes, Delete It!
            </button>
          </div>
        </ModalBody>
      </Modal>
   </>
  )
}

export default ManageGallery