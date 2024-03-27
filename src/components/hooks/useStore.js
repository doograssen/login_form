import { useState } from 'react';

const INITIAL_STATE = {
	email: {
		value: '',
		error: null
	},
	password: {
		value: '',
		error: null
	},
	passwordConfirm: {
		value: '',
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
