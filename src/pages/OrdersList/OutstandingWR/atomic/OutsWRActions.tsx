import React, { useState } from "react";
import {   ActionViewTransaction,
    ApproveTransaction,
    ViewTransactionReceipt,
    PostingTransaction,
    CreditReturn,
    Reprint } from "./WRActions";
import ReusableDialog from "../../atomic/ReusableDialog";


const TransactionActions: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogContent, setDialogContent] = useState<React.ReactNode>(null);

  const handleActionClick = (actionLabel: string) => {
    setDialogTitle(actionLabel);
    switch (actionLabel) {
      case "Details":
        setDialogContent(
          <div>
            <p>This is the details view for the transaction.</p>
            {/* Add dynamic content or components here */}
          </div>
        );
        break;
      case "Approve":
        setDialogContent(
          <div>
            <p>Do you want to approve this transaction?</p>
            {/* You can add form elements or confirmation buttons */}
          </div>
        );
        break;
      case "Delivery Slip":
        setDialogContent(
          <div>
            <p>This is the delivery slip for the transaction.</p>
            {/* Dynamic receipt or slip content */}
          </div>
        );
        break;
      case "Posting":
        setDialogContent(
          <div>
            <p>Are you sure you want to post this transaction?</p>
            {/* Add posting confirmation */}
          </div>
        );
        break;
      case "Credit Return":
        setDialogContent(
          <div>
            <p>Provide details for the credit return.</p>
            {/* Add form for credit return details */}
          </div>
        );
        break;
      case "Reprint":
        setDialogContent(
          <div>
            <p>Reprint the transaction details.</p>
            {/* Add reprint content */}
          </div>
        );
        break;
      default:
        setDialogContent(<div>No content available</div>);
    }
    setIsDialogOpen(true); // Open the dialog when an action is clicked
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setDialogContent(null); // Reset content when closing the dialog
  };

  return (
    <div>
      <button onClick={() => handleActionClick(ActionViewTransaction.label)}>
        {ActionViewTransaction.label}
      </button>
      <button onClick={() => handleActionClick(ApproveTransaction.label)}>
        {ApproveTransaction.label}
      </button>
      <button onClick={() => handleActionClick(ViewTransactionReceipt.label)}>
        {ViewTransactionReceipt.label}
      </button>
      <button onClick={() => handleActionClick(PostingTransaction.label)}>
        {PostingTransaction.label}
      </button>
      <button onClick={() => handleActionClick(CreditReturn.label)}>
        {CreditReturn.label}
      </button>
      <button onClick={() => handleActionClick(Reprint.label)}>
        {Reprint.label}
      </button>

      {/* Reusable Dialog */}
      <ReusableDialog
        isOpen={isDialogOpen}
        onClose={handleDialogClose}
        title={dialogTitle}
      >
        {dialogContent}
      </ReusableDialog>
    </div>
  );
};

export default TransactionActions;
