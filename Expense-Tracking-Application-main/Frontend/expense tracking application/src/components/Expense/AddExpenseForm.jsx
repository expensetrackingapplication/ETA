import React, { useState } from 'react';
import MyInput from '../../components/Inputs/MyInput';
import EmojiPickerPopup from '../EmojiPickerPopup';
import { toast } from 'react-toastify';

const AddExpenseForm = ({ onAddExpense }) => {
    const [expense, setExpense] = useState({
        category: "",
        amount: "",
        date: "",
        icon: "",
    });

    const today = new Date().toISOString().split('T')[0];

    const handleDateChange = (e) => {
        const selectedDate = e.target.value;
        if (new Date(selectedDate) > new Date()) {
            toast.error("You cannot select a future date.");
            return;
        }
        setExpense({ ...expense, date: selectedDate });
    };

    const handleChange = (key, value) => setExpense({ ...expense, [key]: value });

    return (
        <div>
            <EmojiPickerPopup
                icon={expense.icon}
                onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
            />
            <MyInput
                value={expense.category}
                onChange={({ target }) => handleChange("category", target.value)}
                label="Expense Category"
                placeholder="Food, Clothes, etc"
                type="text"
            />
            <MyInput
                value={expense.amount}
                onChange={({ target }) => handleChange("amount", target.value)}
                label="Amount"
                placeholder=""
                type="number"
            />
            <MyInput
                value={expense.date}
                onChange={handleDateChange}
                label="Date"
                type="date"
                max={today}
            />
            <div className='flex justify-end mt-6'>
                <button
                    type='button'
                    className='add-btn add-btn-fill'
                    onClick={() => onAddExpense(expense)}
                >
                    Add Expense
                </button>
            </div>
        </div>
    );
};

export default AddExpenseForm;