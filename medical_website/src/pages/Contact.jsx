import React from "react";
import ConfirmAppoiment from "../components/ConfirmAppointment";
import FeedbackList from "../components/FeedbackList";
import NoAppointmentFound from "../components/NoAppoimentFound";
import NoPackageFound from "../components/NoPackageFound";
import SetSuccess from "../components/SetSuccess";

const Contact = () => {
  return (
    <div className="mt-5 pt-5">
      <ConfirmAppoiment />
      <SetSuccess />
      <FeedbackList/>
      <NoPackageFound/>
      <NoAppointmentFound/>
    </div>
  );
};

export default Contact;
