import React from "react";
import { motion } from "framer-motion";
import { Home, User, Briefcase, Bike, Car, Truck, Tractor, Wrench, Fuel, CreditCard, BatteryCharging, Sun, FileText, HelpCircle, Gem } from "lucide-react";

const products = [
  { title: "Personal Loan", icon: User, link: "/loans/personal" },
  { title: "Two-Wheeler Loan", icon: Bike, link: "#" },
  { title: "Gold Loan", icon: Gem, link: "#" },
  { title: "Used Car Loan", icon: Car, link: "#" },
  { title: "Business Loan", icon: Briefcase, link: "/loans/business" },
  { title: "Commercial Goods Vehicle Loan", icon: Truck, link: "#" },
  { title: "Passenger Vehicle Loan", icon: Car, link: "#" },
  { title: "Tractor & Farm Equipment Loan", icon: Tractor, link: "#" },
  { title: "Construction Equipment Loan", icon: Wrench, link: "#" },
  { title: "Fuel Finance", icon: Fuel, link: "#" },
  { title: "Tyre Finance", icon: FileText, link: "#" },
  { title: "Tax Finance", icon: FileText, link: "#" },
  { title: "Toll Finance", icon: FileText, link: "#" },
  { title: "Repair Loan", icon: Wrench, link: "#" },
  { title: "EV Two-Wheeler Loan", icon: BatteryCharging, link: "#" },
  { title: "EV Four-Wheeler Loan", icon: BatteryCharging, link: "#" },
  { title: "EV Charging Station Finance", icon: BatteryCharging, link: "#" },
  { title: "Solar Panel Finance", icon: Sun, link: "#" },
];

const LoanProductsGrid = () => (
  <section className="mt-12">
    <h2 className="text-2xl font-bold mb-6 text-center">All Loan Products</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((prod, i) => (
        <motion.a
          href={prod.link}
          key={prod.title}
          whileHover={{ scale: 1.05, boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.18)" }}
          whileTap={{ scale: 0.98 }}
          className="flex flex-col items-center bg-white/60 backdrop-blur rounded-xl shadow-lg p-6 transition-all cursor-pointer group hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <div className="bg-gradient-to-tr from-primary-600 to-secondary-600 p-4 rounded-full mb-3 shadow">
            <prod.icon className="h-8 w-8 text-white" />
          </div>
          <span className="font-semibold text-gray-900 group-hover:text-primary-700 text-center">{prod.title}</span>
        </motion.a>
      ))}
    </div>
  </section>
);

export default LoanProductsGrid;
