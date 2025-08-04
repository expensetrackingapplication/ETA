import React, { useState, useEffect } from 'react';
import MyInput from '../Inputs/MyInput';
import EmojiPickerPopup from '../EmojiPickerPopup';
import { toast } from 'react-toastify';

const EditIncomeForm = ({ onUpdateIncome, initialData }) => {
    const [income, setIncome] = useState({
        source: "",
        amount: "",
        date: "",
        icon: "",
    });

    useEffect(() => {
        if (initialData) {
            setIncome({
                source: initialData.source || "",
                amount: initialData.amount || "",
                date: initialData.date ? new Date(initialData.date).toISOString().split('T')[0] : "",
                icon: initialData.icon || "",
            });
        }
    }, [initialData]);
    
    const today = new Date().toISOString().split('T')[0];

    const handleDateChange = (e) => {
        const selectedDate = e.target.value;
        if (new Date(selectedDate) > new Date()) {
            toast.error("You cannot select a future date.");
            return;
        }
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
                onChange={handleDateChange}
                label="Date"
                type="date"
                max={today}
            />
            <div className='flex justify-end mt-6'>
                <button
                    type='button'
                    className='add-btn add-btn-fill'
                    onClick={() => onUpdateIncome(income)}
                >
                    Update Income
                </button>
            </div>
        </div>
    );
};

export default EditIncomeForm;