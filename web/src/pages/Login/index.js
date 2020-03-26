import React, { useState } from 'react';
import RouterLink from '../../components/RouterLink';
import api from '../../services/api';
import { useHistory } from 'react-router-dom';
import './styles.css';
import heroes from '../../assets/heroes.png';
import logo from '../../assets/logo.svg';

export default function Login() {

    const [id, setId] = useState('');
    const history = useHistory();

    async function _handleSubmitLogin(e) {
        e.preventDefault();
        try {
            const response = await api.post('/auth', { id });
            localStorage.setItem('ong_id', id);
            localStorage.setItem('ong_name', response.data.name);
            history.push('/perfil')
        } catch (err) {
            alert('Falha ao efetuar o login. Tenta mais tarde');
        }
    }

    return (
        <div className="login-container">
            <section className="form">
                <img src={logo} alt="Logo" />
                <form onSubmit={_handleSubmitLogin}>
                    <h1>Faça seu login</h1>
                    <input placeholder="Seu ID" value={id} onChange={e => setId(e.target.value)} />
                    <button className="btn" type="submit"> Entrar</button>
                    <RouterLink route="/cadastro" title="Não tenho cadastro" />
                </form>
            </section>
            <img src={heroes} alt="Heroes" />
        </div>
    );
}
