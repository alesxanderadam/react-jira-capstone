import { Button, Form, Input, InputNumber } from 'antd'
import { NavLink } from 'react-router-dom';
import '../../assets/scss/register.scss'
import { PageConstant } from '../../common/page.constant';

const FormUser = ({ user, submitted }) => {
    const onFinish = (values) => {
        submitted(values)
    };
    const [form] = Form.useForm()
    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
        },
    };
    const checkUser = () => {
        if (!user) {
            return <>
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
            </>
        }
    }
    return (
        <div className="signup__container">
            <div className="container__child signup__thumbnail">
                <div className="thumbnail__logo d-flex justify-content-center align-items-center">
                    <img className='me-2 img-form' src='./assets/img/shiba.png' style={{ borderRadius: '100rem', width: '40px', height: '40px' }}></img>
                    <h1 className="logo__text">Jira Project</h1>
                </div>
                <div className="thumbnail__content text-center">
                    <h1 className="heading--primary">Welcome to jira project.</h1>
                    <h2 className="heading--secondary">{user ? 'Please login to joih the project' : 'Please register to login'}</h2>
                </div>
                <div className="thumbnail__links">
                    <ul className="list-inline m-b-0 text-center d-flex justify-content-center">
                        <li className='mx-2'><a href="http://alexdevero.com/" target="_blank"><i className="fa fa-globe" /></a></li>
                        <li className='mx-2'><a href="https://www.behance.net/alexdevero" target="_blank"><i class="fa-brands fa-facebook"></i></a></li>
                        <li className='mx-2'><a href="https://github.com/alesxanderadam" target="_blank"><i class="fa-brands fa-github"></i></a></li>
                        <li className='mx-2'><a href="https://twitter.com/alexdevero" target="_blank"><i class="fa-brands fa-twitter"></i></a></li>
                    </ul>
                </div>
                <div className="signup__overlay" />
            </div>
            <div className="container__child signup__form">
                <Form validateMessages={validateMessages} onFinish={onFinish} form={form}>
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

                    {checkUser()}

                    <div className="m-t-lg">
                        <ul className="list-inline d-flex align-items-center">
                            <Button onClick={() => { form.submit() }} type='primary' className='me-2'>{user ? "Login" : "Register"}</Button>
                            <li>
                                <NavLink to={user ? `${PageConstant.register}` : `${PageConstant.login}`} className="signup__link" href="#">{user ? "I don't account" : "I'm ready to login"}</NavLink>
                            </li>
                        </ul>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default FormUser
