import React, { useState } from 'react';
import RouterLink from '../../components/RouterLink';
import { useHistory } from 'react-router-dom';
import './styles.css';
import logo from '../../assets/logo.svg';
import api from '../../services/api';



export default function Register() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory();

    async function _handleSubmitRegister(event) {
        event.preventDefault();

        const data = {
            name,
            email,
            whatsapp,
            city,
            uf
        }
        try {
            const response = await api.post('/ong', data);
            alert(`Seu ID de acesso: ${response.data.id}`);
            history.push('/')
        } catch (err) {
            console.log(err);
            alert(`Falha de comunicação com o servidor`);
        }
    }


    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logo} alt="Be The Hero" />
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma, e ajuda pessoa a encontrarem os casos da sua ONG.</p>
                    <RouterLink route="/" title="Voltar ao login" iconLeft={true} />
                </section>
                <form onSubmit={_handleSubmitRegister}>
                    <input
                        placeholder="Nome da ONG"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <input
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        placeholder="Whatsapp"
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}
                    />
                    <div className="input-group">
                        <input
                            placeholder="Cidade"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        />
                        <input
                            placeholder="UF"
                            style={{ width: 80 }}
                            value={uf}
                            onChange={e => setUf(e.target.value)}
                        />
                    </div>
                    <button className="btn" type="submit">Cadastrar</button>
                </form>

            </div>
        </div>
    );
}
