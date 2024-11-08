import React from 'react';

interface ApprovalButtonProps {
  status: string;
  onApprove: () => void;
  onCancel: () => void;
}

const ApprovalButton: React.FC<ApprovalButtonProps> = ({ status, onApprove, onCancel }) => {
  return (
    <div className='flex justify-end items-end'>
      {status === 'Verified' ? (
        <button onClick={onCancel} className='px-5 py-2 rounded-md bg-red-600 text-md font-semibold text-white'>
          Cancel
        </button>
      ) : (
        <button onClick={onApprove} className='px-5 py-2 rounded-md bg-blue-600 text-md font-semibold text-white'>
          Aprove
        </button>
      )}
    </div>
  );
};

export default ApprovalButton;