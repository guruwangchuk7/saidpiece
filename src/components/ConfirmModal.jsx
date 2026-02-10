import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { FaTimes, FaExclamationTriangle } from 'react-icons/fa';

/**
 * A reusable modal component for confirming actions.
 * Wraps content in a portal and handles animations.
 * 
 * @param {boolean} isOpen - Whether the modal is visible.
 * @param {function} onClose - Function to call when closing the modal (cancel).
 * @param {function} onConfirm - Function to call when confirming the action.
 * @param {string} title - The title of the modal.
 * @param {string} message - The message body of the modal.
 * @param {string} confirmText - Text for the confirm button.
 * @param {string} cancelText - Text for the cancel button.
 * @param {boolean} isDangerous - If true, the confirm button will be red.
 * @param {boolean} isLoading - If true, the confirm button will show a loading state.
 */
const ConfirmModal = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = "Confirm",
    cancelText = "Cancel",
    isDangerous = false,
    isLoading = false
}) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    // Close on escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen && !isLoading) {
                onClose();
            }
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose, isLoading]);

    if (!mounted) return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={!isLoading ? onClose : undefined}
                    >
                        {/* Modal Content */}
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                            className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header */}
                            <div className="px-6 py-5 border-b border-zinc-100 flex justify-between items-center">
                                <h3 className="text-lg font-bold text-zinc-900 tracking-tight flex items-center gap-2">
                                    {isDangerous && <FaExclamationTriangle className="text-amber-500" />}
                                    {title}
                                </h3>
                                <button
                                    onClick={onClose}
                                    disabled={isLoading}
                                    className="text-zinc-400 hover:text-zinc-600 transition-colors disabled:opacity-50"
                                >
                                    <FaTimes />
                                </button>
                            </div>

                            {/* Body */}
                            <div className="px-6 py-6">
                                <p className="text-zinc-600 leading-relaxed text-sm">
                                    {message}
                                </p>
                            </div>

                            {/* Footer */}
                            <div className="px-6 py-4 bg-zinc-50 border-t border-zinc-100 flex justify-end gap-3">
                                <button
                                    onClick={onClose}
                                    disabled={isLoading}
                                    className="px-4 py-2 rounded-lg text-sm font-medium text-zinc-600 hover:bg-zinc-200 transition-colors disabled:opacity-50"
                                >
                                    {cancelText}
                                </button>
                                <button
                                    onClick={onConfirm}
                                    disabled={isLoading}
                                    className={`
                                        px-4 py-2 rounded-lg text-sm font-bold text-white shadow-sm transition-all flex items-center gap-2
                                        ${isDangerous
                                            ? 'bg-red-600 hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
                                            : 'bg-zinc-900 hover:bg-zinc-800 focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2'
                                        }
                                        disabled:opacity-70 disabled:cursor-not-allowed
                                    `}
                                >
                                    {isLoading && (
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    )}
                                    {isLoading ? 'Processing...' : confirmText}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>,
        document.body
    );
};

export default ConfirmModal;
