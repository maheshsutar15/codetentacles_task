import React from "react";
export default function credentaildetails({onChange,stepperFormData}) {
    return (
        <>
             <div className="flex   w-full p-2 ">
                <div className=" w-full">
                    <h1 className="block text-left w-full text-gray-800 text-2xl font-bold mb-6">Credentails Details</h1>
                    <form action="/" method="post">
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-medium text-gray-700 text-left" for="firstName">
                                Email
                            </label>
                            <input
                                className="w-full px-3 py-3 text-sm leading-tight text-gray-700 border border-gray-200 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                id="firstName"
                                type="email"
                                name="email"
                                value={stepperFormData.email}
                                onChange={onChange}
                                placeholder="Email" />
                        </div>
                        <div className="grid gap-2  md:grid-cols-2">
                            <div className="mb-4 ">
                                <label className="block mb-2 text-sm font-medium text-left text-gray-700" for="password">
                                    Password
                                </label>
                                <input
                                    className="w-full px-3 py-3 text-sm leading-tight text-gray-700 border border-gray-200  rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={stepperFormData.password}
                                    onChange={onChange}
                                    placeholder="Password" />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-medium text-left text-gray-700 text-left" for="c_password">
                                    Confirm Password
                                </label>
                                <input
                                    className="w-full px-3 py-3 text-sm leading-tighttext-gray-700 border border-gray-200 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    id="c_password"
                                    type="password"
                                    name="confirmPassword"
                                    value={stepperFormData.confirmPassword}
                                    onChange={onChange}
                                    placeholder="Password"
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
