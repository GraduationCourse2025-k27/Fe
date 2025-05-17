import React from "react";
import * as MedicaService from "../service/admin/MedicalTypeService";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { toast, ToastContainer } from "react-toastify";

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
        toast.success("Xóa thành công");
        await resrtDataList();
      } else {
        toast.warning("Thất bại khi xóa !");
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
        <ToastContainer position="top-right" autoClose={3000} />
      </Modal>
    </div>
  );
}
