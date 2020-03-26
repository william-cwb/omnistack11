import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi'
import './styles.css';
import logo from '../../assets/logo.svg';
import api from '../../services/api'


export default function Profile() {

    const ongName = localStorage.getItem('ong_name');
    const ongId = localStorage.getItem('ong_id');
    const [incidents, setIncidents] = useState([]);
    const history = useHistory();
    const _header = { headers: { Authorization: ongId } }

    useEffect(() => {
        api.get('/profile', _header).then(response => {
            setIncidents(response.data);
        }).catch(err => console.log(err));
    }, [ongId])

    async function _onDeleteIncident(id) {
        try {
            await api.delete(`/incident/${id}`, _header)
            setIncidents(incidents.filter(incident => incident.id !== id));
        } catch (err) {
            alert('Falha ao deletar caso, tente mais tarde.');
        }
    }

    function _handleLogout() {
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logo} alt="Logo" />
                <span>Bem-vindo (a), {ongName}</span>
                <Link className="btn" to="incidents/new">Cadastrar novo caso</Link>
                <button onClick={_handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>
            <h1>Casos cadastrados</h1>
            <ul>

                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO: </strong>
                        <p>{incident.title}</p>
                        <strong>DESCRIÇÃO: </strong>
                        <p>{incident.description}</p>
                        <strong>DESCRIÇÃO: </strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>
                        <button onClick={() => _onDeleteIncident(incident.id)}><FiTrash2 size={20} color="#A8A8B3" /></button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
