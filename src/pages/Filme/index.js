import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from '../../services/api';
import './style.css';

function Filme() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        async function loadFilme() {
            await api.get(`/movie/${id}`, {
                params:{
                    api_key: "fd5323a78d165650b73a59a1fe5cbc9c",
                    language: "pt-BR",
                }
            })
            .then((response) => {
                setFilme(response.data);
                setLoading(false);
            })
            .catch(() => {
                console.log("Filme não encontrado!");
                navigate("/", { replace: true });
                return;
            })
        }
        loadFilme();

        return () => {
            console.log("Componente foi desmontado!");
        }
    }, [navigate, id])

    if (loading) {
        return(
            <div className="loading">
                <h2>Carregando detalhes do filme...</h2>
            </div>
        )
    }
    
    return(
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />
            <h3>Sinopse:</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average} / 10</strong>
            <div className="area-buttons">
                <button>Salvar</button>
                <button>
                    <a href={`https://youtube.com/results?search_query=${filme.title} Trailer`} target="_blank" rel="noreferrer">Trailer</a>
                </button>
            </div>
        </div>
    )
}

export default Filme;