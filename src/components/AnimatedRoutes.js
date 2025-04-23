import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const pageVariants = {
    initial: (direction) => ({
        opacity: 0,
        x: direction === "left" ? -100 : 100, 
    }),
    in: {
        opacity: 1,
        x: 0,
    },
    out: (direction) => ({
        opacity: 0,
        x: direction === "left" ? -100 : 100, 
    }),
};

const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5,
};

const AnimatedRoutes = ({ children }) => {
    const location = useLocation();
    const pathLeftAnimate = ['/action', '/reminder', '/statistics', '/profile'];
    const direction = !pathLeftAnimate.includes(location.pathname) ? 'left' : 'right'; 

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                {React.Children.map(children, (child) => (
                    <Route
                        path={child.props.path}
                        element={
                            <motion.div
                                initial="initial"
                                animate="in"
                                exit="out"
                                variants={pageVariants}
                                transition={pageTransition}
                                custom={direction} 
                            >
                                {child.props.element}
                            </motion.div>
                        }
                    />
                ))}
            </Routes>
        </AnimatePresence>
    );
};

export default AnimatedRoutes;
