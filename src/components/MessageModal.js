import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const NotificationModal = ({ message, onClose, success, onDone }) => {
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
            className={`fixed top-5 right-5 w-72 ${success ? "bg-green-100 text-green-400" : "bg-red-100 text-red-400"} px-4 py-2 rounded-lg shadow-lg z-[50]`}
        >
            <div className="mb-1">{message}</div>

            <motion.div
                initial={{ width: "100%" }}
                animate={{ width: 0 }}
                transition={{ duration: 4, ease: "linear" }}
                className={`${success ? "bg-green-400" : "bg-red-400"} h-1 rounded-full`}
                onAnimationComplete={() => {
                    console.log("done");
                    if (onDone) onDone(); // Gọi hàm khi hiệu ứng chạy xong
                }}
            />
        </motion.div>
    );
};

export default NotificationModal;
