import React from "react";
import { AdminPage, Home } from "./views";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.scss";
const supportsHistory = "pushState" in window.history;
function App() {
	return (
		<BrowserRouter forceRefresh={!supportsHistory}>
			<div className="App">
				<Route path="/" exact component={Home} />
				<Route path="/admin" component={AdminPage} />
			</div>
		</BrowserRouter>
	);
}

export default App;
