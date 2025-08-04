import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import IncomeOverview from '../../components/Income/IncomeOverview';
import axiosInstance from '../../utils/axiosinstance';
import { API_PATHS } from '../../utils/apiPaths';
import Modal from '../../components/Modal';
import AddIncomeForm from '../../components/Income/AddIncomeForm';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import IncomeList from '../../components/Income/IncomeList';
import DeleteAlert from '../../components/DeleteAlert';
import { useUserAuth } from '../../hooks/useUserAuth';
import EditIncomeForm from '../../components/Income/EditIncomeForm';

const Income = () => {
    useUserAuth();
    const [incomeData, setIncomeData] = useState([]);
    const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({ show: false, data: null });
    const [openEditModal, setOpenEditModal] = useState({ show: false, data: null });

    const fetchIncomeDetails = async () => {
        try {
            const response = await axiosInstance.get(API_PATHS.INCOME.GET_ALL_INCOME);
            if (response.data) setIncomeData(response.data);
        } catch (error) {
            console.log("Something went wrong fetching income.", error);
        }
    };

    const handleAddIncome = async (income) => {
        const { source, amount, date, icon } = income;
        if (!source.trim()) return toast.error("Source is required.");
        if (!amount || isNaN(amount) || Number(amount) <= 0) return toast.error("Amount must be a valid positive number.");
        if (new Date(date) > new Date()) return toast.error("Date cannot be in the future.");
        if (!date) return toast.error("Date is required.");
        try {
            await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, { source, amount, date, icon });
            setOpenAddIncomeModal(false);
            toast.success("Income added successfully");
            fetchIncomeDetails();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to add income.");
        }
    };
    
    const handleUpdateIncome = async (income) => {
        const { source, amount, date, icon } = income;
        const id = openEditModal.data._id;
        if (!source.trim()) return toast.error("Source is required.");
        if (!amount || isNaN(amount) || Number(amount) <= 0) return toast.error("Amount must be a positive number.");
        if (new Date(date) > new Date()) return toast.error("Date cannot be in the future.");
        if (!date) return toast.error("Date is required.");
        try {
            await axiosInstance.put(API_PATHS.INCOME.UPDATE_INCOME(id), { source, amount, date, icon });
            setOpenEditModal({ show: false, data: null });
            toast.success("Income updated successfully");
            fetchIncomeDetails();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update income.");
        }
    };

    const deleteIncome = async (id) => {
        try {
            await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));
            setOpenDeleteAlert({show: false, data: null});
            toast.success("Income details deleted successfully");
            fetchIncomeDetails();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete income.");
        }
    };

    // <<< --- THIS IS THE FIX for the download button --- >>>
    const handleDownloadIncomeDetails = async () => {
        try {
            toast.info("Preparing your download...");
            const response = await axiosInstance.get(
                API_PATHS.INCOME.DOWNLOAD_INCOME,
                { responseType: "blob" } // This tells axios to expect a file
            );
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "income_details.xlsx");
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error downloading income details", error);
            toast.error("Failed to download income details. Please try again.");
        }
    };

    useEffect(() => { fetchIncomeDetails(); }, []);

    return (
        <DashboardLayout activeMenu="Income">
            <div className='my-5 mx-auto'>
                <div className='grid grid-cols-1 gap-6'>
                    <IncomeOverview transactions={incomeData} onAddIncome={() => setOpenAddIncomeModal(true)} />
                    <IncomeList
                        transactions={incomeData}
                        onDelete={(id) => setOpenDeleteAlert({ show: true, data: id})}
                        onDownload={handleDownloadIncomeDetails}
                        onEdit={(income) => setOpenEditModal({ show: true, data: income })}
                    />
                </div>
            </div>
            <Modal isOpen={openAddIncomeModal} onClose={() => setOpenAddIncomeModal(false)} title="Add Income">
                <AddIncomeForm onAddIncome={handleAddIncome} />
            </Modal>
            <Modal isOpen={openDeleteAlert.show} onClose={() => setOpenDeleteAlert({show: false, data: null})} title="Delete Income">
                <DeleteAlert content="Are you sure you want to delete this income details ?" onDelete={() => deleteIncome(openDeleteAlert.data)} />
            </Modal>
            <Modal isOpen={openEditModal.show} onClose={() => setOpenEditModal({ show: false, data: null })} title="Edit Income">
                <EditIncomeForm
                    initialData={openEditModal.data}
                    onUpdateIncome={handleUpdateIncome}
                />
            </Modal>
        </DashboardLayout>
    );
};
export default Income;