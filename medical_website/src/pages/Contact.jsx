import React from "react";
import ConfirmAppoiment from "../components/ConfirmAppointment";
import FeedbackList from "../components/FeedbackList";
import SetSuccess from "../components/SetSuccess";

const Contact = () => {
  return (
    <div className="mt-5 pt-5">
      <ConfirmAppoiment />
      <SetSuccess />
      <FeedbackList/>
    </div>
  );
};

export default Contact;
