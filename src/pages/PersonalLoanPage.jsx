import React from "react";
import Breadcrumb from "../components/Breadcrumb";
import HeroSection from "../components/loans/HeroSection";
import EmiCalculator from "../components/loans/EmiCalculator";
import LoanOffersGrid from "../components/loans/LoanOffersGrid";
import WhyChooseUs from "../components/loans/WhyChooseUs";
import AuthorReviewerSection from "../components/loans/AuthorReviewerSection";
import EligibilityTable from "../components/loans/EligibilityTable";
import DocumentsTable from "../components/loans/DocumentsTable";
import FeesChargesTable from "../components/loans/FeesChargesTable";
import ApplicationSteps from "../components/loans/ApplicationSteps";
import LoanTypesBenefits from "../components/loans/LoanTypesBenefits";
import TrustIndicators from "../components/loans/TrustIndicators";
import PreApprovedOffersTable from "../components/loans/PreApprovedOffersTable";
import InfoSections from "../components/loans/InfoSections";
import FaqSection from "../components/loans/FaqSection";


function PersonalLoanPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white/60 to-blue-50/80">
      <Breadcrumb path={["Home", "Personal Loan"]} />
      <HeroSection />
      <div className="container mx-auto px-4 md:px-12">
        <EmiCalculator />
        <LoanOffersGrid />
        <WhyChooseUs />
        <AuthorReviewerSection />
        <EligibilityTable />
        <DocumentsTable />
        <FeesChargesTable />
        <ApplicationSteps />
        <LoanTypesBenefits />
        <TrustIndicators />
        <PreApprovedOffersTable />
        <InfoSections />
        <FaqSection />
      </div>
    </div>
  );
}

export default PersonalLoanPage;
