import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as AppointmentService from "../service/Appointment/AppointmentApi";

export default function ModalDeleteMyAppointment({
  show,
  handleClose,
  dataDeleteAppointment,
  handleCheckStatusAppointment,
}) {
  const handleCancelStatusAppointment = async () => {
    if (show) {
      try {
        const { id, status } = dataDeleteAppointment || {};
        if (!id) {
          toast.warn("ID lịch hẹn không hợp lệ");
          return;
        }

        const result = await AppointmentService.cancelAppointment(id);

        if (result === 200) {
          if (status === "PENDING") {
            toast.success("Hủy lịch khám thành công.");
          } else if (status === "CONFIRMED") {
            toast.success("Hủy lịch khám thành công. Nhân viên sẽ liên hệ và hoàn tiền cho bạn.");
          } else {
            toast.success("Hủy lịch khám thành công.");
          }

          await handleCheckStatusAppointment();
        } else if (result === 204) {
          toast.info("Bạn đã quá thời gian để hủy lịch.");
        } else {
          toast.error("Hủy thất bại, vui lòng thử lại.");
        }
      } catch (error) {
        console.error("Lỗi khi hủy lịch hẹn:", error);
        toast.error("Đã có lỗi xảy ra, vui lòng thử lại.");
      } finally {
        handleClose();
      }
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận hủy lịch khám</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Nếu bạn hủy, bạn sẽ được hoàn 50% số tiền gốc và chỉ có thể hủy trong vòng 45 phút kể từ lúc đặt lịch. <br />
          Bạn có chắc chắn muốn tiếp tục không?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button
            variant="danger"
            onClick={handleCancelStatusAppointment}
          >
            Xác nhận hủy
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}
