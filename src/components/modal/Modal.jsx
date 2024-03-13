import './modal.css';

export const Modal = ({state}) => {

	console.log(state);
	return (
		<div className={`modal ${state ? "modal--show" : ""}`}>

		</div>
	);
}
