import React, { useEffect, useState } from 'react';
import CustomPieChart from '../charts/CustomPieChart';

const COLORS = ["#F44336", "#FF6900", "#FFC300", "#4CAF50", "#2196F3"];

const RecentExpenseWithChart = ({ data, totalExpense }) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const prepareChartData = () => {
            const dataArr = data?.map((item) => ({
                name: item?.category,
                amount: item?.amount,
            }));
            setChartData(dataArr);
        };
        prepareChartData();
    }, [data]);

    return (
        <div className='card'>
            <div className='flex items-center justify-between'>
                <h5 className='text-lg'>Last 30 Days Expenses</h5>
            </div>
            <CustomPieChart
                data={chartData}
                label="Total Expenses"
                totalAmount={`₹${totalExpense?.toLocaleString()}`}
                showTextAnchor
                colors={COLORS}
            />
        </div>
    );
};

export default RecentExpenseWithChart;