import {useEffect, useRef, useState} from 'react';
import {pokemonApi} from '../api/pokemonApi';
import {
  PokemonPaginatedResponse,
  Result,
  SimplePokemon,
} from '../interfaces/pokemonInterfaces';

export const usePokemonPaginated = () => {
  const [pokemonList, setPokemonList] = useState<SimplePokemon[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const nextPageURL = useRef('https://pokeapi.co/api/v2/pokemon?limit=40');

  const loadPokemons = async () => {
    setIsLoading(true);
    const resp = await pokemonApi.get<PokemonPaginatedResponse>(
      nextPageURL.current,
    );

    nextPageURL.current = resp.data.next;

    mapPokemons(resp.data.results);
  };

  const mapPokemons = (pokemoList: Result[]) => {
    const newPokemomList: SimplePokemon[] = pokemoList.map(({name, url}) => {
      const urlParts = url.split('/');
      const id = urlParts[urlParts.length - 2];
      // const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
      const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;

      return {id, name, picture};
    });

    setPokemonList([...pokemonList, ...newPokemomList]);
    setIsLoading(false);
  };

  useEffect(() => {
    loadPokemons();
  }, []);

  return {
    // properties
    isLoading,
    pokemonList,
    // funciones
    loadPokemons,
  };
};
