const ERRORS = {
	WRONG_EMAIL: 'неверный формат почты',
	EMPTY: 'Поле обязательно для заполнения',
	SHORT_PASSWORD: 'слишком короткий пароль',
	FORMAT_PASSWORD: 'пароль должен содержать латтинские буквы, цифры и символы',
	MATCHING_PASSWORDS: 'пароли не совпадают',
};



export const validateEmail = (value) => {
	let errorMessage = null;
	if (!/[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+/.test(value)) {
		errorMessage = ERRORS.WRONG_EMAIL;
	}
	if (!value) {
		errorMessage = ERRORS.EMPTY;
	}
	return errorMessage;
};

export const validatePassword = (value) => {
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

export const validatePasswordConfirm = (value, compareValue) => {
	let errorMessage = null;
	if (value !== compareValue && compareValue !== '') {
		errorMessage = ERRORS.MATCHING_PASSWORDS;
	}
	return errorMessage;
};


export const validateInput = (field, additionalValue=null) => {
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
			error = validatePasswordConfirm(field.value, additionalValue);
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
