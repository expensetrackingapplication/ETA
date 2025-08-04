import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { useUserAuth } from '../../hooks/useUserAuth';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosinstance';
import { API_PATHS } from '../../utils/apiPaths';
import InfoCard from '../../components/cards/InfoCard';
import { addThousandsSeperator } from '../../utils/helper';
import FinanceOverview from '../../components/Dashboard/FinanceOverview';
// We are replacing Last30DaysExpenses, so it's no longer needed here.
// import Last30DaysExpenses from '../../components/Dashboard/Last30DaysExpenses'; 
import { LuHandCoins, LuGavel } from "react-icons/lu";
import { IoMdCard } from "react-icons/io";
import RecentIncomeWithChart from '../../components/Dashboard/RecentIncomeWithChart';
import DeleteProfile from '../../components/Dashboard/DeleteProfile';
import RecentExpenseWithChart from '../../components/Dashboard/RecentExpenseWithChart';
import RecentIncome from '../../components/Dashboard/RecentIncome';
import RecentTransactions from '../../components/Dashboard/RecentTransactions';

// <<<--- FIX 1: Import the component we are swapping in --- >>>
import ExpenseTransactions from '../../components/Dashboard/ExpenseTransactions';

import Last60DaysIncomeChart from '../../components/Dashboard/Last60DaysIncomeChart';


const Home = () => {
    useUserAuth();
    const navigate = useNavigate();
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchDashboardData = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);
            if (response.data) {
                setDashboardData(response.data);
            }
        } catch (error) {
            console.log("Something went wrong. Please try again", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    return (
        <DashboardLayout activeMenu="Dashboard">
            <div className='my-5 mx-auto'>
                {/* Row 1: Top Info Cards (NO CHANGE) */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    <InfoCard icons={<IoMdCard />} label="Total Balance" value={addThousandsSeperator(dashboardData?.totalBalance || 0)} color="bg-primary" />
                    <InfoCard icons={<LuGavel />} label="Total Income" value={addThousandsSeperator(dashboardData?.totalIncome || 0)} color="bg-orange-500" />
                    <InfoCard icons={<LuHandCoins />} label="Total Expense" value={`${addThousandsSeperator(dashboardData?.totalExpenses || 0)}`} color="bg-red-500" />
                </div>

                {/* Row 2: Recent Transactions + Financial Overview Pie Chart (NO CHANGE) */}
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6'>
                    <RecentTransactions
                        transactions={dashboardData?.recentTransactions || []}
                        onSeeMore={() => navigate("/transactions")}
                    />
                    <FinanceOverview
                        totalBalance={dashboardData?.totalBalance || 0}
                        totalIncome={dashboardData?.totalIncome || 0}
                        totalExpense={dashboardData?.totalExpenses || 0}
                    />
                </div>
                
                {/* Row 3: Income Overview + Income Pie Chart (Last 60 Days) (NO CHANGE)
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6'>
                    <RecentIncome
                        transactions={dashboardData?.recentIncome || []}
                        onSeeMore={() => navigate("/income")}
                    />
                    <RecentIncomeWithChart
                        data={dashboardData?.last60DaysIncome?.transactions || []}
                        totalIncome={dashboardData?.last60DaysIncome?.total || 0}
                    />
                </div> */}
                  {/* <<<--- FIX 2: Replacing the Income Pie Chart with the new Bar Chart --- >>> */}
                {/* Row 3: Income List + NEW Income Bar Chart */}
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                    <RecentIncome
                        transactions={dashboardData?.recentIncome || []}
                        onSeeMore={() => navigate("/income")}
                    />
                    <Last60DaysIncomeChart
                        data={dashboardData?.last60DaysIncome?.transactions || []}
                    />
                </div>

                {/* <<<--- FIX 2: THIS IS THE ONLY CHANGE TO YOUR LAYOUT --- >>> */}
                {/* Row 4: The Last30DaysExpenses bar chart is REPLACED with the ExpenseTransactions list */}
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6'>
                    <ExpenseTransactions
                        transactions={dashboardData?.recentExpenses || []}
                        onSeeMore={() => navigate("/expense")}
                    />
                    <RecentExpenseWithChart
                        data={dashboardData?.last30DaysExpenses?.transactions || []}
                        totalExpense={dashboardData?.last30DaysExpenses?.total || 0}
                    />
                </div>

               
            </div>
        </DashboardLayout>
    );
};

export default Home;