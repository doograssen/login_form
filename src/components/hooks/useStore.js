import { useState } from 'react';

const INITIAL_STATE = {
	email: {
		value: '',
		validate: false,
		error: null,
	},
	password: {
		value: '',
		validate: false,
		error: null
	},
	passwordConfirm: {
		value: '',
		validate: true,
		error: null
	}
};

export const useStore = () => {
	const [state, setState] = useState(INITIAL_STATE);
	return {
		getState: () => state,
		updateState: (fieldName, newValue) => {
			setState({ ...state, [fieldName]: newValue });
		},
	};
};
