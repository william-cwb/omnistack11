import React, { useState } from 'react';
import RouterLink from '../../components/RouterLink';
import { useHistory } from 'react-router-dom';
import './styles.css';
import logo from '../../assets/logo.svg';
import api from '../../services/api'


export default function NewIncident() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const ongId = localStorage.getItem('ong_id');
    const history = useHistory();


    async function _handleSubmitNewIncident(event) {
        event.preventDefault();
        const _header = { headers: { Authorization: ongId } }
        const data = {
            title,
            description,
            value,
        }

        try {
            await api.post('/incident', data, _header);
            history.push('/perfil');
        } catch (err) {
            console.log(err);
            alert('Falha ao salvar caso, tente novamente mais tarde.');
        }
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logo} alt="Be The Hero" />
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreve o caso detalhadamente para encontrar um herói para resolver isso.</p>
                    <RouterLink route="/perfil" title="Voltar para a Home" iconLeft={true} />
                </section>
                <form onSubmit={_handleSubmitNewIncident}>
                    <input type="text"
                        placeholder="Título do caso"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea
                        placeholder="Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input type="text"
                        placeholder="Valor em reais"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                    <button className="btn" type="submit">Cadastrar</button>
                </form>

            </div>
        </div>
    );
}
