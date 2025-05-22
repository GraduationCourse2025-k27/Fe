import React from "react";
import * as SpecialityAdminService from "../service/admin/SpecialityAdminService";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function SpecialModalDelete({
  show,
  handleClose,
  id,
  resertDataList,
}) {
  const name = "";

  const handleDeleteById = async () => {
    try {
      const result = await SpecialityAdminService.deleteSpeciality(id);
      if (result) {
        toast.success("Xóa thành công");
        await resertDataList(name);
      } else {
        toast.warning("Thất bại khi xóa!");
      }
      handleClose();
    } catch (error) {
      toast.error("Lỗi khi loading api");
      console.log(error);
    }
  };
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Xóa Chuyên khoa</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có muốn xóa Chuyên khoa này không ? </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleDeleteById}>
            Xóa Chuyên Khoa
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position="top-right" autoClose={1000} />
    </div>
  );
}
