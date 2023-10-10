import React from "react";

const Description = () => {
  return (
    <div className="mb-3">
      <Label>Product Description</Label>
      <JoditEditor
        config={config}
        tabIndex={1}
        id="description"
        name="description"
        value={productForm.values.description}
        onChange={(product) =>
          productForm.setFieldValue("description", product)
        }
        onBlur={productForm.handleBlur}
        invalid={
          productForm.errors.description && productForm.touched.description
            ? true
            : false
        }
      />
      {productForm.errors.description && productForm.touched.description ? (
        <FormFeedback type="invalid">
          {productForm.errors.description}
        </FormFeedback>
      ) : null}
    </div>
  );
};

export default Description;
