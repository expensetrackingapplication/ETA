import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { API_PATHS } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axiosinstance';
import { toast } from 'react-toastify';
import ExpenseOverview from '../../components/Expense/ExpenseOverview';
import { useUserAuth } from '../../hooks/useUserAuth';
import Modal from '../../components/Modal';
import DeleteAlert from '../../components/DeleteAlert';
import AddExpenseForm from '../../components/Expense/AddExpenseForm';
import ExpenseList from '../../components/Expense/ExpenseList';
import EditExpenseForm from '../../components/Expense/EditExpenseForm';

const Expense = () => {
    useUserAuth();
    const [expenseData, setExpenseData] = useState([]);
    const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({ show: false, data: null });
    const [openEditModal, setOpenEditModal] = useState({ show: false, data: null });

    const fetchExpenseDetails = async () => {
        try {
            const response = await axiosInstance.get(API_PATHS.EXPENSE.GET_ALL_EXPENSE);
            if (response.data) setExpenseData(response.data);
        } catch (error) {
            console.log("Something went wrong fetching expenses.", error);
        }
    };

    const handleAddExpense = async (expense) => {
        const { category, amount, date, icon } = expense;
        if (!category.trim()) return toast.error("Category is required.");
        if (!amount || isNaN(amount) || Number(amount) <= 0) return toast.error("Amount should be a valid number greater than 0.");
        if (new Date(date) > new Date()) return toast.error("Date cannot be in the future.");
        if (!date) return toast.error("Date is required.");
        try {
            await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, { category, amount, date, icon });
            setOpenAddExpenseModal(false);
            toast.success("Expense added successfully");
            fetchExpenseDetails();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to add expense.");
        }
    };

    const handleUpdateExpense = async (expense) => {
        const { category, amount, date, icon } = expense;
        const id = openEditModal.data._id;
        if (!category.trim()) return toast.error("Category is required.");
        if (!amount || isNaN(amount) || Number(amount) <= 0) return toast.error("Amount must be a positive number.");
        if (new Date(date) > new Date()) return toast.error("Date cannot be in the future.");
        if (!date) return toast.error("Date is required.");
        try {
            await axiosInstance.put(API_PATHS.EXPENSE.UPDATE_EXPENSE(id), { category, amount, date, icon });
            setOpenEditModal({ show: false, data: null });
            toast.success("Expense updated successfully");
            fetchExpenseDetails();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update expense.");
        }
    };

    const deleteExpense = async (id) => {
        try {
            await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));
            setOpenDeleteAlert({show: false, data: null});
            toast.success("Expense details deleted successfully");
            fetchExpenseDetails();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete expense.");
        }
    };

    // <<< --- THIS IS THE FIX for the download button --- >>>
    const handleDownloadExpenseDetails = async () => {
        try {
            toast.info("Preparing your download...");
            const response = await axiosInstance.get(
                API_PATHS.EXPENSE.DOWNLOAD_EXPENSE,
                { responseType: "blob" } // This tells axios to expect a file
            );
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "expense_details.xlsx");
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error downloading expense details", error);
            toast.error("Failed to download expense details. Please try again.");
        }
    };

    useEffect(() => { fetchExpenseDetails(); }, []);

    return (
        <DashboardLayout activeMenu="Expense">
            <div className='my-5 mx-auto'>
                <div className='grid grid-cols-1 gap-6'>
                    <ExpenseOverview transactions={expenseData} onAddExpense={() => setOpenAddExpenseModal(true)} />
                    <ExpenseList
                        transactions={expenseData}
                        onDelete={(id) => setOpenDeleteAlert({ show: true, data: id})}
                        onDownload={handleDownloadExpenseDetails}
                        onEdit={(expense) => setOpenEditModal({ show: true, data: expense })}
                    />
                </div>
                <Modal isOpen={openAddExpenseModal} onClose={() => setOpenAddExpenseModal(false)} title="Add Expense">
                    <AddExpenseForm onAddExpense={handleAddExpense} />
                </Modal>
                <Modal isOpen={openDeleteAlert.show} onClose={() => setOpenDeleteAlert({show: false, data: null})} title="Delete Expense">
                    <DeleteAlert content="Are you sure you want to delete this expense details ?" onDelete={() => deleteExpense(openDeleteAlert.data)} />
                </Modal>
                <Modal isOpen={openEditModal.show} onClose={() => setOpenEditModal({ show: false, data: null })} title="Edit Expense">
                    <EditExpenseForm
                        initialData={openEditModal.data}
                        onUpdateExpense={handleUpdateExpense}
                    />
                </Modal>
            </div>
        </DashboardLayout>
    );
};
export default Expense;