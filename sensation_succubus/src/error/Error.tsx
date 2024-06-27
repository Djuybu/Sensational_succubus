import React from "react";
import { useLocation } from "react-router-dom";

export default function ErrorPage() {
  const error = useLocation();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>Error occcured at: {error.pathname}</i>
      </p>
    </div>
  );
}
