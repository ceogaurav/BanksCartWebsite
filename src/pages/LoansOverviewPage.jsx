import React from "react";
import LoanCard from "../components/loans/LoanCard";
import { Home, User, Briefcase, Car, Bike, GraduationCap } from "lucide-react";

const loanTypes = [
  {
    title: "Home Loan",
    description: "Get the best rates for your dream home. Flexible EMIs, fast approval, and expert support.",
    icon: Home,
    to: "/loans/home",
  },
  {
    title: "Personal Loan",
    description: "Quick personal loans for your needs. Minimal documentation, instant disbursal, and low interest.",
    icon: User,
    to: "/loans/personal",
  },
  {
    title: "Business Loan",
    description: "Empower your business with tailored loans. High limits, flexible tenure, and easy processing.",
    icon: Briefcase,
    to: "/loans/business",
  },
  {
    title: "Car Loan",
    description: "Finance your new car with attractive interest rates and flexible repayment options.",
    icon: Car,
    to: "/loans/car",
  },
  {
    title: "Used Car Loan",
    description: "Get funding for pre-owned cars with quick processing and competitive interest rates.",
    icon: Car,
    to: "/loans/used-car",
  },
  {
    title: "Two Wheeler Loan",
    description: "Hit the road on your new bike with our easy two-wheeler loan solutions.",
    icon: Bike,
    to: "/loans/two-wheeler",
  },
  {
    title: "Education Loan",
    description: "Invest in your future with education loans for studies in India and abroad.",
    icon: GraduationCap,
    to: "/loans/education",
  },
];

const LoansOverviewPage = () => (
  <div className="min-h-screen bg-gradient-to-br from-white/60 to-blue-50/80 py-12 px-4 md:px-12">
    <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center drop-shadow-lg">All Loans Overview</h1>
    <div className="flex flex-wrap gap-8 justify-center items-stretch">
      {loanTypes.map((loan) => (
        <LoanCard key={loan.title} {...loan} />
      ))}
    </div>
  </div>
);

export default LoansOverviewPage;
