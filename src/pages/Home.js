import React from "react";
import { GoogleLogin } from "@react-oauth/google";

const Home = () => {
  const handleSuccess = (response) => {
    console.log("Login Success:", response);
  };

  const handleFailure = (error) => {
    console.error("Login Failed:", error);
  };

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <GoogleLogin onSuccess={handleSuccess} onError={handleFailure} />
    </div>
  );
};

export default Home;
