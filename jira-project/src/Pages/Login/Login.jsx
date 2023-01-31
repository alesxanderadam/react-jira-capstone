import { Button, Col, Form, Input, Row } from 'antd';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBCheckbox } from 'mdb-react-ui-kit';
import { useDispatch } from 'react-redux';
import '../../assets/scss/login.scss'
import { userLoginApi } from '../../redux/reducers/userReducer';
const Login = () => {
  const dispatch = useDispatch()
  const onFinish = (values) => {
    dispatch(userLoginApi(values))
  };
  const [form] = Form.useForm();
  const layout = {
    labelCol: { sm: 9, md: 7, lg: 9, xl: 3, xxl: 9 },
    wrapperCol: { sm: 12, md: 14, span: 16, xxl: 16 },
  };
  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
    },
  };

  return (
    <MDBContainer fluid className="p-3 my-5 h-custom">

      <MDBRow>

        <MDBCol col='10' md='6'>
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" class="img-fluid bg-image-login" alt="Sample image" />
        </MDBCol>

        <MDBCol col='4' md='6'>

          <div className="d-flex flex-row align-items-center justify-content-center">

            <p className="lead fw-normal mb-0 me-3">Sign in with</p>

            <MDBBtn floating size='md' tag='a' className='me-2'>
              <MDBIcon fab icon='facebook-f' />
            </MDBBtn>

            <MDBBtn floating size='md' tag='a' className='me-2'>
              <MDBIcon fab icon='twitter' />
            </MDBBtn>

            <MDBBtn floating size='md' tag='a' className='me-2'>
              <MDBIcon fab icon='linkedin-in' />
            </MDBBtn>

          </div>

          <div className="divider d-flex align-items-center my-4">
            <p className="text-center fw-bold mx-3 mb-0">Or</p>
          </div>

          <Form
            validateMessages={validateMessages}
            {...layout}
            form={form}
            style={{
              maxWidth: 600,
            }}
            name="basic"
            onFinish={onFinish}
            autoComplete="off"
          >
            <Row gutter={[12, 12]}>
              <Col xs={24} xl={24} span={24}>
                <Form.Item name='email' label="Email" rules={[{ required: true, type: 'email' }]}>
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} xl={24} span={24}>
                <Form.Item
                  label="Password"
                  name="passWord"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your password!',
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
              </Col>
            </Row>



          </Form>

          <div className="d-flex justify-content-between mb-4">
            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
            <a href="!#">Forgot password?</a>
          </div>

          <div className='text-center text-md-start mt-4 pt-2'>
            <Button type="primary" htmlType="submit" onClick={() => {
              form.submit()
            }}>
              Login
            </Button>
            <p className="small fw-bold mt-2 pt-1 mb-2">Don't have an account? <a href="#!" className="link-danger">Register</a></p>
          </div>

        </MDBCol>

      </MDBRow>

      <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">

        <div className="text-white mb-3 mb-md-0">
          Copyright © 2020. All rights reserved.
        </div>

        <div>

          <MDBBtn tag='a' color='none' className='mx-3' style={{ color: 'white' }}>
            <MDBIcon fab icon='facebook-f' size="md" />
          </MDBBtn>

          <MDBBtn tag='a' color='none' className='mx-3' style={{ color: 'white' }}>
            <MDBIcon fab icon='twitter' size="md" />
          </MDBBtn>

          <MDBBtn tag='a' color='none' className='mx-3' style={{ color: 'white' }}>
            <MDBIcon fab icon='google' size="md" />
          </MDBBtn>

          <MDBBtn tag='a' color='none' className='mx-3' style={{ color: 'white' }}>
            <MDBIcon fab icon='linkedin-in' size="md" />
          </MDBBtn>

        </div>

      </div>

    </MDBContainer>
  );
}

export default Login;