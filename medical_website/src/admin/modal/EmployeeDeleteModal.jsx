import React from "react";
import { toast, ToastContainer } from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import * as EmployeeManagement from "../service/admin/EmployeeManagement";

export default function EmployeeDeleteModal({
  show,
  handleClose,
  id,
  resertDataList,
}) {
  const initialName = "";

  const handleDeleteEmployeeById = async () => {
    try {
      const result = await EmployeeManagement.deletedEmployeeId(id);
      if (result) {
        toast.success("Xóa thành công");
        await resertDataList(initialName);
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
          <Modal.Title>Xóa Nhân Viên</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có muốn xóa Nhân Viên này không ? </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="danger" onClick={handleDeleteEmployeeById}>
            Xóa Nhân viên
          </Button>
        </Modal.Footer>
        <ToastContainer position="top-right" autoClose={1000} />
      </Modal>
    </>
  );
}
