import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from '../screens/HomeScreen';
import {PokemonScreen} from '../screens/PokemonScreen';
import {SimplePokemon} from '../interfaces/pokemonInterfaces';

export type RootStackParams = {
  home: undefined;
  pokemon: {simplePokemon: SimplePokemon; color: string};
};

const Stack = createStackNavigator<RootStackParams>();

export const NavigatorScreen = () => {
  return (
    <Stack.Navigator
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white',
        },
      }}>
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="pokemon" component={PokemonScreen} />
    </Stack.Navigator>
  );
};
