import React, { useState, useEffect } from 'react';
import { getToken } from '../../services/auth';
import './styles.css';
import Switch from './Switch';
import {
	AbrirPortao,
	FechaPortao,
	DesligaAlarme,
	LigaAlarme,
	GetDashboard,
} from '../../services/controle';

export default function Dashboard() {
	const [Dados, setDados] = useState();
	const [loading, setLoading] = useState(false);

	const [checkPortao, setCheckPortao] = useState(false);
	const [checkAlarme, setAlarme] = useState(false);

	useEffect(() => {
		const getDados = async () => {
			const response = await GetDashboard(getToken());

			setDados(response);
			setLoading(true);
		};

		getDados();
	}, [checkPortao || checkAlarme]);

	const handleChange = async (e, tipo) => {
		switch (tipo) {
			case 'Portao':
				if (e.target.checked === true) {
					const retorno = await AbrirPortao(getToken());
					if (retorno.status === 200) setCheckPortao(true);
				} else {
					const retorno = await FechaPortao(getToken());
					if (retorno.status === 200) setCheckPortao(false);
				}
				break;
			case 'Alarme':
				if (e.target.checked === true) {
					const retorno = await LigaAlarme(getToken());
					if (retorno.status === 200) setAlarme(true);
				} else {
					const retorno = await DesligaAlarme(getToken());
					if (retorno.status === 200) setAlarme(false);
				}
				break;

			default:
				break;
		}
	};

	return (
		<div className='container'>
			{loading ? (
				<div className='row'>
					<Switch
						tipo='Portão'
						checado={Dados.PortaoData}
						handleChange={(e) => handleChange(e, 'Portao')}
					/>
					<Switch
						tipo='Alarme'
						checado={Dados.AlarmeData}
						handleChange={(e) => handleChange(e, 'Alarme')}
					/>
				</div>
			) : null}
		</div>
	);
}
