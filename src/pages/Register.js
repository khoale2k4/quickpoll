import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import NotificationModal from "../components/MessageModal.js";

const Register = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    password: "",
  });

  // const [error, setError] = useState("");
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [openMessage, setOpenMessage] = useState(false);
  const [error, setError] = useState(false);

  const passwordToggleRef = useRef(null); // Refers to the checkbox input that toggles the password visibility.
  const passwordRef = useRef(null); // Refers to the password input field.
  const passwordLabelRef = useRef(null); //  Refers to the label (eye icon) used to switch between visible (text) and hidden (password) modes.

  useEffect(() => {
    const toggleEl = passwordToggleRef.current;

    const handleToggle = () => {
      if (passwordRef.current && passwordLabelRef.current) {
        if (passwordRef.current.type === "password") {
          // If the password is currently hidden (type="password"), it changes to text and updates the icon.
          passwordRef.current.type = "text";
          passwordLabelRef.current.innerHTML =
            '<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 fill-current text-black" viewBox="0 0 24 24"><path d="M12,9c-1.642,0-3,1.359-3,3c0,1.642,1.358,3,3,3c1.641,0,3-1.358,3-3C15,10.359,13.641,9,12,9z"/><path d="M12,5c-7.633,0-9.927,6.617-9.948,6.684L1.946,12l0.105,0.316C2.073,12.383,4.367,19,12,19s9.927-6.617,9.948-6.684 L22.054,12l-0.105-0.316C21.927,11.617,19.633,5,12,5z M12,17c-5.351,0-7.424-3.846-7.926-5C4.578,10.842,6.652,7,12,7 c5.351,0,7.424,3.846,7.926,5C19.422,13.158,17.348,17,12,17z"/></svg>';
        } else {
          // If the password is visible (type="text"), it switches back to password and updates the icon.
          passwordRef.current.type = "password";
          passwordLabelRef.current.innerHTML =
            '<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 fill-current text-gray-500" viewBox="0 0 24 24"><path d="M12 19c.946 0 1.81-.103 2.598-.281l-1.757-1.757C12.568 16.983 12.291 17 12 17c-5.351 0-7.424-3.846-7.926-5 .204-.47.674-1.381 1.508-2.297L4.184 8.305c-1.538 1.667-2.121 3.346-2.132 3.379-.069.205-.069.428 0 .633C2.073 12.383 4.367 19 12 19zM12 5c-1.837 0-3.346.396-4.604.981L3.707 2.293 2.293 3.707l18 18 1.414-1.414-3.319-3.319c2.614-1.951 3.547-4.615 3.561-4.657.069-.205.069-.428 0-.633C21.927 11.617 19.633 5 12 5zM16.972 15.558l-2.28-2.28C14.882 12.888 15 12.459 15 12c0-1.641-1.359-3-3-3-.459 0-.888.118-1.277.309L8.915 7.501C9.796 7.193 10.814 7 12 7c5.351 0 7.424 3.846 7.926 5C19.624 12.692 18.76 14.342 16.972 15.558z"/></svg>';
        }
        // Focus remains on the input field after toggling.
        passwordRef.current.focus();
      }
    };

    if (toggleEl) {
      toggleEl.addEventListener("change", handleToggle);
    }
    return () => {
      if (toggleEl) {
        toggleEl.removeEventListener("change", handleToggle);
      }
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onDone = () => {
    navigate("/register/setup");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // alert("Clicking submit");
    // setError("");
    setError(false);
    setOpenMessage(true);
    setMessage("Tạo tài khoản thành công!");

    // try {
    //   const response = await fetch("http://localhost:5000/api/auth/register", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(formData),
    //   });

    //   const data = await response.json();
    //   if (response.ok) {
    //     alert("Registration successful! Redirecting to login.");
    //     navigate("/login");
    //   } else {
    //     setError(data.message || "Something went wrong.");
    //   }
    // } catch (err) {
    //   setError("Network error. Please try again.");
    // }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-green-100">
      {openMessage && <NotificationModal message={message} onClose={() => setOpenMessage(false)} success={!error} onDone={onDone} />}
      <div className="absolute flex top-3 right-10 z-10 h-10 items-center justify-end">
        <span className="flex space-x-2">
          <span>Already have an account?</span>
          <a href="/login" className="text-blue-500">
            Login
          </a>
        </span>
      </div>

      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-2 text-center">
          Welcome to YOLO FARM
        </h2>
        <p className="text-sm mb-4 text-center w-4/5 mx-auto">
          Create an account to access YOLO FARM and start set up your garden
        </p>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">
              First Name
            </label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              placeholder="First name"
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">
              Last Name
            </label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              placeholder="Last name"
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="Username"
              required
            />
          </div>

          <div className="mb-4">
            <div className="relative w-full">
              <div className="absolute inset-y-0 top-6 right-0 flex items-center px-2 py-2 z-10">
                <input
                  type="checkbox"
                  id="toggle"
                  className="hidden js-password-toggle"
                  ref={passwordToggleRef}
                />
                <label
                  htmlFor="toggle"
                  ref={passwordLabelRef}
                  className="px-2 text-gray-500 cursor-pointer js-password-label flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 fill-current text-gray-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 19c.946 0 1.81-.103 2.598-.281l-1.757-1.757C12.568 16.983 12.291 17 12 17c-5.351 0-7.424-3.846-7.926-5 .204-.47.674-1.381 1.508-2.297L4.184 8.305c-1.538 1.667-2.121 3.346-2.132 3.379-.069.205-.069.428 0 .633C2.073 12.383 4.367 19 12 19zM12 5c-1.837 0-3.346.396-4.604.981L3.707 2.293 2.293 3.707l18 18 1.414-1.414-3.319-3.319c2.614-1.951 3.547-4.615 3.561-4.657.069-.205.069-.428 0-.633C21.927 11.617 19.633 5 12 5z" />
                  </svg>
                </label>
              </div>

              <label
                htmlFor="password"
                className="block text-sm font-medium leading-5 text-gray-700"
              >
                Password
              </label>

              <input
                type="password"
                id="password"
                name="password"
                autoComplete="off"
                placeholder="Password"
                required
                ref={passwordRef}
                className="w-full border border-gray-300 px-3 py-2 rounded-md pr-16 js-password mt-1"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full font-bold bg-green-600 text-white p-2 rounded hover:bg-green-800"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
