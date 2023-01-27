import { Route, Routes, unstable_HistoryRouter as HistoryBrowser, } from 'react-router-dom'
import { createBrowserHistory } from 'history';

import { Provider } from "react-redux";
import HomeTemplate from './templates/home-template';
import { store } from './redux/configStore';
import Login from './Pages/Login/Login';
import CreateProject from './Pages/CreateProject/CreateProject';

export const history: any = createBrowserHistory()

export default function App() {
    return (
        <Provider store={store}>
            <HistoryBrowser history={history}>
                <Routes>
                    
                    <Route path='/login' element={<Login />}/>
                        <Route path='/' element={<HomeTemplate />}>
                        <Route path='/createProject' element={<CreateProject />}/>
                        </Route>
                </Routes>
            </HistoryBrowser>
        </Provider>
        
    )
}