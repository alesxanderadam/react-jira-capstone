import { Button, Form, Input, InputNumber } from 'antd'
import { useDispatch } from 'react-redux';
import '../../assets/scss/register.scss'
import FormUser from '../../components/form-login/form-login-register';
import { userRegisterApi } from '../../redux/reducers/userReducer';
const Register = () => {
  const dispatch = useDispatch()
  const userRegister = (values) => {
    dispatch(userRegisterApi(values))
  }
  return (
    <FormUser user={null} submitted={userRegister} />
  )
}

export default Register
