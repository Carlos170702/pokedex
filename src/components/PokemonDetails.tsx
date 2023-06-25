import {View, Text, StyleSheet, FlatList} from 'react-native';
import React from 'react';
import {PokemonFull} from '../interfaces/pokemonInterfaces';
import {ScrollView} from 'react-native-gesture-handler';
import {Image} from 'react-native';

interface Props {
  pokemon: PokemonFull;
  color: string;
}

export const PokemonDetails: React.FC<Props> = ({pokemon, color}) => {
  return (
    <ScrollView
      style={{
        // lo que hace el absoluteFillObjeect ocupa toda la pantalla sin importar que tenga por encima
        ...StyleSheet.absoluteFillObject,
      }}>
      <View style={{...styles.container, marginTop: 400, gap: 15}}>
        {/* types */}
        <View>
          <Text style={{...styles.title, color: color}}>Types</Text>

          <View
            style={{
              flexDirection: 'row',
              marginLeft: 10,
              gap: 20,
              alignItems: 'center',
            }}>
            {pokemon.types.map(({type}, index) => (
              <View
                key={`${index}${type.name}`}
                style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                <View style={{width: 10, height: 10, backgroundColor: color}} />
                <Text
                  style={{
                    ...styles.regularText,
                  }}>
                  {type.name}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* information */}
        <View
          style={{
            padding: 10,
            backgroundColor: 'white',
            borderRadius: 20,
            shadowColor: color,
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 0.25,
            shadowRadius: 100,
            elevation: 5,
          }}>
          <Text style={{...styles.title, color: color, textAlign: 'center'}}>Information</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 10,
            }}>
            {/* peso */}
            <View style={{...styles.containertipoIcon, borderColor: 'black'}}>
              <Image
                source={require('../assets/valor-1.png')}
                style={{...styles.iconStadistics}}
              />
              <Text>{pokemon.weight} hg</Text>
            </View>
            {/* altura */}
            <View style={{...styles.containertipoIcon}}>
              <Image
                source={require('../assets/up-arrow.png')}
                style={{...styles.iconStadistics}}
              />
              <Text>{pokemon.height} dm</Text>
            </View>
            {/* base_experience */}
            <View style={{...styles.containertipoIcon}}>
              <Image
                source={require('../assets/insignia-1.png')}
                style={{...styles.iconStadistics}}
              />
              <Text>{pokemon.base_experience} XP</Text>
            </View>
          </View>
        </View>
        {/* abilities */}
        <View style={{marginTop: 10}}>
          <Text style={{...styles.title, color: color}}>Abilities</Text>
          <View style={{flexDirection: 'row', gap: 10}}>
            {pokemon.abilities.map(({ability}, index) => (
              <View
                key={`${index}${ability.name}`}
                style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                <View style={{width: 10, height: 10, backgroundColor: color}} />
                <Text
                  style={{
                    ...styles.regularText,
                  }}>
                  {ability.name}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* <FlatList data={pokemon.sprites} keyExtractor={()=> } /> */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
  },
  regularText: {
    fontSize: 18,
  },
  containertipoIcon: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  textSec: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  iconStadistics: {
    width: 25,
    height: 25,
    objectFit: 'cover',
  },
});
