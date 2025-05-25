import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import * as DoctorManagement from "../service/admin/DoctorManagement";
import { toast, ToastContainer } from "react-toastify";

export default function DoctorDeleteModal({
  show,
  handleClose,
  id,
  resertDataList,
}) {
  const intialIdSpecility = -1;
  const intialNameDoctor = "";

  const handleDeleteDoctorById = async () => {
    try {
      const result = await DoctorManagement.deleteDoctorById(id);
      if (result) {
        toast.success("Xóa thành công ");
        await resertDataList(intialIdSpecility, intialNameDoctor);
      } else {
        toast.warning("Thất bại khi xóa !");
      }
      handleClose();
    } catch (error) {
      toast.error("Lỗi khi loading api");
      console.log(error);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Xóa Bác Sĩ</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có muốn xóa bác sĩ không</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleDeleteDoctorById}>
            Xóa Bác Sĩ
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
