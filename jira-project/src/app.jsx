import { Route, Routes, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'
import { createBrowserHistory } from 'history';
import HomeTemplate from './templates/home-template';
import { PageConstant } from './common/page.constant';
import Project from './Pages/Project/Project';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import ProjectAdd from './Pages/Project/Project-add';
import ProjectEdit from './Pages/Project/Project-edit';
import { ACCESS_TOKEN, settings } from './util/config';
import ProjectBoard from './Pages/Project/projectBoard';
import Users from './Pages/Users/Users';

export const history = createBrowserHistory()

export default function App() {
    return (
        <HistoryRouter history={history}>
            <Routes>
                <Route path='/' element={<HomeTemplate />}>
                    <Route index element={<Project />}></Route>
                    <Route path={`${PageConstant.project}/new`} element={<ProjectAdd />}></Route>
                    <Route path={`${PageConstant.project}/:id/edit`} element={<ProjectEdit />}></Route>
                    <Route path={`${PageConstant.project}/:id/board`} element={<ProjectBoard />}></Route>
                    <Route path={`${PageConstant.usermanage}`} element={<Users/>}></Route>
                </Route>
                <Route path={`${PageConstant.login}`} element={settings.getStore(ACCESS_TOKEN) ? <Project /> : <Login />} />
                <Route path={`${PageConstant.register}`} element={<Register />} />
            </Routes>
        </HistoryRouter>
    )
}