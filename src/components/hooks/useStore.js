import { useState } from 'react';

const INITIAL_STATE = {
	email: '',
	password: '',
	passwordConfirm: '',
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
