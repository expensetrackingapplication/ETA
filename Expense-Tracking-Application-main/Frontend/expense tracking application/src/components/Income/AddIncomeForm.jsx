import React, { useState } from 'react';
import MyInput from '../../components/Inputs/MyInput';
import EmojiPickerPopup from '../EmojiPickerPopup';
import { toast } from 'react-toastify'; // Make sure toast is imported

const AddIncomeForm = ({ onAddIncome }) => {
    const [income, setIncome] = useState({
        source: "",
        amount: "",
        date: "",
        icon: "",
    });

    const today = new Date().toISOString().split('T')[0];

    const handleDateChange = (e) => {
        const selectedDate = e.target.value;
        // <<<--- THIS IS THE FIX --- >>>
        // Check if the selected date is in the future
        if (new Date(selectedDate) > new Date()) {
            toast.error("You cannot select a future date.");
            return; // Stop the function here, preventing the state update
        }
        // If the date is valid, update the state
        setIncome({ ...income, date: selectedDate });
    };

    const handleChange = (key, value) => setIncome({ ...income, [key]: value });

    return (
        <div>
            <EmojiPickerPopup
                icon={income.icon}
                onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
            />
            <MyInput
                value={income.source}
                onChange={({ target }) => handleChange("source", target.value)}
                label="Income Source"
                placeholder="Freelance, Salary, etc"
                type="text"
            />
            <MyInput
                value={income.amount}
                onChange={({ target }) => handleChange("amount", target.value)}
                label="Amount"
                placeholder=""
                type="number"
            />
            <MyInput
                value={income.date}
                // Use the new, intelligent date handler
                onChange={handleDateChange}
                label="Date"
                type="date"
                max={today}
            />
            <div className='flex justify-end mt-6'>
                <button
                    type='button'
                    className='add-btn add-btn-fill'
                    onClick={() => onAddIncome(income)}
                >
                    Add Income
                </button>
            </div>
        </div>
    );
};

export default AddIncomeForm;