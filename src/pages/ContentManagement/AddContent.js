import React, { useContext, useMemo, useState } from "react";
import UiContent from "../../Components/Common/UiContent";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { Card, Col, Container, Input, Label, Row, Form } from "reactstrap";
import JoditEditor from "jodit-react";
import SignContext from "../../contextAPI/Context/SignContext";

const AddContent = () => {
  const { addContent } = useContext(SignContext);
  const [ContentData, setContentData] = useState({
    contentType: "",
    content : "",
    active : true,
  });
  const [editorContent, setEditorContent] = useState("");

  const handleEditorChange = (newContent) => {
    // Step 3: Implement a function to update the editor content
    setEditorContent(newContent);

    // Also update the content field in the ContentData state
    setContentData({
      ...ContentData,
      content: newContent,
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setContentData({
      ...ContentData,
      [name]: newValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await addContent(ContentData);

    console.log(res);
    if (res.success) {
      // Handle success
      // For example, display a success message and reset the form
      console.log("Content added successfully");
      setContentData({
        contentType: "",
        content: "",
        active: true,
      });
    } else {
      // Handle error
      console.error("Error adding content:", res.msg);
    }
  };

  const config = useMemo(
    () => ({
      readonly: false,
    }),
    []
  );

  document.title = "Add Content | Content";

  return (
    <>
      <UiContent />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Add Content" pageTitle="Content" />
          <Row>
            <Col lg={12}>
              <Form onSubmit={handleSubmit}>
                <Card>
                  <div className="card-body">
                    <div className="live-preview">
                      <Row className="align-items-center g-3">
                        <Col lg={12}>
                          <Label className="form-label" htmlFor="category">
                            Content-Type
                          </Label>
                          <Input
                            className="form-control"
                            type="text"
                            name="contentType"
                            placeholder="add Content-Type"
                            value={ContentData.contentType}
                            onChange={handleChange}
                          />
                        </Col>
                      </Row>
                      <Row className="align-items-center g-3">
                        <Col lg={12}>
                          <div className="mt-3">
                            <Label
                              htmlFor="contentinput"
                              className="form-label"
                            >
                              Enter Contents
                            </Label>
                            <JoditEditor
                              config={config}
                              tabIndex={1}
                              id="content"
                              name="content"
                              value={editorContent}
                              onChange={handleEditorChange}
                            />
                          </div>

                          <div className="mt-3">
                            <Input
                              type="checkbox"
                              id="isActive"
                              label="Is Active"
                              name="active"
                              checked={ContentData.active}
                              onChange={handleChange}
                            />
                            <label className="me-2">Is Active</label>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Card>
                <div className="text-end mb-3">
                  <button
                    type="submit"
                    className="btn btn-success w-sm"
                    //   onClick={togglesuccessmodal}
                  >
                    Submit
                  </button>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default AddContent;
