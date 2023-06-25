import React from 'react';
import {ActivityIndicator, Image, Text, View} from 'react-native';
import {styles} from '../theme/AppTheme';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {usePokemonPaginated} from '../hooks/usePokemonPaginated';
import {FlatList} from 'react-native';
import {PokemonCard} from '../components/PokemonCard';

export const HomeScreen = () => {
  const {top} = useSafeAreaInsets();
  const {pokemonList, loadPokemons} = usePokemonPaginated();

  return (
    <>
      <Image
        source={require('../assets/pokebola.png')}
        style={styles.pokebolaBG}
      />

      <View style={{alignItems: 'center'}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={pokemonList}
          keyExtractor={({id}) => id}
          renderItem={({item}) => <PokemonCard pokemon={item} />}
          numColumns={2}
          // infinite scroll
          onEndReached={loadPokemons}
          onEndReachedThreshold={0.4}
          // componentes
          ListHeaderComponent={
            <Text
              style={{
                ...styles.title,
                ...styles.globalMargin,
                top: top + 20,
                marginBottom: top + 20,
                paddingBottom: 20,
              }}>
              Pokedex
            </Text>
          }
          ListFooterComponent={
            <ActivityIndicator
              color="grey"
              size={30}
              style={{marginVertical: 10, height: 100}}
            />
          }
        />
      </View>
    </>
  );
};
