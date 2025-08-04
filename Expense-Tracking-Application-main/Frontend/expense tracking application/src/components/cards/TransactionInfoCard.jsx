import React from 'react';
import { LuTrash, LuPencil } from 'react-icons/lu';

const TransactionInfoCard = ({
    title,
    icon,
    date,
    amount,
    type,
    onDelete,
    onEdit,
    // <<<--- THE FIX: Setting a default value for hideDeleteBtn --- >>>
    hideDeleteBtn = false, // Defaults to false, so buttons show unless explicitly hidden
}) => {
    const isUrl = typeof icon === 'string' && (icon.startsWith('http') || icon.startsWith('data:'));

    return (
        <div className='flex items-center justify-between p-3 rounded-lg bg-gray-100 mb-2'>
            <div className='flex items-center gap-3 overflow-hidden'>
                <div className='w-11 h-11 flex-shrink-0 flex items-center justify-center bg-gray-50 rounded-full text-xl'>
                    {isUrl ? <img src={icon} alt="" className='w-full h-full object-contain p-2' /> : <span>{icon || "💰"}</span>}
                </div>
                <div className='overflow-hidden'>
                    <p className='font-semibold truncate'>{title}</p>
                    <p className='text-xs'>{date}</p>
                </div>
            </div>
            <div className='flex items-center gap-3 flex-shrink-0'>
                <p className={`font-bold text-sm ${type === 'income' ? 'text-green-400' : 'text-red-500'}`}>
                    ₹{amount?.toLocaleString()}
                </p>
                {!hideDeleteBtn && (
                    <div className='flex items-center border-l border-slate-600 ml-2 pl-2'>
                        <button className='p-2 rounded-full text-gray-400 hover:bg-slate-700' onClick={onEdit} title="Edit">
                            <LuPencil className='h-4 w-4' />
                        </button>
                        <button className='p-2 rounded-full text-gray-400 hover:text-red-500 hover:bg-slate-700' onClick={onDelete} title="Delete">
                            <LuTrash className='h-4 w-4' />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TransactionInfoCard;