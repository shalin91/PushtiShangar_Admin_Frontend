import React from "react";

import UiContent from "../../../Components/Common/UiContent";

//import Components
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { Card, Col, Container, Input, Label, Row } from "reactstrap";

const BasicElements = () => {
  document.title = "Add Category | Company";

  return (
    <React.Fragment>
      <UiContent />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Add Category" pageTitle="Product Category" />
          <Row>
            <Col lg={12}>
              <Card>
                <div className="card-body">
                  <div className="live-preview">
                    <Row className="align-items-center g-3">
                      <Col lg={6}>
                        <Label className="form-label" htmlFor="category">
                          Add Category
                        </Label>
                        <Input
                          className="form-control"
                          type="text"
                          placeholder="add category"
                        />
                      </Col>
                      <Col lg={6}>
                        <Label className="form-label" htmlFor="subcategory">
                          Add Sub-Category
                        </Label>
                        <Input
                          className="form-control"
                          type="text"
                          placeholder="add subcategory"
                        />
                      </Col>
                    </Row>
                  </div>
                </div>
                <div className="text-end mb-3 me-4">
                  <button type="submit" className="btn btn-success">
                    Submit
                  </button>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default BasicElements;
