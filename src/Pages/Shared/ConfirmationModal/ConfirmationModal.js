import React from 'react';

const ConfirmationModal = ({ title, message, modalBody, closeModal, successButtonName, successAction }) => {
    return (
        <div>



            <input type="checkbox" id="confirmation-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{title}</h3>
                    <p className="py-4">{message}</p>
                    <div className="modal-action">
                        <button onClick={closeModal} className='btn btn-outline'>Close</button>
                        <label onClick={() => successAction(modalBody)} htmlFor="confirmation-modal" className="btn">{successButtonName}</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;