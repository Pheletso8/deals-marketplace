import { FaArrowTrendDown } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaShield } from "react-icons/fa6";
import Card from "../Components/Card";
import Button from "../Components/button";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="mt-28 min-h-screen flex gap-4 flex-col justify-center items-center">
      <h1 className="text-3xl font-semibold text-center">
        Find the <span className="text-teal-300">Best Deals</span> Powered by AI
      </h1>
      <h2 className="text-teal-400 font-medium text-center px-8">
        Our AI finds the cheapest prices and matches products to your exact specifications. Laptops, phones, headphones—all in one place.
      </h2>

      <div className="flex gap-4 mt-4">
        <Button
          title="Get Started"
          className="bg-teal-300 rounded-lg hover:scale-104 transition ease-in-out delay-100 text-white"
          icon={<FaArrowRight />}
          onClick={() => navigate("/register")}
        />
        <Button
          title="Explore Deals"
          className="btn rounded-lg hover:scale-104 transition ease-in-out delay-100 text-black/60"
          onClick={() => navigate("/home")}
        />
      </div>

      {/* Optional Sign In Link */}
      <p className="mt-2 text-gray-500">
        Already have an account?{" "}
        <span
          onClick={() => navigate("/signin")}
          className="text-teal-400 font-semibold cursor-pointer hover:underline"
        >
          Sign In
        </span>
      </p>

      {/* Feature Cards */}
      <div className="mt-8 flex flex-col md:flex-row gap-4 justify-center items-center">
        <Card
          icon={<FaArrowTrendDown />}
          title="Best Prices"
          description="AI-powered price tracking finds you the lowest prices across the web."
        />
        <Card
          icon={<FaStar />}
          title="Smart Matching"
          description="Tell us what you need, and we'll find the perfect tech for your requirements"
        />
        <Card
          icon={<FaShield />}
          title="Verified Deals"
          description="Every deal is verified for authenticity and availability."
        />
      </div>
    </div>
  );
}
