import React from "react";
import { Form, Input, message } from "antd";
import '../styles/LoginStyles.css';
import {Link,useNavigate} from 'react-router-dom';
import axios from "axios";
import {useDispatch} from 'react-redux'
import { showLoading,hideLoading } from "../redux/features/alertSlice";

const Login = () => {
  const navigate = new useNavigate();
  const dispatch = useDispatch();

  // Form handler
  const onFinishHandler = async(values) => {
    try {
      dispatch(showLoading());

      const res = await axios.post('/api/v1/user/login',values);
      
      dispatch(hideLoading());
      if(res.data.success){
        localStorage.setItem("token",res.data.token);
        message.success(res.data.message);
        console.log(res.data.user);
        navigate("/");      
      }else{
        message.error(res.data.message);
      }
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
          <h3 className="text-center">Login Form</h3>
          
          <Form.Item label="Email" name="email">
            <Input type="email" required />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" required />
          </Form.Item>
          <h6>Don't have an account? <Link to={"/register"}>Register Here</Link> </h6>
          <button className="btn btn-primary ">Login</button>
        </Form>
      </div>
    </>
  );
};

export default Login;
