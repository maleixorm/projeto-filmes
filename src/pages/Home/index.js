import { useEffect, useState } from "react";
import api from "../../services/api";

// movie/now_playing?api_key=fd5323a78d165650b73a59a1fe5cbc9c&language=pt-BR

function Home() {
    const [filmes, setFilmes] = useState([]);

    useEffect(() => {
        async function loadFilmes() {
            const response = await api.get("movie/now_playing", {
                params:{
                    api_key: "fd5323a78d165650b73a59a1fe5cbc9c",
                    language: "pt-BR",
                    page: 1
                }
            });

            console.log(response.data.results);
        }

        loadFilmes();

    }, [])

    return(
        <div>
            <h1>Seja bem-vindo à Home!</h1>
        </div>
    )
}

export default Home;