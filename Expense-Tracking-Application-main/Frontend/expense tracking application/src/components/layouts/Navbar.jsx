import React from 'react';
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import CharAvatar from '../cards/CharAvatar'; // Import CharAvatar
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

const Navbar = ({ onMenuToggle, isMenuOpen }) => {
    const { user } = useContext(UserContext); // Get user from context

    return (
        <header className='flex items-center justify-between bg-white p-4 border-b border-gray-200/50'>
            <div className="flex items-center gap-4">
                <button
                    className='block lg:hidden'
                    onClick={onMenuToggle}
                >
                    {isMenuOpen ? <HiOutlineX className="text-2xl" /> : <HiOutlineMenu className="text-2xl" />}
                </button>
                <h2 className='text-lg font-semibold text-gray-800'>
                    Expense Tracking Application
                </h2>
            </div>
            <div className='flex items-center gap-4'>
                <span>{user?.fullName}</span>
                <CharAvatar fullName={user?.fullName || ''} width="w-10" heigth="h-10" style="bg-primary text-white" />
            </div>
        </header>
    );
};

export default Navbar;