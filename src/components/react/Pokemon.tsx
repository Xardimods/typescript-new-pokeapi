import { useEffect, useState } from "react"
import { type AllPokemonResponse } from "../../types/pokemon"

interface Props {
  name: string | undefined
}

export const Pokemon: React.FC<Props> = ({ name }) => {

  const [pokemon, setPokemon] = useState<AllPokemonResponse | null>(null)

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((res) => res.json())
      .then((data) => setPokemon(data as AllPokemonResponse))
      .catch((error) => console.error(error))
  }, [name]);

  return (
    <section>
      <a href="/">Volver</a>
      <h2>Your Pokémon is {pokemon?.name} </h2>
    </section>
  )
}