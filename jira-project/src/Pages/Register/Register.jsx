import { Button, Form, Input, InputNumber } from 'antd'
import { useDispatch } from 'react-redux';
import '../../assets/scss/register.scss'
import { userRegisterApi } from '../../redux/reducers/userReducer';
const Register = () => {
  const dispatch = useDispatch()
  const onFinish = (values) => {
    dispatch(userRegisterApi(values))
  };
  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
    },
  };
  const [form] = Form.useForm()
  return (
    <div className="signup__container">
      <div className="container__child signup__thumbnail">
        <div className="thumbnail__logo d-flex justify-content-center align-items-center">
          <img className='me-2' src='./assets/img/shiba.png' style={{ borderRadius: '100rem', width: '40px', height: '40px' }}></img>
          <h1 className="logo__text">Spectre</h1>
        </div>
        <div className="thumbnail__content text-center">
          <h1 className="heading--primary">Welcome to MI6.</h1>
          <h2 className="heading--secondary">Are you ready to join the elite?</h2>
        </div>
        <div className="thumbnail__links">
          <ul className="list-inline m-b-0 text-center d-flex justify-content-center">
            <li className='mx-2'><a href="http://alexdevero.com/" target="_blank"><i className="fa fa-globe" /></a></li>
            <li className='mx-2'><a href="https://www.behance.net/alexdevero" target="_blank"><i class="fa-brands fa-facebook"></i></a></li>
            <li className='mx-2'><a href="https://github.com/alexdevero" target="_blank"><i class="fa-brands fa-github"></i></a></li>
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
              <Button onClick={() => { form.submit() }} type='primary' className='me-2'>Register</Button>
              <li>
                <a className="signup__link" href="#">I am already a member</a>
              </li>
            </ul>
          </div>
        </Form>
      </div>
    </div>

  )
}

export default Register
