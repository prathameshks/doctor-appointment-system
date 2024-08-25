import React from "react";
import { Form, Input,message } from "antd";
import '../styles/RegisterStyles.css';
import {Link,useNavigate} from 'react-router-dom';
import axios from "axios";
import { useDispatch } from "react-redux";
import { showLoading,hideLoading } from "../redux/features/alertSlice";

const Register = () => {

  const navigate = new useNavigate();
  const dispatch = useDispatch();

  // Form handler
  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoading());

      const res = await axios.post('/api/v1/user/register',values);

      dispatch(hideLoading());
      if(res.data.success){
        message.success(res.data.message);
        navigate("/login");
      }else{
        message.error(res.data.message);        
      }

    } catch (error) {
      console.log(error);
      dispatch(hideLoading());
      message.error("Something Went Wrong...");
    }
  };

  return (
    <>
      <div className="form-container">
        <Form layout="vertical" onFinish={onFinishHandler} className="p-4 w-35">
          <h3 className="text-center">Register Form</h3>
          <Form.Item label="Name" name="name">
            <Input type="text" required />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="email" required />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" required />
          </Form.Item>
          <h6>Already have an account? <Link to={"/login"}>Login Here</Link> </h6>
          <button className="btn btn-primary ">Register</button>
        </Form>
      </div>
    </>
  );
};

export default Register;
