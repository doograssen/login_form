import { useStore } from "../hooks/useStore";
import './signup.css';

const sendFormData = (formData) => {
	console.log(formData);
};

export const SignUp = () => {
	const {getState, updateState} = useStore();
	const submitHandler = (event) => {
		event.preventDefault();
		sendFormData(getState());
	};
	const {email, password, passwordConfirm} = getState();
	const onChange = ({ target }) => updateState(target.name, target.value);

	return (
		<form className="form" onSubmit={submitHandler}>
			<div className="form-block">
				<label htmlFor="email">Email</label>
				<input
					id="email"
					className="form-input"
					name="email"
					type="email"
					placeholder="Email"
					value={email}
					onChange={onChange}
				/>
			</div>
			<div className="form-block">
				<label htmlFor="password">Пароль</label>
				<input
					id="password"
					className="form-input"
					name="password"
					type="text"
					placeholder="Пароль"
					value={password}
					onChange={onChange}
				/>
			</div>
			<div className="form-block">
				<label htmlFor="password-confirm">Повторить пароль</label>
				<input
					id="password-confirm"
					className="form-input"
					name="passwordConfirm"
					type="text"
					placeholder="Повторить пароль"
					value={passwordConfirm}
					onChange={onChange}
				/>
			</div>
			<button className="form-submit" type="submit">Зарегистрироваться</button>
		</form>
	);
}

