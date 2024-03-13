
import loginImg from '../../images/login.svg';
import './login.css';

export const LoginBtn = ({state, setState}) => {
	const btnHandler=() => {
		setState(() => {
			return !state ? !state : state;
		});
	};
	return (
		<button className="login" aria-label="login" onClick={btnHandler}>
			<img src={loginImg} alt="login"/>
		</button>
	);
};
