import React from "react";
import "./AddProduct.jsx";
import "./AddProduct.css";
import uplod_area from "../../Assets/upload_area.svg";
import { useState } from "react";
import { addProductApi, imageUploadApi } from "../../services/allApis.js";





const AddProduct = () => {
  const [image, setImage] = useState(false);

  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "women",
    new_price: "",
    old_price: "",
  });

  // add product api
  const handleAddProduct = async (e) => {
    e.preventDefault();

   
    if (
      !productDetails.name ||
      !image ||
      !productDetails.category ||
      !productDetails.new_price ||
      !productDetails.old_price
    ) {
      alert("Please fill in all the fields and select an image.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("product", image);

      const headers={
        "content-type":"multipart/formdata"
      }

      const result = await imageUploadApi(formData,headers)
      
      
      

      if (result.data.success) {
        const imageUrl = result.data.imageUrl;

        productDetails.image = imageUrl;

        const bodyData = productDetails

       const product = await addProductApi(bodyData)

        console.log(product);
        

        if (product.data.success) {
          alert(product.data.message);
        } else {
          alert("Product adding failed.");
        }
      } else {
        alert("Image upload failed.");
      }
    } catch (error) {
      alert("An error occurred while adding the product.");
    }
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setProductDetails({ ...productDetails, [name]: value });
  };

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="add-product">
      <div className="addproduct-itemfield">
        <p>Product title</p>
        <input
          value={productDetails.name}
          onChange={changeHandler}
          type="text"
          name="name"
          placeholder="Type Here"
        />
      </div>

      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input
            value={productDetails.old_price}
            onChange={changeHandler}
            type="number"
            name="old_price"
            placeholder="Type Here"
            min="0"
          />
        </div>

        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input
            value={productDetails.new_price}
            onChange={changeHandler}
            type="number"
            name="new_price"
            placeholder="Type Here"
            min="0"
          />
        </div>
      </div>

      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select
          value={productDetails.category}
          onChange={changeHandler}
          name="category"
          className="add-product-selector"
        >
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>

      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img
            src={image ? URL.createObjectURL(image) : uplod_area}
            className="addproduct-thumbnail-img"
            alt="Upload Area"
          />
        </label>
        <input
          onChange={imageHandler}
          type="file"
          name="image"
          id="file-input"
          hidden
        />
      </div>

      <button onClick={handleAddProduct} className="addproduct-btn">
        ADD
      </button>
    </div>
  );
};

export default AddProduct;