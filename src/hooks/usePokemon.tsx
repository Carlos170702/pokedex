import {useEffect, useState} from 'react';
import {pokemonApi} from '../api/pokemonApi';
import {PokemonFull} from '../interfaces/pokemonInterfaces';

export const usePokemon = (id: string) => {
  const [isLoading, seTisLoading] = useState(true);
  const [pokemon, setPokemon] = useState<PokemonFull>({} as PokemonFull);

  const loadPokemon = async () => {
    const resp = await pokemonApi.get<PokemonFull>(
      `https://pokeapi.co/api/v2/pokemon/${id}`,
    );

    setPokemon(resp.data);
    seTisLoading(false);
  };

  useEffect(() => {
    loadPokemon();
  }, []);

  return {
    isLoading,
    pokemon,
  };
};
