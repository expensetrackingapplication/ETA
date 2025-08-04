import React from 'react';
import { LuDownload } from 'react-icons/lu';
import TransactionInfoCard from '../cards/TransactionInfoCard';
import moment from 'moment';

const IncomeList = ({ transactions, onDelete, onDownload, onEdit }) => {
  return (
    <div className='card'>
      <div className='flex items-center justify-between'>
        <h5 className='text-lg font-semibold'>Income Sources</h5>
        <button className='card-btn' onClick={onDownload}>
          <LuDownload className='text-base' /> Download
        </button>
      </div>
      {/* <<<--- RESPONSIVE FIX: One column on mobile, two on medium screens and up --- >>> */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-x-4 mt-2'>
        {transactions?.map((income) => (
          <TransactionInfoCard
            key={income._id}
            title={income.source}
            icon={income.icon}
            date={moment(income.date).format("Do MMM YYYY")}
            amount={income.amount}
            type="income"
            onDelete={() => onDelete(income._id)}
            onEdit={() => onEdit(income)}
          />
        ))}
      </div>
    </div>
  );
};

export default IncomeList;