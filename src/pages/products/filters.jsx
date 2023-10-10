import React, { useEffect } from "react";
import { Col, Label,Row } from "reactstrap";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { getColor, getMaterial, getSeason } from "../../helpers/backend_helper";
import {

    GET_COLOR,
    GET_MATERIAL,
    GET_SEASON,
  } from "../../store/product/actionTypes";

const Filters = (props) => {
    const colorsData = useSelector((state) => state.Product.colors);
    const seasonsData = useSelector((state) => state.Product.seasons);
    const materialsData = useSelector((state) => state.Product.materials);
  
    const dispatch = useDispatch();
    const fetchDropdownData = async () => {
        try {

          const colorRes = await getColor();
          dispatch({
            type: GET_COLOR,
            payload: {
              actionType: "GET_COLOR",
              data: colorRes.color,
            },
          });
          const seasonRes = await getSeason();
          dispatch({
            type: GET_SEASON,
            payload: {
              actionType: "GET_SEASON",
              data: seasonRes.season,
            },
          });
    
          const materialRes = await getMaterial();
          dispatch({
            type: GET_MATERIAL,
            payload: {
              actionType: "GET_MATERIAL",
              data: materialRes.material,
            },
          });
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      useEffect(() => {
        if (
            colorsData.length === 0 ||
            seasonsData.length === 0 ||
            materialsData === 0
        ) {
          fetchDropdownData();
        }
        
       
      }, []);

  return (
    <React.Fragment>
        <Row>
        <Col lg={4}>
        <div className="mb-3">
          <Label
            htmlFor="choices-multiple-remove-button"
            className="form-label text-muted"
          >
            filter by
          </Label>
          <Select
            value={props.selectedMulti2}
            isMulti={true}
            isClearable={true}
            onChange={(selectedMulti2) => {
              props.setselectedMulti2(selectedMulti2);
              props.setselectedItems(selectedMulti2.map((i) => i.value));
            }}
            options={[
              { value: "Color", label: "Color" },
              { value: "Material", label: "Material" },
              { value: "Season", label: "Season" },
            ]}
          />
        </div>
      </Col>

      {props.selectedItems.includes("Color") ? (
        <Col sm={2}>
          <div className="mb-3">
            <label className="form-label" htmlFor="color">
              Color
            </label>
            <select
              className="form-select"
              id="color"
              name="color"
              aria-label="color"
              onChange={(e) => {
                props.setSelectedcolors(e.target.value)
              }}
            >
              <option value={null} >
                Select color
              </option>
              {colorsData
                ? colorsData.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))
                : null}
            </select>
            {/* Error handling code here */}
          </div>
        </Col>
      ) : null}

      {props.selectedItems.includes("Material") ? (
        <Col sm={2}>
          <div className="mb-3">
            <label className="form-label" htmlFor="material">
              Material
            </label>
            <select
              className="form-select"
              id="material"
              name="material"
              aria-label="material"
              onChange={(e) => {
                props.setSelectedmaterials(e.target.value)
              }}
            >
              <option value={null} >
                Select material
              </option>
              {
              materialsData
                ? materialsData.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))
                : null}
            </select>
            {/* Error handling code here */}
          </div>
        </Col>
      ) : null}

      {props.selectedItems.includes("Season") ? (
        <Col sm={2}>
          <div className="mb-3">
            <label className="form-label" htmlFor="season">
              Season
            </label>
            <select
              className="form-select"
              id="season"
              name="season"
              aria-label="season"
              onChange={(e) => {
                props.setSelectedseasons(e.target.value)
              }}
            >
              <option value={null} >
                Select season
              </option>
              {seasonsData
                ? seasonsData.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))
                : null}
            </select>
            {/* Error handling code here */}
          </div>
        </Col>
      ) : null}
        </Row>

    </React.Fragment>
  );
};

export default Filters;
