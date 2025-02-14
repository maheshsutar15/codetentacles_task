import React, { useState } from 'react';
import Personaldetails from "./stepperform/personaldetails";
import Countrydetails from "./stepperform/countrydetails";
import Skillsdetails from "./stepperform/skillsdetails";
import Credentaildetails from "./stepperform/credentaildetails";
import { Stepper, Step, StepLabel, Button, Typography } from '@mui/material';
import Layout from "../component/Layout";
import { Link } from 'react-router-dom';
import ApiConfig from '../config/ApiConfig';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
const steps = ['Personal Information', 'Details', 'Skills Details', "Credentail Details"];

export default function Stepperform() {
    const [activeStep, setActiveStep] = useState(0);
    const token = useSelector((state) => state.auth.token)  
    const [stepperFormData, setStepperFormData] = useState({
        profileImg: "",
        name: "",
        gender: "",
        phoneNumber: "",
        country: "",
        state: "",
        skills: [],
        email: "",
        password: "",
        confirmPassword: "",
    })
    const [imageFile, setImageFile] = useState('')

    const onChange = (event) => {
        const { name, value, checked } = event.target
        setStepperFormData((prev) => ({ ...prev, [name]: value || checked }))
    }
    const onImageChange = (e) => {
        const file = e.target.files[0];
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/svg+xml']; // Allowed file types
      
        if (file && allowedTypes.includes(file.type)) {
          setStepperFormData((prevData) => ({
            ...prevData,
            profileImg: URL.createObjectURL(file),
          }));
          setImageFile(file);
        } else {
          alert("Please upload a valid image file (jpeg, png, jpg, gif, svg).");
        }
      };
      
    const submitFormData = () => {
        const formData = new FormData();
        formData.append('name', stepperFormData.name);
        formData.append('email', stepperFormData.email);
        formData.append('password', stepperFormData.password);
        formData.append('password_confirmation', stepperFormData.confirmPassword);
        formData.append('skills', stepperFormData.skills.join(','));
        formData.append('photo', imageFile);
        formData.append('gender', stepperFormData.gender);
        formData.append('phoneNumber', stepperFormData.phoneNumber);
        formData.append('countryId', stepperFormData.country);
        formData.append('stateId', stepperFormData.state);
        formData.append('token', token);
        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: ApiConfig.register, 
            data: formData,
        };

        axios.request(config)
            .then((response) => {
                console.log('API Response:', response.data);
                toast.success("Data Added Successfully")
            })
            .catch((error) => {
                console.log('API Error:', error);
            });
    };



    const handleNext = (e) => {
        e.preventDefault();
        const StepOneRequired = stepperFormData.profileImg !== "" && stepperFormData.gender !== "" && stepperFormData.name !== "" && stepperFormData.phoneNumber !== ""
        const StepTwoRequired = stepperFormData.country !== "" && stepperFormData.state !== ""
        const StepThreeRequired = stepperFormData.skills.length > 0;
        const StepFourRequired = stepperFormData.email !== "" && stepperFormData.password !== "" && stepperFormData.confirmPassword !== "";
        if (activeStep === 0 && StepOneRequired) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }

        else if (activeStep === 1 && StepOneRequired && StepTwoRequired)
            setActiveStep((prevActiveStep) => prevActiveStep + 1);

        else if (activeStep === 2 && StepOneRequired && StepTwoRequired && StepThreeRequired)
            setActiveStep((prevActiveStep) => prevActiveStep + 1);

        else if (activeStep === 3 && StepOneRequired && StepTwoRequired && StepThreeRequired && StepFourRequired) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            submitFormData();
        }

        else return
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <>
                        <Personaldetails stepperFormData={stepperFormData} onChange={onChange} onImageChange={onImageChange} />
                    </>
                );
            case 1:
                return (
                    <>
                        <Countrydetails stepperFormData={stepperFormData} onChange={onChange} />
                    </>
                );
            case 2:
                return (
                    <>
                        <Skillsdetails stepperFormData={stepperFormData} onChange={onChange} />
                    </>
                );
            case 3:
                return (
                    <>
                        <Credentaildetails stepperFormData={stepperFormData} onChange={onChange} />
                    </>
                );
            default:
                return 'Unknown step';
        }
    };

    return (
        <Layout>
            <div className="bg-white p-4 mb-2 rounded-lg  dark:border-gray-700 mt-14">
                <div>
                    <h3 class="!text-defaulttextcolor dark:!text-defaulttextcolor/70 dark:text-white text-left dark:hover:text-white text-[1.125rem] font-semibold">Stepper Form</h3>
                </div>
            </div>
            <div className="bg-white">
                <div className="p-4 rounded-lg dark:border-gray-700 mb-2">
                    <Stepper activeStep={activeStep} alternativeLabel>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </div>
            </div>
            <div className="bg-white">
                <div className="p-4 rounded-lg dark:border-gray-700">
                    <>
                        {activeStep === steps.length ? (
                            <div className="flex justify-center  w-full mt-5">
                                <div className=" p-8 m-4">
                                    <Typography variant="h5" className='mt-10 mb-10 pb-10'>Thank you for submitting the form!</Typography>
                                    <Link to="/List" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">View List
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <>
                                <Typography variant="h5">{getStepContent(activeStep)}</Typography>
                                <div className='flex justify-center'>
                                    <div className='flex justify-between w-full mt-4'>
                                        <Button className="bg-back " disabled={activeStep === 0} onClick={handleBack}>
                                            Back
                                        </Button>
                                        <Button variant="contained" type='submit' color="primary" onClick={handleNext}>
                                            {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                                        </Button>
                                    </div>
                                </div>
                            </>
                        )}
                    </>
                </div>
            </div>
        </Layout>
    );
};


