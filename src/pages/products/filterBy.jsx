// import React from "react";
// import { useDispatch } from "react-redux";
// import {
//   Card,
//   CardBody,
//   Col,
//   Row,
//   FormFeedback,
//   Spinner,
//   Form,
//   Container,
//   Label,
//   Input,
//   Button,
// } from "reactstrap";
// import {
//   getCategory,
//   getGst,
//   getSubCategory,
//   getSubSubCategory,
// } from "../../helpers/backend_helper";

// const FilterBy = () => {
//   const colorsData = useSelector((state) => state.Product.colors);
//   const seasonsData = useSelector((state) => state.Product.seasons);
//   const materialsData = useSelector((state) => state.Product.materials);

//   const dispatch = useDispatch();
//   const fetchDropdownData = async () => {
//     try {
//       const colorRes = await getColor();
//       dispatch({
//         type: GET_COLOR,
//         payload: {
//           actionType: "GET_COLOR",
//           data: colorRes.color,
//         },
//       });

//       const seasonRes = await getSeason();
//       dispatch({
//         type: GET_SEASON,
//         payload: {
//           actionType: "GET_SEASON",
//           data: seasonRes.season,
//         },
//       });

//       const materialRes = await getMaterial();
//       dispatch({
//         type: GET_MATERIAL,
//         payload: {
//           actionType: "GET_MATERIAL",
//           data: materialRes.material,
//         },
//       });
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   return (
//     <Card>
//       <CardBody>
//         <Col lg={4}>
//           <div className="mb-3">
//             <Label
//               htmlFor="choices-multiple-remove-button"
//               className="form-label text-muted"
//             >
//               filter by
//             </Label>
//             <Select
//               value={selectedMulti2}
//               isMulti={true}
//               isClearable={true}
//               onChange={(selectedMulti2) => {
//                 setselectedMulti2(selectedMulti2);
//                 setselectedItems(selectedMulti2.map((i) => i.value));
//                 console.log(selectedMulti2);
//                 console.log(selectedItems);
//               }}
//               options={[
//                 { value: "Color", label: "Color" },
//                 { value: "Material", label: "Material" },
//                 { value: "Season", label: "Season" },
//               ]}
//             />
//           </div>
//         </Col>

//         {selectedItems.includes("Color") ? (
//           <Col sm={2}>
//             <div className="mb-3">
//               <label className="form-label" htmlFor="color">
//                 Color
//               </label>
//               <select
//                 className="form-select"
//                 id="color"
//                 name="color"
//                 aria-label="color"
//                 onChange={(e) => {
//                   // Handle color selection here
//                 }}
//               >
//                 <option value={null} disabled>
//                   Select color
//                 </option>
//                 {colorsData
//                   ? colorsData.map((category) => (
//                       <option key={category._id} value={category._id}>
//                         {category.name}
//                       </option>
//                     ))
//                   : null}
//               </select>
//               {/* Error handling code here */}
//             </div>
//           </Col>
//         ) : null}

//         {selectedItems.includes("Material") ? (
//           <Col sm={2}>
//             <div className="mb-3">
//               <label className="form-label" htmlFor="material">
//                 Material
//               </label>
//               <select
//                 className="form-select"
//                 id="material"
//                 name="material"
//                 aria-label="material"
//                 onChange={(e) => {
//                   // Handle material selection here
//                 }}
//               >
//                 <option value={null} disabled>
//                   Select material
//                 </option>
//                 {seasonsData
//                   ? seasonsData.map((category) => (
//                       <option key={category._id} value={category._id}>
//                         {category.name}
//                       </option>
//                     ))
//                   : null}
//               </select>
//               {/* Error handling code here */}
//             </div>
//           </Col>
//         ) : null}

//         {selectedItems.includes("Season") ? (
//           <Col sm={2}>
//             <div className="mb-3">
//               <label className="form-label" htmlFor="season">
//                 Season
//               </label>
//               <select
//                 className="form-select"
//                 id="season"
//                 name="season"
//                 aria-label="season"
//                 onChange={(e) => {
//                   // Handle season selection here
//                 }}
//               >
//                 <option value={null} disabled>
//                   Select season
//                 </option>
//                 {materialsData
//                   ? materialsData.map((category) => (
//                       <option key={category._id} value={category._id}>
//                         {category.name}
//                       </option>
//                     ))
//                   : null}
//               </select>
//               {/* Error handling code here */}
//             </div>
//           </Col>
//         ) : null}
//       </CardBody>
//     </Card>
//   );
// };

// export default FilterBy;
