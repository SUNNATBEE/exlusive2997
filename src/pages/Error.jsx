import React from "react";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  return (
    <div style={{ 
      textAlign: "center", 
      padding: "80px 20px",
      fontFamily: "sans-serif"
    }}>
      <h1 style={{ fontSize: "64px", marginBottom: "10px" }}>404 Not Found</h1>
      <p style={{ marginBottom: "25px" }}>
        The page you tried to open does not exist.
      </p>

      <button 
        onClick={() => navigate("/")}
        style={{
          padding: "10px 22px",
          backgroundColor: "#d65c5c",
          border: "none",
          borderRadius: "6px",
          color: "white",
          cursor: "pointer",
          fontSize: "16px"
        }}
      >
        Back to home page
      </button>
    </div>
  );
};

export default Error;
