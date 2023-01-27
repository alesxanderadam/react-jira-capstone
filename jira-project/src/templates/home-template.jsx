import { Outlet } from 'react-router-dom'
import Header from '../components/header/header'
import CreateTask from '../Pages/CreateTask/CreateTask'


const HomeTemplate = () => {
    return (
        <div>
            <Header />
            <CreateTask/>
            <Outlet />
        </div>
    )
}

export default HomeTemplate