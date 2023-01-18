import { Outlet } from 'react-router-dom'
import Header from '../components/header/header'


const HomeTemplate = () => {
    return (
        <div>
            <Header />
            <Outlet />
        </div>
    )
}

export default HomeTemplate