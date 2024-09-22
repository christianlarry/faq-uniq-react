import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// PAGES
import HomePage from "./components/pages/home/HomePage"

// LAYOUT
import MainLayout from "./components/templates/layout/MainLayout";

const AppRouter = () => {
	return (
		<Router>
			<Routes>
				<Route element={<MainLayout/>}>
					<Route index element={<HomePage/>}/>
				</Route>
			</Routes>
		</Router>
	)
}

export default AppRouter