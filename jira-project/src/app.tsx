import {
  Route,
  Routes,
  unstable_HistoryRouter as HistoryBrowser,
} from "react-router-dom";
import { createBrowserHistory } from "history";

import { Provider } from "react-redux";
import HomeTemplate from "./templates/home-template";
import { store } from "./redux/configStore";
import { PageConstant } from "./commom/page.constant";
import Project from "./Pages/Project/Project";

export const history: any = createBrowserHistory();

export default function App() {
  return (
    <Provider store={store}>
      <HistoryBrowser history={history}>
        <Routes>
          <Route path="/" element={<HomeTemplate />}>
            <Route path={`${PageConstant.project}`} element={<Project />}></Route>
          </Route>
        </Routes>
      </HistoryBrowser>
    </Provider>
  );
}
