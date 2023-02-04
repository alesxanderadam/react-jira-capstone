import { Button, Col, Form, Input, Row } from 'antd';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBCheckbox } from 'mdb-react-ui-kit';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import '../../assets/scss/login.scss'
import { PageConstant } from '../../common/page.constant';
import FormUser from '../../components/form-login/form-login-register';
import { userLoginApi } from '../../redux/reducers/userReducer';
const Login = () => {
  const dispatch = useDispatch()
  const userLogin = (values) => {
    dispatch(userLoginApi(values))
  }
  return (
    <FormUser user={!null} submitted={userLogin} />
  );
}

export default Login;