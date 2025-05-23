import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import * as NewService from "../service/admin/NewsMangement";
import { toast, ToastContainer } from "react-toastify";

export default function NewsDeletedModal({
  show,
  handleClose,
  id,
  resertDataList,
}) {
  const [idSupport, setIdSupport] = useState(3);
  const handleDeletedNewsById = async () => {
    try {
      const result = await NewService.deleteNewsById(id);
      console.log(result);

      if (result) {
        toast.success("Xóa thành công ");
        await resertDataList(idSupport);
      } else {
        toast.warning("Thất bại khi xóa !");
      }
      handleClose();
    } catch (error) {
      toast.error("Lỗi khi loading api");
      console.error(error);
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Xóa Bác Sĩ</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có muốn xóa bài báo này không ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleDeletedNewsById}>
            Xóa bài báo
          </Button>
        </Modal.Footer>
        <ToastContainer position="top-right" autoClose={1000} />
      </Modal>
    </>
  );
}
