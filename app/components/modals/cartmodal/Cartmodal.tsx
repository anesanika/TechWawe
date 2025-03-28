"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../../redux/modalSlice";
import { RootState } from "../../../redux/store";
import { motion } from "motion/react";

const Modal = () => {
  const isOpen = useSelector((state: RootState) => state.modal.isOpen);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => dispatch(closeModal()), 700);
      return () => clearTimeout(timer);
    }
  }, [isOpen, dispatch]);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed left-1/2 -translate-x-1/2 top-10  flex items-center justify-center  px-4 z-50"
    >
      <div className="backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border border-white/20 dark:border-gray-700/30 shadow-xl rounded-xl p-6 w-80 text-center">
        <p className="text-lg font-semibold text-gray-900 dark:text-white">
          ✅ Product added to cart!
        </p>
        <button
          onClick={() => dispatch(closeModal())}
          className="mt-4 px-5 py-2.5 rounded-full bg-blue-500 text-white text-sm font-medium transition-all duration-300 hover:bg-blue-600 active:scale-95"
        >
          Close
        </button>
      </div>
    </motion.div>
  );
};

export default Modal;
