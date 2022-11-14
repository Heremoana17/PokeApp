import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import * as commonStyle from '../../utils/commonStyle';
import {Card} from '@rneui/themed';

const PokemonDetailsView = props => {
  const {id, name, src} = props.route.params;

  //Pour recupérer plus de detail sur le pokemon
  const [weight, setWeight] = useState();
  const [height, setHeight] = useState();
  const [arrayTypes, setArrayTypes] = useState([]);

  const fetchPokemonDetails = idPokemon => {
    const url = 'https://pokeapi.co/api/v2/pokemon/' + idPokemon;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setWeight(data.weight);
        setHeight(data.height);
        setArrayTypes(
          data.types.map(item => {
            return item.type.name; //pour ne retourner que le
          }),
        );
      })
      .catch(error =>
        console.log('Impossible de telecharger la liste des pokemons', error),
      );
  };
  // important de préciser l'id en paramettre pour précisé de quel pokemon il s'agit
  useEffect(() => {
    fetchPokemonDetails(id);
  }, [id]);

  return (
    <View>
      <Card>
        <Card.Title>{name.toUpperCase()}</Card.Title>
        <Card.Divider />
        <Image source={{uri: src}} style={styles.imagePokemon} />
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <Text>height: {height}</Text>
          <Text>weight: {weight}</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Text>
            {arrayTypes ? <Text>Types: {arrayTypes.join(', ')}</Text> : ''}
          </Text>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  imagePokemon: {
    width: 400,
    height: 400,
  },
  details_container: {
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 10,
    ...commonStyle.elevationButton,
  },
});

export default PokemonDetailsView;
