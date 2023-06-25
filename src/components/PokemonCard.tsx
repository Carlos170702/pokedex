import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {SimplePokemon} from '../interfaces/pokemonInterfaces';
import {Image} from 'react-native';
import {FadeInImage} from './FadeInImage';
import ImageColors from 'react-native-image-colors';
import {useNavigation} from '@react-navigation/native';

interface Props {
  pokemon: SimplePokemon;
}

const windowWidth = Dimensions.get('window').width;

export const PokemonCard: React.FC<Props> = ({pokemon}) => {
  const [bgColor, setBgColor] = useState('grey');
  const isMounted = useRef(true);
  const navigation = useNavigation();

  const {id, name, picture} = pokemon;

  useEffect(() => {
    ImageColors.getColors(picture, {
      fallback: 'grey',
    }).then(colors => {
      // validamos el valor de isMounted si esta en false
      if (!isMounted.current) return;

      if (colors.platform === 'android') setBgColor(colors.dominant || 'grey');
      if (colors.platform === 'ios') setBgColor(colors.background || 'grey');
    });

    // esto es de el useEffect cuando se desmonte o se rompa el componente se ejecutara esto
    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate('pokemon', {simplePokemon: pokemon, color: bgColor})
      }>
      <View
        style={{
          ...styles.cardContainer,
          width: windowWidth * 0.4,
          backgroundColor: bgColor,
        }}>
        <View>
          <Text style={{...styles.name}}>{`${name}\n#${id}`}</Text>
        </View>

        <View style={{...styles.pokebolaContainer}}>
          <Image
            style={{...styles.pokebola}}
            source={require('../assets/pokebola-blanca.png')}
          />
        </View>

        <FadeInImage uri={picture} style={styles.pokemonImage} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 10,
    height: 120,
    marginBottom: 25,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  name: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    top: 20,
    left: 10,
  },
  pokebolaContainer: {
    width: 100,
    height: 100,
    position: 'absolute',
    bottom: 0,
    right: 0,
    overflow: 'hidden',
  },
  pokebola: {
    width: 100,
    height: 100,
    position: 'absolute',
    bottom: -20,
    right: -20,
    opacity: 0.6,
  },
  pokemonImage: {
    position: 'absolute',
    width: 110,
    height: 110,
    right: -8,
    bottom: -8,
  },
});
