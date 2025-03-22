import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const NotificationModal = ({ message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 4000);

        return () => clearTimeout(timer);
    }, [message]);

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-5 right-5 bg-green-100 text-green-400 px-4 py-2 rounded-lg shadow-lg"
        >
            {message}
        </motion.div>
    );
};

export default NotificationModal;
