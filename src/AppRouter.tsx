import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// PAGES
import HomePage from "./components/pages/home/HomePage"
import DetailFaqPage from "./components/pages/detail-faq/DetailFaqPage";

// LAYOUT
import MainLayout from "./components/templates/layout/MainLayout";
import TestPage from "./components/pages/TestPage";

const AppRouter = () => {
	return (
		<Router>
			<Routes>
				<Route element={<MainLayout/>}>
					<Route index element={<Navigate to={"/faq"}/>}/>
					<Route path="faq" element={<HomePage/>}/>
					<Route path="faq/:id" element={<DetailFaqPage/>}/>
					<Route path="test" element={<TestPage/>}/>
				</Route>
			</Routes>
		</Router>
	)
}

export default AppRouter