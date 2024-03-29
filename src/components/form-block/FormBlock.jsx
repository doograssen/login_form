export const FormBlock = ({name, label, changeHandler, blurHandler, state}) => {
	return (
		<div className="form-block">
			<label htmlFor={name}>{label}*</label>
			<input
				id={name}
				className="form-input"
				name={name}
				type="text"
				placeholder={label}
				value={state[name].value}
				onChange={changeHandler}
				onBlur={blurHandler}
			/>
			{state[name].error && <div className="form-error">{state[name].error}</div>}
		</div>
	);
}
