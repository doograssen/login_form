import { FormBlock } from "../form-block/FormBlock";
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
	const {password, passwordConfirm} = getState();
	const submitHandler = (event) => {
		event.preventDefault();
		if (password.value !== passwordConfirm.value || passwordConfirm.value === '') {
			updateState('passwordConfirm', {...currentState['passwordConfirm'], error: ERRORS.MATCHING_PASSWORDS, validate: false});
		}
		else if (!Object.values(currentState).some((element) => !element.validate)) {
			sendFormData(getState());
		}
	};
	const onChange = ({ target }) => {
		updateState(target.name, { ...currentState[target.name], value: target.value, error: null});
	};

	const onBlurPassConfirm = ({target}) => {
		let newError = null;
		let newValidate = false;
		if (target.value !== password.value) {
			newError = ERRORS.MATCHING_PASSWORDS;
		}
		else if (target.value !== ''){
			newValidate = true;
		}
		updateState(target.name, { value: target.value, error: newError, validate: newValidate});
	}

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
			<FormBlock
				name="email"
				label="Email"
				changeHandler={onChange}
				blurHandler={onEmailBlur}
				state={currentState} />
			<FormBlock
				name="password"
				label="Пароль"
				changeHandler={onChange}
				blurHandler={onPasswordBlur}
				state={currentState} />
			<FormBlock
				name="passwordConfirm"
				label="Повторить пароль"
				changeHandler={onChange}
				blurHandler={onBlurPassConfirm}
				state={currentState} />
			<button className="form-submit" type="submit">Зарегистрироваться</button>
		</form>
	);
}

