import { Route, Routes, unstable_HistoryRouter as HistoryBrowser, } from 'react-router-dom'
import { createBrowserHistory } from 'history';
import HomeTemplate from './templates/home-template';

export const history: any = createBrowserHistory()

export default function App() {
    return (
        <HistoryBrowser history={history}>
            <Routes>
                <Route path='/' element={<HomeTemplate />}>

                </Route>
            </Routes>
        </HistoryBrowser>
    )
}