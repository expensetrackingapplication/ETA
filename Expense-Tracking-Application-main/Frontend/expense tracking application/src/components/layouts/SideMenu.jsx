import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LuLayoutDashboard, LuTrendingUp, LuTrendingDown, LuLogOut, LuUser } from "react-icons/lu";
import { UserContext } from '../../context/UserContext';
import CharAvatar from '../cards/CharAvatar';
import LOGO from '../../assets/images/logo.jpg'

const SideMenu = ({ activeMenu, user }) => {
    const { updateUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        updateUser(null);
        navigate('/login');
    };

    const sidebarMenu = [
        { name: 'Dashboard', path: '/dashboard', icon: <LuLayoutDashboard /> },
        { name: 'Income', path: '/income', icon: <LuTrendingUp /> },
        { name: 'Expense', path: '/expense', icon: <LuTrendingDown /> },
        { name: 'Profile', path: '/profile', icon: <LuUser /> },
    ];

    return (
        // <<<--- THEME FIX: Using slate-800 to match your design --- >>>
        <aside className='w-64 bg-white p-6 flex flex-col justify-between h-full'>
            <div>
                {/* <<<--- NAME FIX: Using your app name --- >>> */}
                
                    <img 
                    src={LOGO} 
                    alt="ETA" 
                    className="mb-6 rounded-full w-20 h-20 mx-auto sm:w-16 sm:h-16 md:w-24 md:h-24" // Adjust size based on screen width
                />
                
                
                <nav className='flex flex-col gap-2'>
                    {sidebarMenu.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 p-3 rounded-lg text-sm font-medium transition-colors ${
                                isActive || activeMenu === item.name
                                    ? 'bg-primary text-white'
                                    : ""
                                }`
                            }
                        >
                            <span className='text-lg'>{item.icon}</span>
                            {item.name}
                        </NavLink>
                    ))}
                </nav>
            </div>
            <div className='flex flex-col gap-2'>
                 {/* <div className='flex items-center gap-3 p-3 border-t border-slate-700'>
                    <CharAvatar fullName={user?.fullName || ''} width="w-10" heigth="h-10" style="bg-primary text-white" />
                    <span className='text-sm font-medium text-gray-300 truncate'>{user?.fullName}</span>
                </div> */}
                <button onClick={handleLogout} className='flex items-center gap-3 p-3 rounded-lg text-sm font-medium text-gray-800 hover:bg-primary hover:text-white w-full text-left'>
                    <LuLogOut className='text-lg' />
                    Logout
                </button>
            </div>
        </aside>
    );
};

export default SideMenu;