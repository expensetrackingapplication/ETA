import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthLayout from '../../components/layouts/AuthLayout';
import MyInput from '../../components/Inputs/MyInput';
import { validateEmail, validateUsername } from '../../utils/helper';
import axiosInstance from '../../utils/axiosinstance';
import { API_PATHS } from '../../utils/apiPaths';

const SignUp = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (!fullName || !email || !password) return setError("Please fill all the fields");
        if (!validateEmail(email)) return setError("Please enter a valid email address");
        if (!validateUsername(fullName)) {
            return setError("Please enter a valid username (only letters and one space allowed)");
        }
        if (password.length < 8) return setError("Password must be at least 8 characters");
        setError("");

        try {
            const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
                fullName,
                email,
                password,
            });
            if (response.status === 201) {
                toast.success("Registration successful! Please log in.");
                navigate("/login");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Signup failed. Please try again.");
        }
    };

    return (
        <AuthLayout>
            <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
                <h3 className="text-xl font-semibold text-black">Create an Account</h3>
                <p className="text-xs text-slate-700 mt-[5px] mb-6">Join us today by entering your details below</p>
                <form onSubmit={handleSignUp}>
                    <div className="space-y-4">
                        <MyInput value={fullName} onChange={({ target }) => setFullName(target.value)} label="Full Name" placeholder="Saurabh Jain" type="text" />
                        <MyInput value={email} onChange={({ target }) => setEmail(target.value)} label="Email Address" placeholder="saurabh@example.com" type="text" />
                        <MyInput value={password} onChange={({ target }) => setPassword(target.value)} label="Password" placeholder="Min 8 Characters" type="password" />
                    </div>
                    {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
                    <button type="submit" className="btn-primary mt-4 w-full">SIGN UP</button>
                    <p className="text-[13px] text-slate-500 mt-3 text-center">
                        Already have an account?{" "}
                        <Link className="font-medium text-primary underline" to="/login">Login</Link>
                    </p>
                </form>
            </div>
        </AuthLayout>
    );
};

export default SignUp;