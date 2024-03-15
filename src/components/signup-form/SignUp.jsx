import { useState } from "react";
import './signup.css';

export const SignUp = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordRepeat, setPasswordRepeat] = useState('');
	return (
		<form className="form">
			<input className="form-input" name="email" type="email" placeholder="Email" value={email} onChange={({target}) => setEmail(target.value)} />
			<input className="form-input" name="password" type="password" placeholder="Пароль" value={password} onChange={({target}) => setPassword(target.value)}/>
			<input className="form-input" name="password" type="password" placeholder="Повторить пароль" value={passwordRepeat} onChange={({target}) => setPasswordRepeat(target.value)}/>
			<button className="form-submit" type="submit">Отправить</button>
		</form>
	);
}
