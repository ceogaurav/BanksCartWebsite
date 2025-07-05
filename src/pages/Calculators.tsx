import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Calculator,
  PiggyBank,
  Receipt,
  TrendingUp,
  UserCheck,
  Percent,
  Home,
  CreditCard,
  Wallet,
  TrendingDown,
  DollarSign,
  BarChart2,
  BookOpen,
  Car
} from 'lucide-react';
import EMICalculator from '../components/calculators/EMICalculator';
import FDCalculator from '../components/calculators/FDCalculator';
import TaxCalculator from '../components/calculators/TaxCalculator';

const Calculators: React.FC = () => {
  const [activeCalculator, setActiveCalculator] = useState('emi');
  const [activeExtraCalculator, setActiveExtraCalculator] = useState('sip');


  // --- Calculator Categories ---
  type CalculatorTab = { id: string; name: string; icon: React.ElementType; description: string };
  type CalculatorCategory = { title: string; description?: string; calculators: CalculatorTab[] };

  const calculatorCategories: CalculatorCategory[] = [
    {
      title: 'Loan Calculators',
      description: 'Tools to help you plan and manage all types of loans.',
      calculators: [
        { id: 'mortgage', name: 'Mortgage Calculator', icon: Home, description: 'Calculate monthly payments, interest rates, loan term, and total cost for home loans.' },
        { id: 'carloan', name: 'Auto Loan Calculator', icon: Car, description: 'Estimate monthly payments for car loans.' },
        { id: 'studentloan', name: 'Student Loan Calculator', icon: BookOpen, description: 'Calculate monthly payments, interest accruals, and total debt for student loans.' },
        { id: 'personalloan', name: 'Personal Loan Calculator', icon: Wallet, description: 'Estimate the payment schedule for personal loans.' },
        { id: 'paydayloan', name: 'Payday Loan Calculator', icon: CreditCard, description: 'Calculate the payday loan cost including fees and interest.' },
      ]
    },
    {
      title: 'Investment Calculators',
      description: 'Project your investment growth and plan for the future.',
      calculators: [
        { id: 'compound', name: 'Compound Interest Calculator', icon: Percent, description: 'Calculate the amount of interest earned over time on an investment, considering compounded growth.' },
        { id: 'investmentgrowth', name: 'Investment Growth Calculator', icon: TrendingUp, description: 'Project the growth of investments over time at a fixed rate of return.' },
        { id: 'retirement', name: 'Retirement Savings Calculator', icon: UserCheck, description: 'Estimate how much you need to save monthly or annually to reach your retirement goal.' },
        { id: 'rothvstrad', name: 'Roth IRA vs. Traditional IRA Calculator', icon: BarChart2, description: 'Compare potential outcomes between Roth and Traditional IRAs.' },
        { id: 'stock', name: 'Stock Investment Calculator', icon: DollarSign, description: 'Estimate returns based on stock price, dividends, and the amount invested.' },
      ]
    },
    {
      title: 'Tax Calculators',
      description: 'Estimate your tax liabilities and plan your finances.',
      calculators: [
        { id: 'incometax', name: 'Income Tax Calculator', icon: Receipt, description: 'Estimate income tax liabilities based on income, deductions, exemptions, and filing status.' },
        { id: 'capitalgains', name: 'Capital Gains Tax Calculator', icon: TrendingUp, description: 'Calculate taxes owed on profits from the sale of investments or assets.' },
        { id: 'salestax', name: 'Sales Tax Calculator', icon: PiggyBank, description: 'Calculate the final price of a product including the applicable sales tax.' },
        { id: 'payrolltax', name: 'Payroll Tax Calculator', icon: Wallet, description: 'Estimate deductions for taxes from your paycheck based on various factors.' },
      ]
    },
    {
      title: 'Business & Corporate Calculators',
      description: 'Business tools for profitability, cash flow, and asset management.',
      calculators: [
        { id: 'breakeven', name: 'Break-even Calculator', icon: BarChart2, description: 'Calculate the sales required to cover fixed and variable costs.' },
        { id: 'npv', name: 'Net Present Value (NPV) Calculator', icon: TrendingUp, description: 'Assess the profitability of an investment or project over time.' },
        { id: 'irr', name: 'Internal Rate of Return (IRR) Calculator', icon: Percent, description: 'Calculate the profitability of potential investments over time.' },
        { id: 'cashflow', name: 'Cash Flow Calculator', icon: DollarSign, description: 'Estimate cash inflows and outflows for businesses or investments.' },
        { id: 'depreciation', name: 'Depreciation Calculator', icon: TrendingDown, description: 'Estimate the depreciation of assets over time.' },
      ]
    },
    {
      title: 'Budgeting Calculators',
      description: 'Manage your personal or business budget and expenses.',
      calculators: [
        { id: 'budget', name: 'Budget Calculator', icon: Wallet, description: 'Create and manage personal or business budgets.' },
        { id: 'expense', name: 'Expense Calculator', icon: CreditCard, description: 'Track your monthly expenses and categorize them.' },
        { id: 'debtpayoff', name: 'Debt Payoff Calculator', icon: PiggyBank, description: 'Determine how long it will take to pay off debt.' },
      ]
    },
    {
      title: 'Savings Calculators',
      description: 'Plan and track your savings for any goal.',
      calculators: [
        { id: 'savingsgoal', name: 'Savings Goal Calculator', icon: PiggyBank, description: 'Set goals for how much to save over a set period.' },
        { id: 'emergencyfund', name: 'Emergency Fund Calculator', icon: Wallet, description: 'Estimate how much you need to save for an emergency fund.' },
        { id: 'collegesavings', name: 'College Savings Calculator', icon: BookOpen, description: 'Calculate how much money you need to save for college.' },
      ]
    },
    {
      title: 'Currency Conversion Calculators',
      description: 'Convert and compare currencies with up-to-date rates.',
      calculators: [
        { id: 'currency', name: 'Currency Converter', icon: DollarSign, description: 'Convert one currency to another using the current exchange rate.' },
        { id: 'forex', name: 'Foreign Exchange Rate Calculator', icon: TrendingUp, description: 'Provides current foreign exchange rates for international money transfers.' },
      ]
    },
    {
      title: 'Credit Card Calculators',
      description: 'Manage and optimize your credit card usage.',
      calculators: [
        { id: 'creditcardpayoff', name: 'Credit Card Payoff Calculator', icon: CreditCard, description: 'Determine how long it will take to pay off a credit card.' },
        { id: 'creditcardinterest', name: 'Credit Card Interest Calculator', icon: Percent, description: 'Calculate how much interest you’ll pay on outstanding credit card balances.' },
        { id: 'balancetransfer', name: 'Balance Transfer Calculator', icon: BarChart2, description: 'Determine how much you can save by transferring your credit card debt.' },
      ]
    },
    {
      title: 'Real Estate Calculators',
      description: 'Make informed decisions about real estate and property.',
      calculators: [
        { id: 'homeafford', name: 'Home Affordability Calculator', icon: Home, description: 'Estimate how much house you can afford.' },
        { id: 'rentvsbuy', name: 'Rent vs. Buy Calculator', icon: BarChart2, description: 'Compare the costs of renting versus buying a home.' },
        { id: 'propertytax', name: 'Property Tax Calculator', icon: Receipt, description: 'Estimate property taxes for a specific location.' },
        { id: 'caprate', name: 'Capitalization Rate Calculator', icon: TrendingUp, description: 'Calculate the return on investment for rental properties.' },
      ]
    },
    {
      title: 'Other Financial Calculators',
      description: 'Other essential financial tools for your needs.',
      calculators: [
        { id: 'inflation', name: 'Inflation Calculator', icon: TrendingDown, description: 'Calculate the effect of inflation on purchasing power.' },
        { id: 'amortization', name: 'Loan Amortization Calculator', icon: BarChart2, description: 'Show how loan payments are split between principal and interest.' },
        { id: 'annuity', name: 'Annuity Calculator', icon: PiggyBank, description: 'Estimate the value of annuities.' },
        { id: 'pension', name: 'Pension Calculator', icon: UserCheck, description: 'Estimate pension payouts based on salary, age, and retirement age.' },
        { id: 'socialsecurity', name: 'Social Security Calculator', icon: Receipt, description: 'Estimate future Social Security benefits.' },
      ]
    },
  ];



  // Maintain a single state for all active tabs by category
  const [activeTabs, setActiveTabs] = useState<{ [category: string]: string }>(
    () => Object.fromEntries(calculatorCategories.map(cat => [cat.title, cat.calculators[0].id]))
  );

  const handleTabChange = (categoryTitle: string, tabId: string) => {
    setActiveTabs(prev => ({ ...prev, [categoryTitle]: tabId }));
  };

  const TabBar = ({ tabs, active, onTabClick }: {
    tabs: CalculatorTab[];
    active: string;
    onTabClick: (id: string) => void;
  }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = active === tab.id;
        // Map tab.id to page route (add more as you create more pages)
        let pageRoute = '';
        switch (tab.id) {
          case 'mortgage':
            pageRoute = '/MortgageCalculatorPage';
            break;
          // Add more cases for other calculators as you create their pages
          default:
            pageRoute = '';
        }
        const cardContent = (
          <div
            className={`group relative flex flex-col items-start px-6 py-5 rounded-2xl text-left border transition-all duration-200 shadow-md focus:outline-none h-36 bg-white
              ${isActive
                ? 'ring-2 ring-primary-500 border-primary-600 shadow-lg scale-105 z-10'
                : 'border-gray-200 hover:bg-primary-50 hover:shadow-lg hover:scale-105'}
            `}
            style={{ minWidth: 0 }}
          >
            <div className={`flex items-center mb-2 ${isActive ? 'text-primary-700' : 'text-primary-600'}`}>
              <Icon className={`h-7 w-7 mr-3 ${isActive ? 'text-primary-700' : 'text-primary-600'}`} />
              <span className="font-semibold text-lg truncate">{tab.name}</span>
            </div>
            <div className="text-xs text-gray-500 group-hover:text-primary-700 group-hover:font-medium transition-colors duration-200 line-clamp-3">
              {tab.description}
            </div>
            {isActive && (
              <span className="absolute left-4 right-4 -bottom-2 h-1 rounded-b bg-primary-600 animate-fadeIn" />
            )}
          </div>
        );
        return pageRoute ? (
          <Link to={pageRoute} key={tab.id} style={{ textDecoration: 'none', width: '100%' }}>
            {cardContent}
          </Link>
        ) : (
          <button
            key={tab.id}
            onClick={() => onTabClick(tab.id)}
            style={{ width: '100%' }}
          >
            {cardContent}
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Financial Calculators
          </h1>
          <p className="text-xl text-gray-600">
            Make informed financial decisions with our calculators
          </p>
        </div>

        {/* Categorized Financial Calculators */}
        <div className="space-y-16">
          {calculatorCategories.map((category) => {
            const active = activeTabs[category.title];
            const selectedCalc = category.calculators.find(c => c.id === active);
            return (
              <section key={category.title} className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">{category.title}</h2>
                {category.description && (
                  <p className="text-gray-500 mb-6 text-base">{category.description}</p>
                )}
                <TabBar tabs={category.calculators} active={active} onTabClick={tabId => handleTabChange(category.title, tabId)} />
                <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow mt-6 min-h-[56px] flex items-center">
                  {selectedCalc ? (
                    <div className="flex items-center gap-4">
                      <selectedCalc.icon className="h-8 w-8 text-primary-600" />
                      <div>
                        <div className="font-semibold text-lg text-gray-900 mb-1">{selectedCalc.name}</div>
                        <div className="text-gray-600 text-sm">{selectedCalc.description}</div>
                        <div className="text-primary-500 text-xs mt-2 font-medium">Calculator coming soon...</div>
                      </div>
                    </div>
                  ) : null}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Calculators;