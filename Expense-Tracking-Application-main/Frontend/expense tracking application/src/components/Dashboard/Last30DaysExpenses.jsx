// --- REPLACE THE ENTIRE CONTENT of src/components/Dashboard/Last30DaysExpenses.jsx ---

import React from 'react';
import TransactionInfoCard from '../cards/TransactionInfoCard'; // Import the card component
import moment from 'moment'; // Import moment for date formatting

const Last30DaysExpenses = ({ data }) => {
    return (
        // The outer 'card' div and 'col-span-1' class remain unchanged to preserve your layout
        <div className='card col-span-1'>
            <div className='flex items-center justify-between'>
                <h5 className='text-lg'>Last 30 Days Expenses</h5>
            </div>
            
            {/* <<<--- THIS IS THE CHANGE --- >>> */}
            {/* The bar chart is replaced with a scrollable list of transactions */}
            <div className='mt-6 space-y-2 h-64 overflow-y-auto pr-2'>
                {data && data.length > 0 ? (
                    data.map((expense) => (
                        <TransactionInfoCard
                            key={expense._id}
                            title={expense.category}
                            icon={expense.icon}
                            date={moment(expense.date).format("Do MMM YY")} // Using a shorter date format
                            amount={expense.amount}
                            type="expense"
                            hideDeleteBtn={true} // Hide Edit/Delete buttons on this dashboard view
                        />
                    ))
                ) : (
                    // Display a helpful message if there are no expenses
                    <div className='flex items-center justify-center h-full'>
                        <p className='text-sm text-gray-500'>No expenses recorded in the last 30 days.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Last30DaysExpenses;  