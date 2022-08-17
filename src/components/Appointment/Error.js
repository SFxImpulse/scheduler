// Renders and exports the appointment error component.
import React from "react";

export default function Error (props) {
  return (
    <main className="appointment__card appointment__card--error">
      <section className="appointment_-error-message">
        <h1 className="text--semi-bold">Error</h1>
        <h4 className="text--light">{props.message}</h4>
      </section>
      <img 
        className="appointment__error-close"
        src="images/close.png"
        alt="Close"
        onClick={props.onClose}
      />
    </main>
  );
}