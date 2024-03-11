import React, { useEffect, useState } from "react"
import { type Result, type PokemonResponse } from "../../types/names"
import { SearchPokemonCard } from "./SearchPokemonCard"

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

  // const pokemonNamesArray = pokemonNames && searchValue && (pokemonNames.toSorted().map(pokemon => {
  //   if (pokemon.name.includes(searchValue)) {
  //     const name = pokemon.name
  //     return <li key={name}><a href={`/pokemons/${name}`}>{name}</a></li>
  //   }
  // }))

  const pokemonNamesArray = pokemonNames && searchValue && pokemonNames
    .filter(pokemon => pokemon.name.includes(searchValue))
    .slice(0, 5) // Obtener los primeros cinco elementos
    .map(pokemon => (
      <SearchPokemonCard key={pokemon.name} name={pokemon.name} />
    ))

  return (
    <div>
      <div className="flex flex-row justify-center">
        <label htmlFor="searchPokemon" className="mb-4 text-slate-300">
          <input
            type="search"
            name="searchPokemon"
            id="searchPokemon"
            className="w-[250px] px-2.5 py-4 border-2 border-slate-400 rounded-md bg-slate-900"
            placeholder="Search Pokémon"
            onChange={handleChangeName}
          />
        </label>
      </div>
      <ul>
        {
          pokemonNamesArray
        }
      </ul>
    </div >
  )
}