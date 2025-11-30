// src/Pages/LandingPage.jsx
import { FaArrowTrendDown } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import Card from "../Components/Card";
import Button from "../Components/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="mt-28 h-105 flex gap-4 flex-col justify-center items-center">
      <motion.h1 className="text-3xl font-semibold text-center" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}>
        Find the <span className="text-blue-400">Best Deals</span> Powered by AI
      </motion.h1>

      <motion.h2 className="text-blue-400 font-medium text-center px-8 max-w-2xl" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}>
        Our AI finds the cheapest prices and matches products to your exact specifications. Laptops, phones, headphones—all in one place.
      </motion.h2>

      <motion.div className="flex gap-4 mt-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>
        <motion.div whileHover={{ scale: 1.03, boxShadow: "0px 8px 24px rgba(56,189,248,0.14)" }}>
          <Button title="Explore Deals" className="btn bg-blue-400 text-white rounded-lg" onClick={() => navigate("/home")} icon={<FaArrowRight />} />
        </motion.div>
      </motion.div>

      <div className="mt-8 px-6 md:px-20 flex flex-col md:flex-row gap-4 justify-center items-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} whileHover={{ y: -4 }}>
          <Card icon={<FaArrowTrendDown />} title="Best Prices" description="AI-powered price tracking finds you the lowest prices across the web." />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} whileHover={{ y: -4 }}>
          <Card icon={<FaStar />} title="Smart Matching" description="Tell us what you need, and we'll find the perfect tech for your requirements" />
        </motion.div>
      </div>
    </div>
  );
}
