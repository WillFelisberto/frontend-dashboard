import api from './api';

export const AbrirPortao = async (token) => {
	return await api.post('/portao/abrir', 'true', token);
};

export const FechaPortao = async (token) => {
	return await api.post('/portao/fechar', 'false', token);
};
export const LigaAlarme = async (token) => {
	return await api.post('/alarme/ligar', 'true', token);
};

export const DesligaAlarme = async (token) => {
	return await api.post('/alarme/desligar', 'false', token);
};

export const GetDashboard = async (token) => {
	return await api.get('/dashboard', 'false', token);
};
