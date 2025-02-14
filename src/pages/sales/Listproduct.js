import React, { useEffect, useState } from "react";
import Table from "../../component/VTable";
import Layout from "../../component/Layout";
import { Link } from "react-router-dom";
import axios from "axios";
import prodextList from '../../config/ApiConfig'
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../Redux/Slice/AuthSlice";
export default function Product() {
    const columns = [
        {
            title: "#",
            dataIndex: "srno",
            key: "srno",
            render: (item, index) => (
                <>
                    <div className="m-auto flex justify-center">
                        {page===1 ? index + 1 : index + (page-1)*10 + 1}
                    </div>
                </>
            )

        },
        {
            title: "Product Name",
            dataIndex: "name",
            key: "name",

        },
        {
            title: "Product Image",
            dataIndex: "productimg",
            key: "productimg",
            render: (item) => (
                <>
                    <div className="m-auto flex justify-center">
                        <img src={item.image} alt="productimg" width="50px" height="50px" className="rounded" />
                    </div>
                </>
            )

        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",

        },
        {
            title: "Price",
            dataIndex: "price",
            key: "Price",

        },

    ];
    const [productList, setProductList] = useState([]);
    const [responseData, setResponseData] = useState({});
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1)
    const dispatch = useDispatch()
    const productToken = useSelector((state) => state.auth.token)
    const getProduct = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`${prodextList.productlist}?page=${page}`,
                {
                    headers: {
                        "Authorization": `Bearer ${productToken}`,
                        "Content-Type": 'application/json',
                    }
                })
            setProductList(response.data.data || [])
            if (response.data.status === "Token is Expired") {
                dispatch(logoutUser())
            }
            setResponseData(response.data)
        }
        catch (error) {
            console.log("error while product listing : ", error)
        }
        finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        getProduct()
    }, [page])

    const handlePageChange = (event, value) => {
        setPage(value)
    }

    const handleRowsPerPageChange =()=>{}

    return (
        <>
            <Layout>
                <div className="bg-white p-4 mb-2 rounded-lg  dark:border-gray-700 mt-14">
                    <div>
                        <h3 class="!text-defaulttextcolor dark:!text-defaulttextcolor/70 dark:text-white text-left dark:hover:text-white text-[1.125rem] font-semibold">Product</h3>
                    </div>
                </div>
                <div className="bg-white">
                    <div className="p-4 rounded-lg dark:border-gray-700 ">
                        <div className="flex justify-end mb-3 p-2">
                            <Link to="/Add-product" className="rounded-lg px-4 py-2 bg-green-700 text-green-100 hover:bg-green-800 duration-300">Add Product</Link>
                        </div>
                        <Table cols={columns} data={productList} totalPages={responseData.lastPage} page={page} handlePageChange={handlePageChange} loading={loading} handleRowsPerPageChange={handleRowsPerPageChange}/>
                    </div>
                </div>
            </Layout>
        </>
    )
}