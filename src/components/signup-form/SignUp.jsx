import { useStore } from "../hooks/useStore";
import './signup.css';

const sendFormData = (formData) => {
	console.log(formData);
};

const ERRORS = {
	WRONG_EMAIL: 'неверный формат почты',
	EMPTY: 'Поле обязательно для заполнения',
	SHORT_PASSWORD: 'слишком короткий пароль',
	FORMAT_PASSWORD: 'пароль должен содержать латтинские буквы, цифры и символы',
	MATCHING_PASSWORDS: 'пароли не совпадают',
};


export const SignUp = () => {
	const {getState, updateState} = useStore();
	const currentState = getState();
	const {email, password, passwordConfirm} = getState();
	const submitHandler = (event) => {
		event.preventDefault();
		if (!Object.values(currentState).some((element) => !element.validate)) {
			sendFormData(getState());
		}
	};
	const onChange = ({ target }) => {
		updateState(target.name, { ...currentState[target.name], value: target.value, error: null});
	};

	const onEmailBlur = ({ target }) => {
		let newError = null;
    if (!/[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+/.test(target.value)) {
			newError = ERRORS.WRONG_EMAIL;
		}
		if (!target.value) {
			newError = ERRORS.EMPTY;
		}
		updateState(target.name, { ...currentState[target.name], error: newError, validate: newError === null });
	}

	const onPasswordBlur = ({ target }) => {
		let newError = null;
    if (!/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])/.test(target.value)) {
			newError = ERRORS.FORMAT_PASSWORD;
		}
		else if (target.value.length < 8) {
			newError = ERRORS.SHORT_PASSWORD;
		}
		if (!target.value) {
			newError = ERRORS.EMPTY;
		}
		updateState(target.name, { ...currentState[target.name], error: newError, validate: newError === null });
	}

	return (
		<form className="form" onSubmit={submitHandler}>
			<div className="form-block">
				<label htmlFor="email">Email</label>
				<input
					id="email"
					className="form-input"
					name="email"
					type="text"
					placeholder="Email"
					value={email.value}
					onChange={onChange}
					onBlur={onEmailBlur}
				/>
				{email.error && <div className="form-error">{email.error}</div>}
			</div>
			<div className="form-block">
				<label htmlFor="password">Пароль</label>
				<input
					id="password"
					className="form-input"
					name="password"
					type="text"
					placeholder="Пароль"
					value={password.value}
					onChange={onChange}
					onBlur={onPasswordBlur}
				/>
				{password.error && <div className="form-error">{password.error}</div>}
			</div>
			<div className="form-block">
				<label htmlFor="password-confirm">Повторить пароль</label>
				<input
					id="password-confirm"
					className="form-input"
					name="passwordConfirm"
					type="text"
					placeholder="Повторить пароль"
					value={passwordConfirm.value}
					onChange={onChange}
				/>
			</div>
			<button className="form-submit" type="submit">Зарегистрироваться</button>
		</form>
	);
}

