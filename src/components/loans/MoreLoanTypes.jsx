import React from "react";
import { motion } from "framer-motion";
import { Bike, Car, Truck, Tractor, Wrench, Fuel, BatteryCharging, Sun, Gem } from "lucide-react";

const moreLoans = [
  { title: "Two-Wheeler Loan", icon: Bike, desc: "Get your dream bike with easy financing and quick disbursal." },
  { title: "Gold Loan", icon: Gem, desc: "Turn your gold into cash instantly with secure and transparent loans." },
  { title: "Used Car Loan", icon: Car, desc: "Finance your pre-owned car with flexible repayment options." },
  { title: "Commercial Vehicle Loan", icon: Truck, desc: "Expand your business fleet with new or used commercial vehicle loans." },
  { title: "Tractor & Farm Equipment Loan", icon: Tractor, desc: "Empowering farmers with easy loans for tractors and farm equipment." },
  { title: "Construction Equipment Loan", icon: Wrench, desc: "Finance for bulldozers, cranes, and more to boost your construction business." },
  { title: "Fuel Finance", icon: Fuel, desc: "Manage your business fuel needs with dedicated finance solutions." },
  { title: "EV Loans", icon: BatteryCharging, desc: "Finance for electric two, three, and four wheelers, and charging stations." },
  { title: "Solar Panel Finance", icon: Sun, desc: "Go green with easy loans for solar panel installations." },
];

const MoreLoanTypes = () => (
  <section className="mt-12 max-w-5xl mx-auto">
    <h2 className="text-2xl font-bold mb-6 text-center">Explore More Loan Types</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {moreLoans.map((loan, i) => (
        <motion.div
          key={loan.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.1 }}
          viewport={{ once: true }}
          className="bg-white/70 rounded-xl shadow-lg p-6 flex flex-col items-center hover:bg-primary-50 transition-all"
        >
          <div className="bg-gradient-to-tr from-primary-600 to-secondary-600 p-4 rounded-full mb-3 shadow">
            <loan.icon className="h-8 w-8 text-white" />
          </div>
          <div className="font-semibold text-gray-900 mb-1 text-center">{loan.title}</div>
          <div className="text-gray-700 text-center text-sm">{loan.desc}</div>
        </motion.div>
      ))}
    </div>
  </section>
);

export default MoreLoanTypes;
