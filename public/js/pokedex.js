const pokeList = document.querySelector('#pokemon-list')
const buscador = document.querySelector('#buscador')

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

            // Creamos la etiqueta LI
            let pokemonLi = document.createElement('li');

            //Le agregamos estilos, un ID unico y un innerHTML
            pokemonLi.style = 'padding: 2%; margin: 2%; list-style-type: none;';
            pokemonLi.id = `pokemon-${pokemon.id}`;
            pokemonLi.classList.add('pokemon')

            const pokemonImg = document.createElement('img')
            pokemonImg.src = pokemon.img;
            pokemonLi.appendChild(pokemonImg)
            
            const pokemonName = document.createElement('h2');
            pokemonName.innerText = pokemon.name;
            pokemonLi.appendChild(pokemonName);

            const pokemonType = document.createElement('p');
            pokemonType.innerText = pokemon.type;
            pokemonLi.appendChild(pokemonType);
            
            //console.log(pokemonLi);
            
            //Al UL le agegamos cada LI como hijo
            pokeList.appendChild(pokemonLi);

        } catch (error) {
            console.log(error)
        }
    }
}

buscador.addEventListener('input', e => {
    searchPokemon(e.target.value);
})

const searchPokemon = (name) =>{
    const pokemonList = Array.from(document.querySelectorAll('.pokemon h2'));

    pokemonList.forEach(pokemonName =>{
        // Si el texto del h2 no contiene la busqueda...
        if(!pokemonName.innerText.includes(name)){
            // Al padre del h2 actual le ponemos display none
            pokemonName.parentElement.style.display = 'none';
        } else {
            pokemonName.parentElement.style.display = 'list-item';
        }
    })

    //const filterList = pokemonList.filter(pokemon => pokemon.innerText.includes(name))
}

fetchPokemons()