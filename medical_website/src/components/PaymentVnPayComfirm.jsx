import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SuccessMessage from "./SetSuccess";
import * as PaymentService from "../service/Payment/PaymentApi";

export default function PaymentVnPayComfirm() {
  const { appointmentId } = useParams();
  const [vnPayResponse, setVnPayResponse] = useState(null);
  const [vnPayBankTranNo, setVnPayBankTranNo] = useState(null);
  const [vnPayTransactionNo, setVnPayTransactionNo] = useState(null);
  const [vnPayTransactionStatus, setVnPayTransactionStatus] = useState(null);
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const responseCode = urlParams.get("vnp_ResponseCode");
    const bankTranNo = urlParams.get("vnp_BankTranNo");
    const transactionNo = urlParams.get("vnp_TransactionNo");
    const transactionStatus = urlParams.get("vnp_TransactionStatus");
    console.log("vnp_ResponseCode:", responseCode);
    console.log("vnp_BankTranNo:", bankTranNo);
    console.log("vnp_TransactionNo:", transactionNo);
    console.log("vnp_TransactionStatus:", transactionStatus);
    setVnPayResponse(responseCode);
    setVnPayBankTranNo(bankTranNo);
    setVnPayTransactionNo(transactionNo);
    setVnPayTransactionStatus(transactionStatus);
  }, []);

  useEffect(() => {
    if (
      appointmentId &&
      vnPayResponse !== null &&
      vnPayBankTranNo !== null &&
      vnPayTransactionNo !== null &&
      vnPayTransactionStatus !== null
    ) {
      integrationPaymentVnPay(
        appointmentId,
        vnPayResponse,
        vnPayBankTranNo,
        vnPayTransactionNo,
        vnPayTransactionStatus
      );
    }
  }, [
    appointmentId,
    vnPayResponse,
    vnPayBankTranNo,
    vnPayTransactionNo,
    vnPayTransactionStatus,
  ]);

  const integrationPaymentVnPay = async (
    appointmentId,
    vnPayResponse,
    vnPayBankTranNo,
    vnPayTransactionNo,
    vnPayTransactionStatus
  ) => {
    try {
      const result = await PaymentService.updatePaymentVnPay(
        appointmentId,
        vnPayResponse,
        vnPayBankTranNo,
        vnPayTransactionNo,
        vnPayTransactionStatus
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  };
  if (!appointmentId) return null;
  return (
    <div className="p-4 mt-5 pt-5 sm:p-8 max-w-4xl mx-auto">
      {vnPayTransactionStatus === "00" ? (
        <SuccessMessage
          message="Thanh toán thành công"
          note="Kiểm tra email để biết thông tin lịch khám"
          autoClose={true}
        />
      ) : (
        <div className="text-center text-red-600">
          <h2 className="text-2xl font-bold mb-4">Thanh toán thất bại</h2>
          <p>Vui lòng thử lại hoặc liên hệ hỗ trợ.</p>
        </div>
      )}
    </div>
  );
}
