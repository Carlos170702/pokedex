import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../navigator/NavigatorScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FadeInImage} from '../components/FadeInImage';
import {usePokemon} from '../hooks/usePokemon';
import {PokemonDetails} from '../components/PokemonDetails';

interface Props extends StackScreenProps<RootStackParams, 'pokemon'> {}

export const PokemonScreen: React.FC<Props> = ({route, navigation}) => {
  const {
    color,
    simplePokemon: {name, id, picture},
  } = route.params;
  const {top} = useSafeAreaInsets();

  const {isLoading, pokemon} = usePokemon(id);

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          ...styles.headerContainer,
          backgroundColor: color,
        }}>
        {/* backButton */}
        <TouchableOpacity
          onPress={() => navigation.pop()}
          activeOpacity={0.8}
          style={{
            ...styles.backBottom,
            top: top + 20,
          }}>
          <Icon name="chevron-back-outline" color="white" size={35} />
        </TouchableOpacity>

        {/* pokebolaID */}
        <View style={{...styles.containerImageId, top: top + 5}}>
          <Image
            source={require('../assets/pokeID.png')}
            style={{
              ...styles.ImageId,
              top: top + 5,
            }}
          />
          <Text style={{...styles.pokemonID}}>{id}</Text>
        </View>

        {/* name */}
        <Text
          style={{
            ...styles.pokemonName,
            top: top + 50,
          }}>
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </Text>

        {/* image pokeball */}
        <Image
          style={{...styles.pokebolaImage}}
          source={require('../assets/pokebola-blanca.png')}
        />

        <FadeInImage uri={picture} style={styles.pokemomImage} />
      </View>

      {/* information and loading */}
      {isLoading ? (
        <View style={{...styles.loadingIndicator}}>
          <ActivityIndicator color={color} size={40} />
        </View>
      ) : (
        <PokemonDetails pokemon={pokemon} color={color} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 370,
    zIndex: 999,
    alignItems: 'center',
    borderBottomLeftRadius: 1000,
    borderBottomRightRadius: 1000,
  },
  backBottom: {
    position: 'absolute',
    left: 20,
  },
  pokemonName: {
    fontSize: 40,
    color: '#FFFFFF',
    alignSelf: 'flex-start',
    left: 20,
  },
  pokemonID: {
    position: 'absolute',
    color: 'black',
    top: 20,
    right: 15,
    fontSize: 15,
    backgroundColor: 'white',
    width: 30,
    height: 30,
    borderRadius: 50,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  pokebolaImage: {
    width: 250,
    height: 250,
    bottom: -50,
    opacity: 0.7,
  },
  pokemomImage: {
    width: 300,
    height: 300,
    position: 'absolute',
    bottom: -20,
  },
  containerImageId: {
    position: 'absolute',
    right: 20,
  },
  ImageId: {
    width: 60,
    height: 60,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
