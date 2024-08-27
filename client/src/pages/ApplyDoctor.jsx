import React from "react";
import Layout from "../components/Layout";
import { Col, Form, Input, message, Row, TimePicker } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import axios from "axios";

const ApplyDoctor = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleFinish = async (values) => {
    try {
      dispatch(showLoading);
      const res = await axios.post(
        "/api/v1/user/apply-doctor",
        { ...values, userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());

      console.log(error);
      message.error("Something Went Wrong");
    }
  };

  return (
    <Layout>
      <h1 className="text-center">Apply Doctor</h1>
      <Form layout="verticle" onFinish={handleFinish} className="m-3">
        <Row gutter={20}>
          <Col sm={24} md={24} lg={24}>
            <h6>Personal Details</h6>
          </Col>
          <Col sm={24} md={12} lg={8}>
            <Form.Item
              label="First name"
              name="firstName"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Enter First Name" />
            </Form.Item>
          </Col>
          <Col sm={24} md={12} lg={8}>
            <Form.Item
              label="Last name"
              name="lastName"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Enter Last Name" />
            </Form.Item>
          </Col>
          <Col sm={24} md={12} lg={8}>
            <Form.Item
              label="Phone No."
              name="phone"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Enter Phone Number" />
            </Form.Item>
          </Col>
          <Col sm={24} md={12} lg={8}>
            <Form.Item
              label="Email ID."
              name="email"
              required
              rules={[{ required: true }]}
            >
              <Input type="email" placeholder="Enter Email ID" />
            </Form.Item>
          </Col>
          <Col sm={24} md={24} lg={24}>
            <hr />
            <h6>Professional Details</h6>
          </Col>
          <Col sm={24} md={12} lg={8}>
            <Form.Item
              label="Specialization"
              name="specialization"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Enter Your Specialization" />
            </Form.Item>
          </Col>
          <Col sm={24} md={12} lg={8}>
            <Form.Item
              label="Experience"
              name="experience"
              required
              rules={[{ required: true }]}
            >
              <Input
                type="number"
                placeholder="Enter Your Experience in Years"
              />
            </Form.Item>
          </Col>
          <Col sm={24} md={24} lg={24}>
            <hr />
            <h6>Clinic/Hospital Details</h6>
          </Col>
          <Col sm={24} md={12} lg={8}>
            <Form.Item
              label="Address"
              name="address"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Enter Clinic/Hospital address" />
            </Form.Item>
          </Col>
          <Col sm={24} md={12} lg={8}>
            <Form.Item
              label="Consultation Fee"
              name="feesPerConsultation"
              required
              rules={[{ required: true }]}
            >
              <Input type="number" placeholder="Enter Fee Per Consultation" />
            </Form.Item>
          </Col>
          <Col sm={24} md={12} lg={8}>
            <Form.Item label="Website" name="website">
              <Input type="text" placeholder="Enter Website Link" />
            </Form.Item>
          </Col>
          <Col sm={24} md={12} lg={8}>
            <Form.Item label="Timings" name="timings" required>
              <TimePicker.RangePicker format="HH:mm" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col sm={24} md={24} lg={24}>
            <div className="d-flex justify-content-end">
              <button className="btn btn-primary" type="submit">
                Submit
              </button>
            </div>
          </Col>
        </Row>
      </Form>
    </Layout>
  );
};

export default ApplyDoctor;
