import { Button, Form, Input, InputNumber } from 'antd'
import React, { useEffect } from 'react'
import { settings, USER_LOGIN } from '../../util/config'

const Profile = () => {
    const onFinish = (values) => {
        console.log(values)
    }
    useEffect(() => {
        if (settings.getStorageJson(USER_LOGIN)) {
            form.setFieldsValue(settings.getStorageJson(USER_LOGIN))
        }
    }, [])
    const [form] = Form.useForm()
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-xl-6'>
                    <div className='img-avartar'>
                        <img src='' alt='.'></img>
                    </div>
                </div>
                <div className='col-xl-6'>
                    <div className='form-information-user'>
                        <Form onFinish={onFinish} form={form}>
                            <div className="form-group">
                                <label className='label-register'>Email</label>
                                <Form.Item name="email" id="email" rules={[{ required: true, type: 'email' }]}>
                                    <Input className="form-control" />
                                </Form.Item>
                            </div>
                            <div className="form-group">
                                <label className='label-register'>Password</label>
                                <Form.Item name="passWord" id="passWord" rules={[{ required: true }]}>
                                    <Input className="form-control" />
                                </Form.Item>
                            </div>

                            <div className="form-group">
                                <label className='label-register'>name</label>
                                <Form.Item name="name" id="name" rules={[{ required: true }]}>
                                    <Input className="form-control" />
                                </Form.Item>
                            </div>
                            <div className="form-group">
                                <label className='label-register'>phone Number</label>
                                <Form.Item name="phoneNumber" id="phoneNumber" rules={[{ required: true }]}>
                                    <InputNumber className="form-control" />
                                </Form.Item>
                            </div>

                            <div className="m-t-lg">
                                <ul className="list-inline d-flex align-items-center">
                                    <Button onClick={() => { form.submit() }} type='primary' className='me-2'>Update</Button>

                                </ul>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
