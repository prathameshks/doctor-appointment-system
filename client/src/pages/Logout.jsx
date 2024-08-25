import React from "react";
import { Form, message } from "antd";
import "../styles/LoginStyles.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";

const Logout = () => {
  const navigate = new useNavigate();
  const dispatch = useDispatch();

  // Form handler
  const onFinishHandler = async () => {
    try {
      dispatch(showLoading());

      localStorage.clear();
      navigate("/login");
      message.success("Logged Out Successfully");

      dispatch(hideLoading());
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong");
    }
  };

  return (
    <>
      <div className="form-container">
        <Form layout="vertical" onFinish={onFinishHandler} className="p-4 w-35">
          <h5 className="text-center">Do You Want to Logout?</h5>
          <div className="w-100 d-flex space-between">
            <button className="btn btn-primary ">Logout</button>
            <Link to={"/"}>
              <a className="btn btn-secondary ">Return Home</a>
            </Link>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Logout;
