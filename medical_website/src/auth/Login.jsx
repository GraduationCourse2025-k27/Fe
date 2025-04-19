import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import {
  emailRegex,
  nameRegex,
  phoneRegex,
} from "../validation/LoginValidation";

const Login = ({ showModal, handleClose }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [errorPassword, setErrorPassWord] = useState("");
  const [errorName, setErrorName] = useState("");
  const [errorPhone, setErrorPhone] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [size, setSize] = useState("large");

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
    if (!emailRegex.test(client.email.trim())) {
      setErrorEmail("Nhập sai định dạng email,email đúng : abc@gmail.com");
      return;
    }
    if (!phoneRegex.test(client.phone.trim())) {
      setErrorPhone(
        "Nhập sai định dạng số điện thoại , SĐT đúng : 0931234567 (10 số) và phải bắt đầu bằng 0 hoặc +84"
      );
      return;
    }
    if (!nameRegex.test(client.fullName.trim())) {
      setErrorName(
        "Nhập sai định dạng tên , định dạng tên đúng : Nguyễn Văn Kiều My(Không chứa kí tự số và không ít hơn 1 chữ)"
      );
      return;
    }
    if (isSignUp && client.password !== confirmPassword) {
      setErrorPassWord("Mật khẩu và xác nhận mật khẩu không khớp!");
      return;
    }
    handleClose();
    console.log("client", client);
  };
  setTimeout(() => {
    setErrorPassWord("");
    setErrorEmail("");
    setErrorName("");
    setErrorPhone("");
  }, 7000);

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
            {errorName && (
              <p style={{ color: "red", fontSize: "14px", marginTop: "-10px" }}>
                {errorName}
              </p>
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
            {errorEmail && (
              <p style={{ color: "red", fontSize: "14px", marginTop: "-10px" }}>
                {errorEmail}
              </p>
            )}

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
                {errorPhone && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "14px",
                      marginTop: "-10px",
                    }}
                  >
                    {errorPhone}
                  </p>
                )}
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
            {errorPassword && (
              <p style={{ color: "red", fontSize: "14px", marginTop: "-10px" }}>
                {errorPassword}
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
