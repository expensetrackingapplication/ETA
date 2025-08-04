import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const MyInput = ({ value, label, placeholder, onChange, type = "text", name, ...rest }) => {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex flex-col gap-1.5">
            {/* <<<--- FIX #1: The label text is now light gray and visible on a dark background --- >>> */}
            <label className="text-[13px] text-gray-400">{label}</label>

            {/* <<<--- FIX #2: The input container now has a light background, matching your screenshot --- >>> */}
            <div className="flex items-center bg-slate-100 rounded-md p-3">
                <input
                    type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
                    placeholder={placeholder}
                    className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-400"
                    value={value}
                    onChange={onChange}
                    name={name} // This is important for the form handler
                    {...rest}
                />

                {type === "password" && (
                    <>
                        {showPassword ? (
                            <FaRegEye
                                size={20}
                                className="text-primary cursor-pointer"
                                onClick={toggleShowPassword}
                            />
                        ) : (
                            <FaRegEyeSlash
                                size={20}
                                className="text-slate-400 cursor-pointer"
                                onClick={toggleShowPassword}
                            />
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default MyInput;