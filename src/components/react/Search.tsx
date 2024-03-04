import React, { useEffect, useState } from "react"
import { type Result, type PokemonResponse } from "../../types/names"

export const Search: React.FC = () => {

  const [searchValue, setSearchValue] = useState("")
  const [pokemonNames, setPokemonNames] = useState<Result[]>([])

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let newSearchValue = e.target.value.toLowerCase()
    setSearchValue(newSearchValue)
  }

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
      .then(res => res.json())
      .then((data) => setPokemonNames((data as PokemonResponse).results))
      .catch(err => console.error(err))
  }, [])

  return (
    <div>
      <label htmlFor="searchPokemon">Search</label>
      <input
        type="search"
        name="searchPokemon"
        id="searchPokemon"
        onChange={handleChangeName}
      />
      <ul>
        {
          pokemonNames && searchValue && (pokemonNames.map(pokemon => {
            if (pokemon.name.includes(searchValue)) {
              return <li key={pokemon.name}><a href={`pokemons/${pokemon.name}`}>{pokemon.name}</a></li>
            }
          }))
        }
      </ul>
    </div>
  )
}