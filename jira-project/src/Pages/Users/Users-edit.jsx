import { Form, Input,Button } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {detailUserAction,editUserByid,getUserById} from '../../redux/reducers/MangeReducer'

const UserEdit = () => {
    const { id } = useParams()
    const {userDetail} =useSelector(state => state.MangeReducer)
    const dispath = useDispatch();
    const [form] = Form.useForm();
    useEffect(() => {
        dispath(getUserById(id))
        // onReset();
    }, [id])
    form.setFieldsValue(userDetail)
    const onReset = () => {
        form.resetFields(["passWord", "confirm"]);
      };
    const onFinish =(value) =>{
        
        dispath(editUserByid({
            id: value.userId,
            ...value
        }))
        onReset();
    }
    return (
    <>
    <div className="container">
    <Form onFinish={onFinish} form={form}>
              <div className="form-group">
                <label className="label-register">Id User</label>
                <Form.Item name="userId">
                  <Input disabled={true} className="form-control" />
                </Form.Item>
              </div>
              <div className="form-group">
                <label className="label-register">Email</label>
                <Form.Item
                  name="email"
                  id="email"
                  rules={[{ required: true, type: "email" }]}
                >
                  <Input className="form-control" />
                </Form.Item>
              </div>
              <div className="form-group">
                <label className="label-register">Name</label>
                <Form.Item name="name" id="name" rules={[{ required: true }]}>
                  <Input className="form-control" />
                </Form.Item>
              </div>
              <div className="form-group">
                <label className="label-register">Phone Number</label>
                <Form.Item
                  name="phoneNumber"
                  id="phoneNumber"
                  rules={[{ required: true }]}
                >
                  <Input className="form-control" />
                </Form.Item>
              </div>
              <div className="form-group">
                <label className="label-register">Password</label>
                <Form.Item
                  name="passWord"
                  id="passWord"
                  rules={[{ required: true }]}
                  hasFeedback
                >
                  <Input.Password className="form-control" style={{display: "flex"}} />
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
    </>
    )
}

export default UserEdit
