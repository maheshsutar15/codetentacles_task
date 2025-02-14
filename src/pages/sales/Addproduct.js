import React, { useState } from "react";
import Layout from "../../component/Layout";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Api from '../../config/ApiConfig'
import { toast } from "react-toastify";
import { Typography } from "@mui/material";

export default function AddProduct() {
    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: "",
        productImg: "", 
    });

    const [imageUrl, setImageUrl] = useState(""); 
    const [error, setError] = useState(""); 

    const productToken = useSelector((state) => state.auth.token);

    const handleAddProductEvent = (event) => {
        const { value, name } = event.target;
        setProduct((prev) => ({ ...prev, [name]: value }));
    };

    const handleImgChange = (e) => {
        setImageUrl(e.target.files[0]);
    };

    const validateForm = () => {
        if (!product.name || !product.description || !product.price || !imageUrl) {
            setError("All fields are required, including the image.");
            return false;
        }
        if (isNaN(product.price) || product.price <= 0) {
            setError("Price must be a valid number greater than zero.");
            return false;
        }
        setError("");
        return true;
    };

    const addProduct = async () => {
        if (!validateForm()) return; 

        const formData = new FormData();
        formData.append("name", product.name);
        formData.append("description", product.description);
        formData.append("price", product.price);
        formData.append("image", imageUrl); 
        try {
            const response = await axios.post(Api.addproduct, formData, {
                headers: {
                    "Authorization": `Bearer ${productToken}`,
                    "Content-Type": "multipart/form-data",
                },
            });
            toast.success("Product Added Successfully")
        } catch (error) {
            setError("There was an error while adding the product. Please try again.");
        }
        finally {
            setProduct({
                name: "",
                description: "",
                price: "",
                productImg: "",
            });
            setImageUrl("");
        }
    };

    const removeImage = ()=>{
        setImageUrl("")
    }

    return (
        <>
            <Layout>
                <div className="bg-white p-4 mb-2 rounded-lg  dark:border-gray-700 mt-14">
                    <div>
                        <h3 className="!text-defaulttextcolor dark:!text-defaulttextcolor/70 dark:text-white text-left dark:hover:text-white text-[1.125rem] font-semibold">Add Product</h3>
                    </div>
                </div>
                <div className="bg-white">
                    <div className="p-4 rounded-lg dark:border-gray-700">
                        <div>
                            <div className="w-full">
                                <form action="/" method="post">
                                    <div className="mb-4">
                                        <label className="block mb-2 text-sm font-medium text-gray-700 text-left" htmlFor="name">
                                            Product Name
                                        </label>
                                        <input
                                            className="w-full px-3 py-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            id="name"
                                            name="name"
                                            type="text"
                                            value={product.name}
                                            placeholder="Product Name"
                                            onChange={handleAddProductEvent}
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="block mb-2 text-sm font-medium text-gray-700 text-left" htmlFor="productImg">
                                            Product Image
                                        </label>
                                        <div className="flex items-center justify-center w-full">
                                            {imageUrl?.name ?

                                                <div className="flex gap-3 flex-wrap justify-center">
                                                    <h2>
                                                        {imageUrl?.name}
                                                    </h2>
                                                    <Typography className="cursor-pointer" onClick={removeImage}>&#10006;</Typography>
                                                </div>

                                                : <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                        </svg>
                                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                                    </div>
                                                    <input id="dropzone-file" type="file" className="hidden" onChange={handleImgChange} />
                                                </label>}
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block mb-2 text-sm font-medium text-gray-700 text-left" htmlFor="description">
                                            Description
                                        </label>
                                        <textarea
                                            placeholder="Description"
                                            name="description"
                                            value={product.description}
                                            className="w-full px-3 py-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            onChange={handleAddProductEvent}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block mb-2 text-sm font-medium text-gray-700 text-left" htmlFor="price">
                                            Price
                                        </label>
                                        <input
                                            className="w-full px-3 py-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            id="price"
                                            name="price"
                                            type="text"
                                            value={product.price}
                                            placeholder="Price"
                                            onChange={handleAddProductEvent}
                                        />
                                    </div>
                                    {error && (
                                        <div className="text-red-500 text-sm mb-4">
                                            <p>{error}</p>
                                        </div>
                                    )}
                                    <div className='flex justify-between'>
                                        <Link to="/Product" type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                                            Back
                                        </Link>
                                        <button type="button" onClick={addProduct} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                            Submit
                                        </button>
                                    </div>
                                </form>

                            </div>
                        </div>

                    </div>
                </div>
            </Layout>
        </>
    );
}
