// import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
// import { PageConstant } from '../common/page.constant'
import Header from '../components/header/header'
import CreateTask from '../Pages/CreateTask/CreateTask'


const HomeTemplate = () => {
    // const { Login } = useSelector(state => state.userReducer)
    // const navigate = useNavigate()
    return (
        <div>
            <Header />
            <Outlet />
            <CreateTask />
        </div>
    )
}

export default HomeTemplate