// src/components/common/ApplyButton.tsx
import React from 'react';
import Button from './Button'; // Import YOUR Button component from its location

// Re-declare or import the exact ButtonProps interface from your Button component
// This is crucial to ensure type compatibility.
// If your Button.tsx exports ButtonProps, you can import it like:
// import { ButtonProps as BaseButtonProps } from './Button';
// Then extend it: interface ApplyButtonProps extends BaseButtonProps { ... }
// For now, I'll copy the relevant parts of your ButtonProps:
interface BaseButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ElementType; // Use React.ElementType for LucideIcon or other component
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void; // Explicitly define onClick type
  type?: 'button' | 'submit' | 'reset';
}

// Define props for ApplyButton, extending the base ButtonProps
interface ApplyButtonProps extends BaseButtonProps {
  loanType: string; // The type of loan/product to pass to the modal
  openApplyModal?: (loanType?: string) => void; // The function to open the modal
  // The 'children' prop is already included via BaseButtonProps
}

const ApplyButton: React.FC<ApplyButtonProps> = ({
  loanType,
  openApplyModal,
  onClick, // Destructure onClick to allow external onClick if needed, but prioritize internal
  children, // Destructure children explicitly
  disabled, // Destructure disabled explicitly to manage it
  loading, // Destructure loading explicitly to manage it
  ...rest // Capture all other props (variant, size, icon, className, etc.)
}) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // If an external onClick is provided, call it first
    if (onClick) {
      onClick(event);
    }
    // Then, open the modal
    if (openApplyModal) {
      openApplyModal(loanType);
    }
  };

  // The button should be disabled if explicitly disabled, or if loading, or if openApplyModal is not provided
  const isDisabled = disabled || loading || !openApplyModal;

  return (
    <Button
      onClick={handleClick}
      disabled={isDisabled} // Use the combined disabled state
      loading={loading} // Pass loading state to your Button component
      {...rest} // Pass through all other props (variant, size, icon, className, etc.)
    >
      {children}
    </Button>
  );
};

export default ApplyButton;
