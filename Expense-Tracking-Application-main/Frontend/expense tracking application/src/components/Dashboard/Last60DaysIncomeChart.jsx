// --- CREATE THIS NEW FILE: src/components/Dashboard/Last60DaysIncomeChart.jsx ---

import React, { useEffect, useState } from 'react';
import CustomBarChart from '../charts/CustomBarChart'; // We will use your existing Bar Chart component
import { prepareIncomeBarChartData } from '../../utils/helper'; // We will use your existing helper

const Last60DaysIncomeChart = ({ data }) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        if (data) {
            const result = prepareIncomeBarChartData(data);
            setChartData(result);
        }
    }, [data]);

    return (
        <div className='card h-full flex flex-col'>
            <div className='flex items-center justify-between'>
                <h5 className='text-lg text-white'>Last 60 Days Income</h5>
            </div>
            <div className="flex-grow mt-6">
                {data && data.length > 0 ? (
                    <CustomBarChart data={chartData} />
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-sm text-gray-500">No income data for the last 60 days.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Last60DaysIncomeChart;