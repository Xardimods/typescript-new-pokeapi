import { useEffect, useState } from "react"
import { type AllPokemonResponse } from "../../types/pokemon"

interface Props {
  name: string | undefined
}

export const Pokemon: React.FC<Props> = ({ name }) => {

  const [pokemon, setPokemon] = useState<AllPokemonResponse | null>(null)

  const animatedImage = pokemon?.sprites.versions?.["generation-v"]["black-white"].animated?.front_default ?? pokemon?.sprites.front_default
  const staticImage = pokemon?.sprites.front_default

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
    <main className="text-slate-200 mt-10 mb-5">
      <section className="text-center">
        <a className="text-lg bg-slate-200 py-2 px-3 rounded-md text-slate-900 font-bold" href="/">Go Back!</a>
        <h2 className="font-bold text-3xl mb-5 mt-5 max-md:px-4">
          Your Pokémon is: {pokemon?.name.toLocaleUpperCase()}
        </h2>
        <div className="mb-5">
          <img className="m-auto" width={200} height={200} src={staticImage} alt={pokemon?.name} />

          <p className="text-xl font-bold mb-2">Types:</p>
          <ul className="flex mt-2 justify-center gap-x-3 uppercase font-bold">
            {
              pokemon?.types.map(type => {
                return <li key={type.type.name}>{type.type.name}</li>
              })
            }
          </ul>
        </div>

        <div className="flex flex-col gap-y-10">

          <div className="grid w-fit m-auto">
            <p className="text-xl font-bold mb-2">Basic Information:</p>
            <div className="flex flex-col mt-3 gap-y-1 w-fit text-center">
              <p className="bg-slate-200 w-fit px-2 py-1  text-slate-800 font-bold rounded-md">Height: <span>{pokemon?.height}Ft</span></p>
              <p className="bg-slate-200 w-fit px-2 py-1  text-slate-800 font-bold rounded-md">Weight: <span>{pokemon?.weight}Kg</span></p>
              <p className="bg-slate-200 w-fit px-2 py-1  text-slate-800 font-bold rounded-md">ID: <span>{pokemon?.id}</span></p>
            </div>
          </div>

          <div className="w-fit mx-auto">
            <p className="text-xl font-bold mb-2">Base Stats:</p>
            <ul className="grid grid-cols-2 gap-y-2 gap-x-2">
              {
                pokemon?.stats.map(stat => {
                  return (
                    <li
                      key={stat.stat.name}
                      className="bg-slate-300 text-slate-900 rounded-md font-bold p-1"
                    >
                      {stat.stat.name}: {stat.base_stat}
                    </li>
                  )
                })
              }
            </ul>
          </div>

          <div>
            <p className="text-xl font-bold mb-2">Abilities To Learn:</p>
            <ul className="flex flex-col gap-y-2">
              {
                pokemon?.abilities.map(ability => {
                  return (
                    <li
                      className="bg-slate-300 text-slate-900 rounded-md font-bold px-2 py-1 w-fit m-auto"
                      key={ability.ability.name}
                    >
                      {ability.ability.name}
                    </li>
                  )
                })
              }
            </ul>
          </div>

          <div className="m-auto">
            <p className="text-xl font-bold mb-2">Movements:</p>
            <ul className="grid grid-cols-3 px-10 gap-3">
              {
                pokemon?.moves.map(move => {
                  return (
                    <li
                      className="w-[200px] px-5 py-1 bg-slate-300 text-slate-900 rounded-md font-bold p-1 max-md:w-full"
                      key={move.move.name}>
                      {move.move.name}
                    </li>
                  )
                })
              }
            </ul>
          </div>

        </div>
      </section>
    </main>
  )
}