import React from "react";

function ConfirmModal({
                          isOpen,
                          title = "Confirm action",
                          message = "Are you sure?",
                          confirmText = "Delete",
                          cancelText = "Cancel",
                          onConfirm,
                          onClose
                      }) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-card confirm-modal-card">
                <div className="modal-header">
                    <h2>{title}</h2>
                    <button className="modal-close-btn" onClick={onClose} type="button">
                        ×
                    </button>
                </div>

                <div className="confirm-modal-body">
                    <p>{message}</p>
                </div>

                <div className="modal-actions">
                    <button type="button" className="secondary-btn" onClick={onClose}>
                        {cancelText}
                    </button>
                    <button type="button" className="danger-btn" onClick={onConfirm}>
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmModal;