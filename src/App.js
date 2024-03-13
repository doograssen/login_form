// import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
import { LoginBtn } from './components/login-btn/LoginBtn';
import { Modal } from './components/modal/Modal';

export const App = () => {
	const [modalState, setModalState] = useState(false);
	return (
		<div className="app">
			{/* <img src={logo} className="App-logo" alt="logo" /> */}
			{/* <p>
					Edit <code>src/App.js</code> and save to reload.
				</p> */}
			<header className="app-header">
				<div className="container">
					<LoginBtn state={modalState} setState={setModalState} />
				</div>
			</header>
			<main className="app-main"></main>
			<Modal state={modalState} />
		</div>
	);
};
