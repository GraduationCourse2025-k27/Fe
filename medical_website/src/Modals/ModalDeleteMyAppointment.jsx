import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import * as AppointmentService from "../service/Appointment/AppointmentApi";

export default function ModalDeleteMyAppointment({
  show,
  handleClose,
  dataDeleteAppointment,
  handleCheckStatusAppointment,
}) {
  const [success, setSuccess] = useState("");

  console.log("success:", success);

  const handleCancelStatusAppointment = async (id) => {
    if (show) {
      try {
        if (!id) {
          setSuccess("ID lịch hẹn không hợp lệ");
          return;
        }
        const result = await AppointmentService.cancelAppointment(id);
        if (result === 200) {
          setSuccess("Hủy thành công");
          await handleCheckStatusAppointment();
        } else if (result === 204) {
          setSuccess("Bạn đã quá thời gian hủy");
        } else {
          setSuccess("Hủy thất bại, vui lòng thử lại");
        }
      } catch (error) {
        console.error("Lỗi khi hủy lịch hẹn:", error);
        setSuccess("Đã có lỗi xảy ra, vui lòng thử lại");
      } finally {
        handleClose();
      }
    }
  };
  return (
    <div>
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Bạn có muốn hủy lịch khám không ? </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Nếu bạn hủy bạn sẽ được hoàn 50% số tiền gốc và bạn chỉ có thể hủy
            trong vòng 45 phút từ khi đặt
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Đóng
            </Button>
            <Button
              variant="btn btn-danger"
              onClick={() =>
                handleCancelStatusAppointment(dataDeleteAppointment)
              }
            >
              Hủy lịch khám
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </div>
  );
}
