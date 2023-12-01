const pokeList = document.getElementById('pokemon-list')

const fetchPokemons = async () => {
    const apiEndpoint = 'https://pokeapi.co/api/v2/pokemon/';

    for (let i = 1; i <= 150; i++) {
        try {
            const response = await fetch(apiEndpoint + i);
            const pokemonData = await response.json();

            const pokemon ={
                name: pokemonData.name,
                img: pokemonData.sprites.front_default,
                type: pokemonData.types.map(currentTypes => currentTypes.type.name).join(', '),
                id: pokemonData.id
            }

            // Crear las etiquetas HTML desde JS, y despues agregarlas al DOM (HTML)
            let pokemonLi = document.createElement('li');
            pokemonLi.innerHTML = pokemon.name
            
            console.log(pokemonLi)
            //pokeList.innerHTML += `<li>${pokemon.name}</li>`;
     
        } catch (error) {
            console.log(error)
        }
    }
}

fetchPokemons()