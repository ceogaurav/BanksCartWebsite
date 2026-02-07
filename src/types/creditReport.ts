export interface DeepVueCreditReportResponse {
    code: number;
    timestamp: number;
    transaction_id: string;
    sub_code: string;
    message: string;
    data: {
        pan: string | null;
        mobile: string;
        name: string;
        credit_score: string;
        credit_report: {
            InquiryResponseHeader: {
                ClientID: string;
                CustRefField: string;
                ReportOrderNO: string;
                ProductCode: string[];
                SuccessCode: string;
                Date: string;
                Time: string;
            };
            InquiryRequestInfo: {
                InquiryPurpose: string;
                FirstName: string;
                DOB: string;
                IDDetails: {
                    IDType: string;
                    IDValue: string;
                }[];
            };
            CCRResponse: {
                Status: string;
                CIRReportDataLst: {
                    CIRReportData: {
                        IDAndContactInfo: {
                            PersonalInfo: {
                                Name: {
                                    FullName: string;
                                };
                                DateOfBirth: string;
                                Gender: string;
                            };
                            IdentityInfo: {
                                PANId: {
                                    IdNumber: string;
                                    ReportedDate: string;
                                }[];
                            };
                            AddressInfo: {
                                Address: string;
                                Postal: string;
                            }[];
                        };
                        RetailAccountDetails: {
                            AccountNumber: string;
                            Institution: string;
                            AccountType: string;
                            Balance: string;
                            SanctionAmount: string;
                            DateOpened: string;
                            AccountStatus: string;
                        }[];
                        RetailAccountsSummary: {
                            NoOfAccounts: string;
                            NoOfActiveAccounts: string;
                            TotalBalanceAmount: string;
                            TotalSanctionAmount: string;
                        };
                        ScoreDetails: {
                            Type: string;
                            Version: string;
                            Value: string;
                        }[];
                        Enquiries: {
                            Institution: string;
                            Date: string;
                            RequestPurpose: string;
                        }[];
                    };
                }[];
            };
        };
    };
}
