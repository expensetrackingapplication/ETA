import React, { useState, useContext } from 'react';
import Navbar from './Navbar';
import SideMenu from './SideMenu';
import { UserContext } from '../../context/UserContext';

const DashboardLayout = ({ children, activeMenu }) => {
    const { user } = useContext(UserContext);
    const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

    const toggleSideMenu = () => {
        setIsSideMenuOpen(!isSideMenuOpen);
    };

    if (!user) {
        return <div className="h-screen w-full flex items-center justify-center bg-slate-950 text-white">Loading Application...</div>;
    }

    return (
        // <<<--- THEME FIX: Using a dark background to match your screenshots --- >>>
        <div className="flex h-screen bg-gray-100">
            {/* --- DESKTOP SIDEBAR --- */}
            <div className="hidden lg:block lg:flex-shrink-0">
                <SideMenu activeMenu={activeMenu} user={user} />
            </div>

            {/* Main content area */}
            <div className="flex-1 flex flex-col w-full overflow-hidden">
                <Navbar onMenuToggle={toggleSideMenu} isMenuOpen={isSideMenuOpen} />
                
                {/* --- MOBILE SIDEBAR (Conditional) --- */}
                {isSideMenuOpen && (
                    // This overlay allows the user to click next to the menu to close it
                    <div className="fixed inset-0 z-40 lg:hidden" onClick={toggleSideMenu}>
                        <div className="fixed top-0 left-0 h-full z-50">
                             <SideMenu activeMenu={activeMenu} user={user} />
                        </div>
                    </div>
                )}

                <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;