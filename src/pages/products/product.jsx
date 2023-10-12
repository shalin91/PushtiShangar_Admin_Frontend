import React, { useCallback, useState, useMemo, useEffect } from "react";
import JoditEditor from "jodit-react";
import { Card, CardBody, Col, Row, CardHeader, Container } from "reactstrap";
import { isEmpty } from "lodash";
import DeleteModal from "../../Components/Common/DeleteModal";
import FeatherIcon from "feather-icons-react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import {
  deleteProduct,
  getProducts,

} from "../../helpers/backend_helper";
import { GET_PRODUCTS } from "../../store/product/actionTypes";
import { useDispatch, useSelector } from "react-redux";

const ProductMaster = () => {
  const navigate = useNavigate();
  const allProductData = useSelector((state) => state.Product.products);
  const url = `${process.env.REACT_APP_BASE_URL}`;
  const [IsformActive, setIsformActive] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [productData, setProductData] = useState([]);
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [valuesForUpdate, setValuesForUpdate] = useState("");
  const [selectedForDelete, setSelectedForDelete] = useState("");

  const searchList = (e) => {
    let inputVal = e.toLowerCase();

    function filterItems(arr, query) {
      return arr.filter(function (el) {
        return (
          el.name.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
          el.sku.toLowerCase().indexOf(query.toLowerCase()) !== -1
        );
      });
    }

    let filterData = filterItems(allProductData, inputVal);
    setProductData(filterData);
    if (filterData.length === 0) {
      document.getElementById("noresult").style.display = "block";
      document.getElementById("todo-task").style.display = "none";
    } else {
      document.getElementById("noresult").style.display = "none";
      document.getElementById("todo-task").style.display = "block";
    }
  };

  const dispatch = useDispatch();
  const fetchData = async () => {

      try {
        setIsFetchingData(true);
        const productsResponse = await getProducts();

        dispatch({
          type: GET_PRODUCTS,
          payload: {
            actionType: "GET_PRODUCTS",
            data: productsResponse.products,
          },
        });
        setIsFetchingData(false);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setIsFetchingData(false);
      }
    
  };

  useEffect(() => {
    fetchData();
  }, []); 
  
  useEffect(() => {
    setProductData(allProductData);
  }, [allProductData]);



  const handledeleteProduct = async () => {
    if (selectedForDelete) {
      await deleteProduct(selectedForDelete);
      console.log(selectedForDelete)
      fetchData();
      setDeleteModal(false);
    }
  };

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={() => handledeleteProduct()}
        onCloseClick={() => setDeleteModal(false)}
      />
      <ToastContainer closeButton={false} />
      <div className="page-content">
        <Container fluid>
          <Card>
            <CardHeader className="d-flex justify-content-between align-items-center">
              <React.Fragment>
                <h4 className="card-title mb-0">Product Master</h4>
                <Row className="align-items-center">
                  <Col className="col-lg-auto">
                    <div className="search-box">
                      <input
                        type="text"
                        id="searchTaskList"
                        className="form-control search"
                        placeholder="Search by product name"
                        onKeyUp={(e) => searchList(e.target.value)}
                      />
                      <i className="ri-search-line search-icon"></i>
                    </div>
                  </Col>
                  <Col className="col-lg-auto">
                    <button
                      className="btn btn-primary createTask"
                      type="button"
                      onClick={() => {
                        navigate("/add-product");
                      }}
                    >
                      <i className="ri-add-fill align-bottom" /> Add New Product
                    </button>
                  </Col>
                </Row>
              </React.Fragment>
            </CardHeader>

            <CardBody>
              <div
                className="todo-content position-relative px-4 mx-n4"
                id="todo-task"
              >
                {isEmpty(productData) &&
                  (isFetchingData ? (
                    <div id="elmLoader">
                      <div
                        className="spinner-border text-primary avatar-sm"
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  ) : (
                    <div id="elmLoader" className="py-4 mt-4 text-center">
                      <div className="d-flex flex-column align-items-center">
                        <i
                          className="las la-exclamation-triangle"
                          style={{ fontSize: "48px" }}
                        ></i>

                        <h5 className="mt-4">Sorry No data to display</h5>
                      </div>
                    </div>
                  ))}

                <table className="table align-middle position-relative">
                  <thead className="table-active">
                    <tr>
                      <th scope="col">index</th>

                      <th scope="col">image</th>
                      <th scope="col">name</th>
                      <th scope="col">category</th>
                      <th className="stock">Stock</th>
                      <th className="price">Original Price</th>
                      <th className="price">Discounted</th>
                      <th scope="col">actions</th>
                    </tr>
                  </thead>

                  <tbody id="task-list">
                    {productData
                      ? productData.map((item, key) => (
                          <tr key={key}>
                            <td>{key + 1}</td>
                            <td>
                              <img
                                src={`${url}/products/${item.imageGallery[0]}`}
                                alt="Banner"
                                style={{
                                  width: "100px",
                                  height: "auto",
                                  maxHeight: "100px",
                                  objectFit: "cover",
                                  borderRadius: "3px",
                                }}
                              />
                            </td>
                            <td>
                              {" "}
                              <div>{item.name}</div>
                              <div>{`${item.sku}`}</div>
                            </td>
                            <td>{item.category}</td>
                            <td>{item.stock ? item.stock.quantity : null}</td>
                            <td>{item.prices.calculatedPrice ? item.prices.calculatedPrice : "NA"}</td>
                            <td>
                              {item.prices.discounted ? item.prices.discounted : "NA"}
                            </td>
                            <td>
                              <div className="hstack gap-2">
                                <button
                                  className="btn btn-sm btn-soft-danger remove-list"
                                  onClick={() => {
                                    setSelectedForDelete(item._id);
                                    setDeleteModal(true);
                                  }}
                                >
                                  <i className="ri-delete-bin-5-fill align-bottom" />
                                </button>
                                <button
                                  className="btn btn-sm btn-soft-info edit-list"
                                  onClick={() => {
                                    navigate(`/add-product/${item._id}`);
                                    
                                  }}
                                >
                                  <i className="ri-pencil-fill align-bottom" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      : null}
                  </tbody>
                </table>
              </div>
              <div
                className="py-4 mt-4 text-center"
                id="noresult"
                style={{ display: "none" }}
              >
                <h1>
                  <FeatherIcon icon="search" />
                </h1>
                <h5 className="mt-4">Sorry! No Result Found</h5>
              </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ProductMaster;
