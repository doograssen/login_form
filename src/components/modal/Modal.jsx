import { SignUp } from '../signup-form/SignUp';
import './modal.css';

export const Modal = ({state}) => {

	console.log(state);
	return (
		<div className={`modal ${state ? "modal--show" : ""}`}>
			<h3>Форма регистрации</h3>
			<SignUp/>
		</div>
	);
}
