import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

const Login = ({ showModal, handleClose }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [client, setClient] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });

  const toggleForm = () => {
    setIsSignUp((prev) => !prev);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (isSignUp && client.password !== confirmPassword) {
      setError("Mật khẩu và xác nhận mật khẩu không khớp!");
      return;
    }
    setError(""); // clear error nếu không có lỗi
    console.log("data user:", client);
    handleClose();
    // Thêm logic gọi API tại đây nếu muốn
  };

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setClient((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="body-modal">
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{isSignUp ? "Đăng ký" : "Đăng nhập"}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleSubmitForm}>
            {isSignUp && (
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Họ và tên</Form.Label>
                <Form.Control
                  type="text"
                  name="fullName"
                  value={client.fullName}
                  onChange={(e) => handleChange(e)}
                  required
                />
              </Form.Group>
            )}

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="abc@example.com"
                name="email"
                value={client.email}
                onChange={(e) => handleChange(e)}
                required
              />
            </Form.Group>

            {isSignUp && (
              <>
                <Form.Group className="mb-3" controlId="formAddress">
                  <Form.Label>Địa chỉ</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={client.address}
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPhone">
                  <Form.Label>Điện thoại</Form.Label>
                  <Form.Control
                    type="text"
                    name="phone"
                    value={client.phone}
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </Form.Group>
              </>
            )}

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Mật khẩu</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={client.password}
                onChange={(e) => handleChange(e)}
                required
              />
            </Form.Group>

            {isSignUp && (
              <Form.Group className="mb-3" controlId="formConfirmPassword">
                <Form.Label>Nhập lại mật khẩu</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </Form.Group>
            )}
            {error && (
              <p style={{ color: "red", fontSize: "14px", marginTop: "-10px" }}>
                {error}
              </p>
            )}
            <div>
              {isSignUp ? (
                <>
                  <Button variant="primary" type="submit">
                    Đăng kí
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="primary" type="submit">
                    Đăng Nhập
                  </Button>
                </>
              )}
            </div>
          </Form>
        </Modal.Body>

        <Modal.Footer className="d-flex justify-content-between align-items-center">
          <div>
            {isSignUp ? "Đã có tài khoản?" : "Chưa có tài khoản?"}{" "}
            <Button
              variant="link"
              className="p-0"
              onClick={toggleForm}
              style={{ fontSize: "14px" }}
            >
              {isSignUp ? "Đăng nhập" : "Đăng ký"}
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Login;
