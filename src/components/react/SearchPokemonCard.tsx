import { useEffect, useState } from "react"
import { type AllPokemonResponse } from "../../types/pokemon"

interface Props {
  name: string | undefined
}

export const SearchPokemonCard: React.FC<Props> = ({ name }) => {

  const [pokemon, setPokemon] = useState<AllPokemonResponse | null>(null)

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((res) => res.json())
      .then((data) => setPokemon(data as AllPokemonResponse))
      .catch((error) => {
        if (error) {
          window.location.href = "/404"
        }
      })
  }, [name]);

  return (
    <li
      key={pokemon?.name}
      className="cursor-pointer font-bold border-2 border-slate-800 bg-slate-900 text-slate-200 w-[250px] m-auto mt-1 px-5 py-1 rounded-md h-fit text-center hover:bg-slate-700 hover:text-slate-300 transition-colors"
    >
      <a
        href={`/pokemons/${pokemon?.name}`}
        className="flex flex-row justify-between items-center"
      >
        <img width={60} height={60} src={`${pokemon?.sprites.front_default}`} alt={`${pokemon?.name} Picture`} />
        {pokemon?.name}</a>
    </li>
  )
}