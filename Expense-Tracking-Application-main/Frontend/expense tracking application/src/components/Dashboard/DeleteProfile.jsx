import React from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosinstance'; // Using your project's axios instance
import { API_PATHS } from '../../utils/apiPaths';     // Using your project's API paths
import { toast } from 'react-toastify';               // Using your project's notification system

const DeleteProfile = () => {
    const navigate = useNavigate();

    const handleDeleteAccount = async () => {
        // Confirmation dialog for safety
        if (window.confirm("Are you absolutely sure? This will permanently delete your account and all associated data. This action cannot be undone.")) {
            try {
                // Using the correct, centralized API path
                await axiosInstance.delete(API_PATHS.AUTH.DELETE_PROFILE);

                // The axiosInstance automatically adds the token, so no manual work is needed.

                // Clear the token from local storage
                localStorage.removeItem('token');

                // Notify the user of success
                toast.success('Your account has been deleted successfully.');

                // Redirect to the login page after a 2-second delay so the user can see the message
                setTimeout(() => {
                    navigate('/login');
                }, 2000);

            } catch (error) {
                // Log the full error for debugging
                console.error("Failed to delete account:", error);

                // Show a user-friendly error message from the server response if it exists
                toast.error(error.response?.data?.message || "There was an error deleting your account.");
            }
        }
    };

    return (
        <div className='card bg-red-50 border border-red-200 p-4'>
            <h5 className='text-lg font-semibold text-red-600'>Delete Account (Danger Zone)</h5>
            <p className='mt-2 text-sm text-gray-700'>
                Once you delete your account, there is no going back. Please be certain.
            </p>
            <div className='mt-4'>
                <button
                    onClick={handleDeleteAccount}
                    className='bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-red-500'
                >
                    I want to delete my account
                </button>
            </div>
        </div>
    );
};

export default DeleteProfile;