import React, { useState, useEffect, useContext } from 'react';
import DashboardLayout from '../components/layouts/DashboardLayout';
import axiosInstance from '../utils/axiosinstance';
import { API_PATHS } from '../utils/apiPaths';
import { toast } from 'react-toastify';
import MyInput from '../components/Inputs/MyInput';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import CharAvatar from '../components/cards/CharAvatar';

const Profile = () => {
    const navigate = useNavigate();
    const { user: contextUser, updateUser: updateContextUser } = useContext(UserContext);
    const [formData, setFormData] = useState({ fullName: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (contextUser) {
            setFormData({ fullName: contextUser.fullName, email: contextUser.email, password: '' });
        }
    }, [contextUser]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdateProfile = async () => {
        setLoading(true);
        let wasSensitiveInfoChanged = false;
        try {
            const payload = {};
            if (formData.fullName !== contextUser.fullName) payload.fullName = formData.fullName;
            if (formData.email !== contextUser.email) payload.email = formData.email;
            if (formData.password) payload.password = formData.password;

            if (Object.keys(payload).length > 0) {
                await axiosInstance.put(API_PATHS.AUTH.UPDATE_PROFILE, payload);
                toast.success("Profile details updated successfully!");
                if (payload.email || payload.password) wasSensitiveInfoChanged = true;
            } else {
                toast.info("No changes to save.");
            }
            
            const { data: latestUserData } = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);
            updateContextUser(latestUserData);

            if (wasSensitiveInfoChanged) {
                toast.info("For your security, please log in again.", { autoClose: 3000 });
                setTimeout(() => {
                    localStorage.removeItem('token');
                    updateContextUser(null);
                    navigate('/login');
                }, 3000);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred.");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteAccount = async () => {
        if (window.confirm("Are you absolutely sure? This will permanently delete your account and all data.")) {
            try {
                await axiosInstance.delete(API_PATHS.AUTH.DELETE_PROFILE);
                toast.success('Your account has been deleted.');
                localStorage.removeItem('token');
                updateContextUser(null);
                navigate('/login');
            } catch (error) {
                toast.error(error.response?.data?.message || "Failed to delete account.");
            }
        }
    };
    
    if (!contextUser) return <DashboardLayout><div>Loading...</div></DashboardLayout>;

    return (
        <DashboardLayout activeMenu="Profile">
            {/* <<<--- UI FIX: Using slate-900 background to match your screenshot exactly --- >>> */}
            <div className="bg-slate-800 rounded-2xl p-6 md:p-8 max-w-2xl mx-auto my-8 border border-slate-700/50">
                <h3 className="text-2xl font-bold mb-6 text-white">Edit Profile</h3>
                
                <div className="flex flex-col items-center gap-4 mb-8">
                    <CharAvatar
                        fullName={contextUser.fullName || ''}
                        width="w-24"
                        heigth="h-24"
                        style="text-3xl bg-primary text-white"
                    />
                </div>

                <div className="space-y-6">
                    <MyInput label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} type="text" />
                    <MyInput label="Email Address" name="email" value={formData.email} onChange={handleChange} type="email" />
                    <MyInput label="New Password" name="password" value={formData.password} onChange={handleChange} type="password" placeholder="Leave blank to keep current password" />
                </div>
                
                <div className="flex justify-between items-center mt-8 border-t border-slate-700 pt-6">
                    <button onClick={handleDeleteAccount} className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors">
                        Delete Account
                    </button>
                    <button onClick={handleUpdateProfile} disabled={loading} className="add-btn add-btn-fill disabled:opacity-50">
                        {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Profile;