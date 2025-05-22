import React from "react";
import * as MedicaService from "../service/admin/MedicalTypeService";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function ServiceDeleteModal({
  show,
  handleClose,
  id,
  resrtDataList,
  service,
}) {
  const handleDeleteServiceById = async () => {
    try {
      const result = await MedicaService.deleteMedicalServiceById(id);
      if (result) {
        await resrtDataList();
      } else {
      }
    } catch (error) {
      toast.error("Lỗi khi loading api");
      console.log(error);
    } finally {
      handleClose();
    }
  };
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Xóa Dịch vụ y tế</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có muốn xóa Dịch vụ y tế {service?.nameService}{" "}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="danger" onClick={handleDeleteServiceById}>
            Xóa
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
