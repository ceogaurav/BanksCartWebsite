import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import LoanApplicationModal from '../components/common/LoanApplicationModal';
import EligibilityCheckModal from '../components/common/EligibilityCheckModal';
import PartnerApplicationModal from '../components/modals/PartnerApplicationModal';
import CibilCheckButton from '../components/common/CibilCheckButton';
import CibilScoreCheckModal from '../components/modals/CibilScoreCheckModal';
import ChristmasThemeWrapper from '../components/common/ChristmasThemeWrapper';

export interface MainLayoutProps {
  children: React.ReactNode;
  openApplyModal: (loanType?: string) => void;
  openEligibilityModal: (loanType?: string) => void;
  openPartnerModal: () => void;
  openCibilModal: () => void;
  isApplyModalOpen: boolean;
  closeApplyModal: () => void;
  currentLoanType: string;
  isEligibilityModalOpen: boolean;
  closeEligibilityModal: () => void;
  currentEligibilityLoanType: string;
  isPartnerModalOpen: boolean;
  closePartnerModal: () => void;
  isCibilModalOpen: boolean;
  closeCibilModal: () => void;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  openApplyModal,
  openEligibilityModal,
  openPartnerModal,
  openCibilModal,
  isApplyModalOpen,
  closeApplyModal,
  currentLoanType,
  isEligibilityModalOpen,
  closeEligibilityModal,
  currentEligibilityLoanType,
  isPartnerModalOpen,
  closePartnerModal,
  isCibilModalOpen,
  closeCibilModal,
}) => {
  const location = useLocation();
  const isEmbed = location.pathname.startsWith('/embed');
  const isAdmin = location.pathname.startsWith('/admin');

  if (isEmbed) {
    return <main className="min-h-screen bg-transparent">{children}</main>;
  }

  if (isAdmin) {
    return <main className="min-h-screen">{children}</main>;
  }

  return (
    <ChristmasThemeWrapper>
      <div className="flex flex-col min-h-screen font-inter bg-transparent">
        {/* Header component, visible on all pages, passing modal open functions */}
        <div className="print:hidden">
          <Header
            openApplyModal={openApplyModal}
            openEligibilityModal={openEligibilityModal}
            openPartnerModal={openPartnerModal}
          />
        </div>
        <main className="flex-grow">
          {children}
        </main>
        {/* Footer component, visible on all pages */}
        <div className="print:hidden">
          <Footer openEligibilityModal={openEligibilityModal} />
        </div>

        {/* Modals */}
        <LoanApplicationModal
          isOpen={isApplyModalOpen}
          onClose={closeApplyModal}
          initialLoanType={currentLoanType}
        />
        <EligibilityCheckModal
          isOpen={isEligibilityModalOpen}
          onClose={closeEligibilityModal}
          initialLoanType={currentEligibilityLoanType}
        />
        <PartnerApplicationModal
          isOpen={isPartnerModalOpen}
          onClose={closePartnerModal}
        />
        {/* CIBIL Score Check Modal */}
        <CibilScoreCheckModal
          isOpen={isCibilModalOpen}
          onClose={closeCibilModal}
        />

        {/* CIBIL Check Sliding Button - Appears on all pages */}
        <div className="print:hidden">
          <CibilCheckButton openCibilModal={openCibilModal} />
        </div>
      </div>
    </ChristmasThemeWrapper>
  );
};

export default MainLayout;
