const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 264
const limit = 88
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <button onclick="document.getElementById('id${pokemon.number}').style.display='block';
                         document.getElementById('about_${pokemon.name}').style.display='block';
                         document.getElementById('stats_${pokemon.name}').style.display='none';
                         document.getElementById('about_${pokemon.name}_button').classList.add('button-decoration');">
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>

                    <img src="${pokemon.photo}"
                        alt="${pokemon.name}">
                </div>
            </li>
        </button>

        <div id="id${pokemon.number}" class="modal">
            <div class="modal-container shadow animated-zoom ${pokemon.type}">

                <header class="header-container ${pokemon.type}"> 
                    <div class="header-details">

                        <div class="pokemon-details">
                            <span class="detail-name">${pokemon.name}</span>
                            <div class="pokemon-types">
                                <div class="types">
                                    ${pokemon.types.map((type) => `<div class="type ${type}">${type}</div>`).join('')}
                                </div>
                            </div>
                        </div>

                        <div class="pokemon-number">
                            <span class="pokemon-number">#${pokemon.number}</span>
                        </div>
                    </div>
                    <div class="image-container">
                        <img class="detail-image" src="${pokemon.photo}"
                            alt="${pokemon.name}">
                    </div>

                    <div class="top-style"></div>
                </header>

                <footer class="detail-content">
                    <div class="button-bar">
                        <button id="about_${pokemon.name}_button" class="tablink attrs-button" onclick="openPokemon(event, 'about_${pokemon.name}')">About</button>
                        <button id="stats_${pokemon.name}_button" class="tablink attrs-button" onclick="openPokemon(event, 'stats_${pokemon.name}')">Base Stats</button>
                    </div>

                    <div id="about_${pokemon.name}" class="container pokemon-detail">
                        <h3>Height</h3>
                        <p>${pokemon.height} m</p>
                        <h3>Weight</h3>
                        <p>${pokemon.weight} kg</p>
                        <h3>Abilities</h3>
                        <p>${pokemon.abilities.map((ability) => `<div class="ability ${ability}">${ability}</div>`).join('')}</p>
                    </div>

                    <div id="stats_${pokemon.name}" class="container pokemon-detail">
                        <h3>Stats</h3>
                        <div class="stats_container">
                            <div class="first_row">
                                <p>${pokemon.stats.map((stat) => `<div class="stat_name">${stat}</div>`).join('')}</p>
                            </div>
                            <div class="second_row">
                                <p>${pokemon.statsValue.map((statValue) => `
                                    <div class="stat_bar" style="width: ${statValue}%"></div>
                                    <div class="stat_value ${statValue}">${statValue}</div>
                                `).join('')}</p>
                            </div>
                        </div>
                    </div>

                    <div class="container close_button_container">
                        <button class="close_button" 
                        onclick="document.getElementById('id${pokemon.number}').style.display='none'">
                            Close
                        </button>
                    </div>
                </footer>

            </div>
        </div>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})