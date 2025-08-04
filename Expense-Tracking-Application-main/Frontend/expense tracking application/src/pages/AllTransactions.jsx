import React, { useEffect, useState } from 'react';
import DashboardLayout from '../components/layouts/DashboardLayout';
import axiosInstance from '../utils/axiosinstance';
import { API_PATHS } from '../utils/apiPaths';
import TransactionInfoCard from '../components/cards/TransactionInfoCard';
import moment from 'moment';

const AllTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTransactions = async () => {
            setLoading(true);
            try {
                const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_ALL_TRANSACTIONS);
                setTransactions(response.data);
            } catch (error) {
                console.error("Failed to fetch all transactions", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTransactions();
    }, []);

    return (
        <DashboardLayout activeMenu="Dashboard">
            <div className="card bg-white p-6 rounded-2xl">
                <h3 className="text-xl font-bold mb-4 text-gray-800">All Recent Transactions</h3>
                {loading ? (
                    <p>Loading transactions...</p>
                ) : (
                    <div className="space-y-3">
                        {transactions.length > 0 ? (
                            transactions.map((item) => (
                                <TransactionInfoCard
                                    key={item._id}
                                    title={item.type === 'income' ? item.source : item.category}
                                    icon={item.icon}
                                    date={moment(item.date).format("Do MMMM YYYY")}
                                    amount={item.amount}
                                    type={item.type}
                                    hideDeleteBtn={true} // Read-only view
                                />
                            ))
                        ) : (
                            <p className="text-gray-500">No transactions have been recorded yet.</p>
                        )}
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default AllTransactions;