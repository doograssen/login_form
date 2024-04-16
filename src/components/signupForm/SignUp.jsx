import { useState } from "react";
import { FormField } from "../formField/FormField";
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
	const {getState, updateStateByName, updateFullState} = useStore();
	const currentState = getState();
	const {password, passwordConfirm} = currentState;
	const [formStatus, setFormStatus] = useState(false);

	const submitHandler = (event) => {
		event.preventDefault();
		if (password.value !== passwordConfirm.value || passwordConfirm.value === '') {
			updateStateByName('passwordConfirm', {...currentState['passwordConfirm'], error: ERRORS.MATCHING_PASSWORDS, validate: false});
		}
		else if (true) {
			sendFormData(getState());
		}
	};

	const validateEmail = (value) => {
		let errorMessage = null;
    if (!/[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+/.test(value)) {
			errorMessage = ERRORS.WRONG_EMAIL;
		}
		if (!value) {
			errorMessage = ERRORS.EMPTY;
		}
		return errorMessage;
	};

	const validatePassword = (value) => {
		let errorMessage = null;
    if (!/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])/.test(value)) {
			errorMessage = ERRORS.FORMAT_PASSWORD;
		}
		else if (value.length < 8) {
			errorMessage = ERRORS.SHORT_PASSWORD;
		}
		if (!value) {
			errorMessage = ERRORS.EMPTY;
		}
		return errorMessage;
	};

	const validatePasswordConfirm = (value, compareValue) => {
		let errorMessage = null;
		if (value !== compareValue && compareValue !== '') {
			errorMessage = ERRORS.MATCHING_PASSWORDS;
		}
		return errorMessage;
	};

	const validateInput = (field) => {
		let error = null;
		let validate = false;
		switch (field.name) {
			case 'email':
				error = validateEmail(field.value);
				break;

			case 'password':
				error = validatePassword(field.value);
				break;
			case 'passwordConfirm':
				error = validatePasswordConfirm(field.value, password.value);
				break;

			default:
				break;
		}
		if (!error) {
			validate = true;
		}
		return {
			value: field.value,
			validate: validate,
			error: error,
		};
	};

	const onChange = ({ target }) => {
		let state	= validateInput(target);
		let fullState = currentState;
		if (target.name !== 'password' || passwordConfirm.value === '') {
			updateStateByName(target.name, state);
			fullState = { ...currentState, [target.name]: state};

		}
		else {
			const confirmValidate = validatePasswordConfirm(passwordConfirm.value, target.value);
			fullState = { ...currentState, 'password': state, 'passwordConfirm': {...passwordConfirm, error: confirmValidate, validate: !confirmValidate}};
			updateFullState(fullState);
		}
		setFormStatus(() => !Object.values(fullState).some((element) => !element.validate));
	};

	return (
		<form className="form" onSubmit={submitHandler}>
			<FormField
				name="email"
				label="Email"
				type="text"
				changeHandler={onChange}
				state={currentState} />
			<FormField
				name="password"
				label="Пароль"
				type="password"
				changeHandler={onChange}
				state={currentState} />
			<FormField
				name="passwordConfirm"
				label="Повторить пароль"
				type="password"
				changeHandler={onChange}
				state={currentState} />
			<button className="form-submit" type="submit" disabled={formStatus === false}>Зарегистрироваться</button>
		</form>
	);
}

