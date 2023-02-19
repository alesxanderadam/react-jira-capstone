import { Avatar, Button, Form, Input, InputNumber } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { editUserApi } from "../../redux/reducers/userReducer";
import { settings, USER_LOGIN } from "../../util/config";

const Profile = () => {
    const dispatch = useDispatch();
    const onFinish = (values) => {
        dispatch(editUserApi(values));
        onReset();
    };
    const onReset = () => {
        form.resetFields(["passWord", "confirm"]);
    };
    useEffect(() => {
        if (settings.getStorageJson(USER_LOGIN)) {
            form.setFieldsValue(settings.getStorageJson(USER_LOGIN));
            onReset();
        }
    }, [settings.getStorageJson(USER_LOGIN)]);
    const [form] = Form.useForm();
    return (
        <div className="container">
            <div className="row">
                <div className="col-xl-4">
                    <div className="img-avartar p-3">
                        <img
                            className="w-100"
                            style={{ borderRadius: "100rem" }}
                            src={settings.getStorageJson(USER_LOGIN).avatar}
                        ></img>
                    </div>
                </div>
                <div className="col-xl-8">
                    <div className="form-information-user p-3">
                        <Form onFinish={onFinish} form={form}>
                            <div className="form-group">
                                <label className="label-register">Id</label>
                                <Form.Item name="id">
                                    <Input disabled={true} className="form-control" />
                                </Form.Item>
                            </div>
                            <div className="form-group">
                                <label className="label-register">Email</label>
                                <Form.Item
                                    name="email"
                                    id="email"
                                    rules={[{ type: "email" }]}
                                >
                                    <Input className="form-control" />
                                </Form.Item>
                            </div>

                            <div className="form-group">
                                <label className="label-register">Name</label>
                                <Form.Item name="name" id="name">
                                    <Input className="form-control" />
                                </Form.Item>
                            </div>
                            <div className="form-group">
                                <label className="label-register">Phone Number</label>
                                <Form.Item
                                    name="phoneNumber"
                                    id="phoneNumber"
                                >
                                    <Input className="form-control" />
                                </Form.Item>
                            </div>

                            <div className="form-group">
                                <label className="label-register">Password</label>
                                <Form.Item
                                    name="passWord"
                                    id="passWord"
                                    hasFeedback
                                >
                                    <Input.Password className="form-control" style={{ display: "flex" }} />
                                </Form.Item>
                            </div>

                            <div className="form-group">
                                <label className="label-register">Password confirmation</label>
                                <Form.Item
                                    name="confirm"
                                    dependencies={["passWord"]}
                                    hasFeedback
                                    rules={[
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue("passWord") === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(
                                                    new Error(
                                                        "The two passwords that you entered do not match!"
                                                    )
                                                );
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password className="form-control" style={{ display: "flex" }} />
                                </Form.Item>
                            </div>

                            <div className="m-t-lg">
                                <ul className="list-inline d-flex align-items-center">
                                    <Button
                                        onClick={() => {
                                            form.submit();
                                        }}
                                        type="primary"
                                        className="me-2"
                                    >
                                        Update
                                    </Button>
                                </ul>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
