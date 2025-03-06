import { WRActionType } from "./OutsWRActionType";

const ActionViewTransaction: WRActionType = {
  label: "Details",
  handler: () => {},
};

const ApproveTransaction: WRActionType = {
  label: "Approve",
  handler: () => {},
};
const ViewTransactionReceipt: WRActionType = {
  label: "Delivery Slip",
  handler: () => {},
};

const PostingTransaction: WRActionType = {
  label: "Posting",
  handler: () => {},
};

const CreditReturn: WRActionType = {
    label: "Credit Return",
    handler: () => {},
  };

  const Reprint: WRActionType = {
    label: "Reprint",
    handler: () => {},
  };

export {
  ActionViewTransaction,
  ApproveTransaction,
  ViewTransactionReceipt,
  PostingTransaction,
  CreditReturn,
  Reprint,

};
