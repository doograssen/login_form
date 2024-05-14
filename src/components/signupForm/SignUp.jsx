import { useState } from 'react';
import { FormField } from '../formField/FormField';
import { useStore } from '../hooks/useStore';
import { validateInput, validatePasswordConfirm } from "../../utils/validation";
import './signup.css';

const sendFormData = (formData) => {
	console.log(formData);
};



export const SignUp = () => {
	const {getState, updateStateByName, updateFullState} = useStore();
	const currentState = getState();
	const {password, passwordConfirm} = currentState;
	const [formStatus, setFormStatus] = useState(false);

	const submitHandler = (event) => {
		event.preventDefault();
		sendFormData(getState());
	};

	const onChange = ({ target }) => {
		let validationState;
		if (target.name === 'passwordConfirm') {
			validationState	= validateInput(target, password.value);
		}
		else {
			validationState	= validateInput(target);
		}
		let fullFormState = {...currentState};
		if (target.name !== 'password' || passwordConfirm.value === '') {
			updateStateByName(target.name, validationState);
			fullFormState = { ...currentState, [target.name]: validationState};

		}
		else {
			const confirmValidate = validatePasswordConfirm(passwordConfirm.value, target.value);
			fullFormState = { ...currentState, 'password': validationState, 'passwordConfirm': {...passwordConfirm, error: confirmValidate, validate: !confirmValidate}};
			updateFullState(fullFormState);
		}
		setFormStatus(() => !Object.values(fullFormState).some((element) => !element.validate));
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

