import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import { history } from '../app'
import { PageConstant } from '../common/page.constant'
import Header from '../components/header/header'


const HomeTemplate = () => {
    const { Login } = useSelector(state => state.userReducer)
    const navigate = useNavigate()
    return (
        <div>
            <Header />
            {Login ? <Outlet /> : navigate(`${PageConstant.login}`)}
        </div>
    )
}

export default HomeTemplate