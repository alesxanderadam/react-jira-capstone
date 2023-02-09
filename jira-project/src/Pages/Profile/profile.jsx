import { Avatar, Button, Form, Input, InputNumber } from 'antd'
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
                <div className='col-xl-4'>
                    <div className='img-avartar p-3'>
                        <img className='w-100' style={{ borderRadius: '100rem' }} src={settings.getStorageJson(USER_LOGIN).avatar}></img>
                    </div>
                </div>
                <div className='col-xl-8'>
                    <div className='form-information-user p-3'>
                        <Form onFinish={onFinish} form={form}>
                            <div className="form-group">
                                <label className='label-register'>Email</label>
                                <Form.Item name="id">
                                    <Input disabled={true} className="form-control" />
                                </Form.Item>
                            </div>
                            <div className="form-group">
                                <label className='label-register'>Email</label>
                                <Form.Item name="email" id="email" rules={[{ required: true, type: 'email' }]}>
                                    <Input className="form-control" />
                                </Form.Item>
                            </div>

                            <div className="form-group">
                                <label className='label-register'>Name</label>
                                <Form.Item name="name" id="name" rules={[{ required: true }]}>
                                    <Input className="form-control" />
                                </Form.Item>
                            </div>
                            <div className="form-group">
                                <label className='label-register'>Phone Number</label>
                                <Form.Item name="phoneNumber" id="phoneNumber" rules={[{ required: true }]}>
                                    <Input className="form-control" />
                                </Form.Item>
                            </div>

                            <div className="form-group">
                                <label className='label-register'>Password</label>
                                <Form.Item name="passWord" id="passWord" rules={[{ required: true }]}>
                                    <Input className="form-control" />
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
        </div >
    )
}

export default Profile
