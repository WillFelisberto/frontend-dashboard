import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';
import { login } from '../../services/auth';

export default function SignIn() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const history = useHistory();

	const handleSignIn = async (e) => {
		e.preventDefault();
		if (!email || !password) {
			setError('Preencha e-mail e senha para continuar!');
		} else {
			try {
				const data = {
					...email,
					...password,
				};
				const response = await api.post('/auth/login', data);
				login(response.data.token);
				history.push('/dashboard');
			} catch (err) {
				setError(
					'Houve um problema com o login, verifique suas credenciais. T.T'
				);
			}
		}
	};

	return (
		<div className='container'>
			<form onSubmit={handleSignIn}>
				{error && <p>{error}</p>}
				<input
					type='email'
					placeholder='Endereço de e-mail'
					required
					onChange={(e) => setEmail({ email: e.target.value })}
				/>
				<input
					type='password'
					placeholder='Senha'
					required
					onChange={(e) => setPassword({ password: e.target.value })}
				/>
				<button type='submit'>Entrar</button>
				<hr />
				<Link to='/signup'>Criar conta grátis</Link>
			</form>
		</div>
	);
}
