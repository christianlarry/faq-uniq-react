import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// PAGES
import HomePage from "./components/pages/HomePage";

const AppRouter = () => {
	return (
		<Router>
			<Routes>
				<Route index element={<HomePage/>}/>
			</Routes>
		</Router>
	)
}

export default AppRouter