import React, { useEffect, useState } from "react";
import Table from "../component/VTable";
import Layout from "../component/Layout";
import { Link } from "react-router-dom";
import { Trash2 } from 'lucide-react';
import axios from 'axios'
import ApiConfig from "../config/ApiConfig";
import { useSelector } from "react-redux";
import Modal from "../component/Modal";
import { toast } from "react-toastify";
export default function List() {
    const columns = [
        {
            title: "#",
            dataIndex: "srno",
            key: "srno",
            render: (item, index) => (
                <>
                    <div className="flex gap-1 text-center justify-center">
                        {page==1 ? index + 1 : (page-1)*10 + 1}
                    </div>
                </>
            ),
        },
        {
            title: " Name",
            dataIndex: "name",
            key: "name",

        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",

        },
        {
            title: "Phone No",
            dataIndex: "phoneNumber",
            key: "phoneNumber",

        },
        {
            title: "Gender",
            dataIndex: "gender",
            key: "gender",

        },

        {
            title: "Action",
            render: (item) => (
                <>
                    <div className="flex gap-1 text-center justify-center">
                        <Link to="#">
                            <Trash2 color="#ff0000" size={16} onClick={()=>{handleOpen(); setUserDetails(item)}} />
                        </Link>
                    </div>
                </>
            ),
            key: "action",
            width: 90,
        },

    ];

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userDetail, setUserDetails] = useState({});
    const token = useSelector((state) => state.auth.token)
    const [page, setPage] = useState(1)
    const [responseData, setResponseData] = useState({});
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleOpen = () => {
        setIsModalOpen(true);
    };

    const handleClose = () => {
        setIsModalOpen(false);
    };
    const DeleteUser = async () => {
        try {
            const response = await axios.post(`${ApiConfig.userdelete}/${userDetail.id}`, 
            {
                token: token // Sending token directly as part of the request body
            },
            {
                headers: {
                    "Content-Type": 'application/json', // Correct header for JSON content
                }
            });
            toast.success("User Deleted Successfully");
        } catch (error) {
            console.log("Error while deleting user:", error);
        } finally {
            // Clear user details after the request
            setUserDetails({});
            fetchUserData(token); // Re-fetch user data if needed
            setIsModalOpen(false); // Close the modal
        }
    };
    
   
    const fetchUserData = async (token) => {
        setLoading(true)
        try {
            const response = await axios.get(`${ApiConfig.userList}?page=${page}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": 'application/json',
                },
            });

            setUserData(response.data.data);
            setResponseData(response.data);
        } catch (error) {
            console.log("Error while fetching the user:", error);
        }
        finally{
            setLoading(false)
        }
    };
    useEffect(() => { fetchUserData(token) }, [page])

    const handlePageChange = (event, value) => {
        setPage(value)
    }

    const handleRowsPerPageChange =()=>{}

    return (
        <>
            <Layout>
                <div className="bg-white p-4 mb-2 rounded-lg  dark:border-gray-700 mt-14">
                    <div>
                        <h3 class="!text-defaulttextcolor dark:!text-defaulttextcolor/70 dark:text-white text-left dark:hover:text-white text-[1.125rem] font-semibold">List</h3>
                    </div>
                </div>
                <div className="bg-white">
                    <div className="p-4 rounded-lg dark:border-gray-700 ">
                        <div className="flex justify-end mb-3 p-2">
                            <Link to="/Stepperform" className="rounded-lg px-4 py-2 bg-green-700 text-green-100 hover:bg-green-800 duration-300">Add</Link>
                        </div>
                        <Table cols={columns} data={userData}
                        totalPages={responseData.lastPage} page={page} 
                        handlePageChange={handlePageChange}
                         loading={loading}
                          handleRowsPerPageChange={handleRowsPerPageChange}
                         />
                    </div>
                </div>
            </Layout>

            <Modal
                title={"Are you sure wanted to delete this user?"}
                isOpen={isModalOpen} onClose={handleClose} SuccessBtnTitle={"Delete"} 
                successFunction={DeleteUser}
                Content={
                    <>
                        <h6>Name : {userDetail.name}</h6>
                        <h6>Email : {userDetail.email}</h6>
                    </>
                } />
        </>
    )
}