import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {listPokeOriginal} from '../../data/PokelonList';
import * as commonStyle from '../../utils/commonStyle'; //import tous depuis commonStyle
import {getRamdomInt, shuffle} from '../../utils/utils';

// pour ajouter un compter au pokedex
const HomeView = props => {
  const [counterPokedex, setCounterPokedex] = useState(0);

  const onNext = () => {
    if (counterPokedex === listPoke.length - 1) {
      setCounterPokedex(0);
    } else {
      setCounterPokedex(counterPokedex + 1);
    }
  };
  const onPrevious = () => {
    if (counterPokedex === 0) {
      setCounterPokedex(listPoke.length - 1);
    } else {
      setCounterPokedex(counterPokedex - 1);
    }
  };

  //   pour appeler le nom du pokemon
  const getNamePokemon = namePokemon => {
    console.log('My name is', namePokemon);
    console.log('mon voisin est', listPoke[counterPokedex + 1].name);
  };

  // fonction pour la navigation
  const onViewPokemonDetails = (idPokemon, namePokemon, srcPokemon) => {
    props.navigation.navigate('Details', {
      id: idPokemon,
      name: namePokemon,
      src: srcPokemon,
    });
  };

  // pourmodifier le level des pokemon
  const [listPoke, setListPoke] = useState([]);
  // le loader
  const [isDataReceived, setIsDataReceived] = useState(false);

  const modifyLevel = () => {
    const newArr = [...listPoke];
    newArr[counterPokedex].level = listPoke[counterPokedex].level + 1;
    setListPoke(newArr);
  };

  //   recuperer les pokemon sur l'API
  const fetchPokemon = () => {
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=151';
    fetch(url)
      .then(res => res.json())
      .then(res => {
        const newArray = res.results.map((pokemon, index) => {
          let indexPokedex = index + 1;
          pokemon.id = indexPokedex;
          pokemon.level = getRamdomInt(0, 50);
          pokemon.isMale = true;
          pokemon.src =
            'https://pokeres.bastionbot.org/images/pokemon/' +
            indexPokedex +
            '.png';
          return pokemon;
        });
        setListPoke(shuffle(newArray));
        // le loader
        setIsDataReceived(true);
      })
      .catch(err =>
        console.log('Impossible de telecherger la liste de pokemon', err),
      );
  };

  useEffect(() => {
    fetchPokemon();
  }, []);
  useEffect(() => {
    if (counterPokedex === 5) {
      alert('5 poke');
    }
  }, [counterPokedex]);

  return (
    <View style={styles.main_container}>
      <View style={styles.titleContainer}>
        <Text style={styles.textTitle}>Pokedex Application</Text>
      </View>

      <View style={styles.pokemonContainer}>
        <Text>The value of counter is : {counterPokedex}</Text>
        {/* le loader */}
        {isDataReceived ? (
          <PokemonInfo
            id={listPoke[counterPokedex].id}
            name={listPoke[counterPokedex].name}
            level={listPoke[counterPokedex].level}
            isMale={listPoke[counterPokedex].isMale}
            src={listPoke[counterPokedex].src}
            onClickPokemon={onViewPokemonDetails}
          />
        ) : (
          <ActivityIndicator size={'large'} />
        )}
      </View>
      <Button onPress={modifyLevel} title="level up" />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonNextPrevious}
          onPress={() => onPrevious()}>
          <Image
            source={require('../../assets/icons/left.png')}
            style={styles.iconButton}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonNextPrevious}
          onPress={() => onNext()}>
          <Image
            source={require('../../assets/icons/right.png')}
            style={styles.iconButton}
          />
        </TouchableOpacity>
      </View>

      {/* <FlatList
        data={listPoke}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <PokemonInfo
            item={item.id}
            name={item.name}
            level={item.level}
            isMale={item.isMale}
            src={item.src}
          />
        )}
      /> */}
    </View>
  );
};

const PokemonInfo = ({id, name, level, isMale, src, onClickPokemon}) => {
  return (
    <>
      <Text style={styles.textAppeared}>A new Pokemon appeared</Text>
      <TouchableOpacity onPress={() => onClickPokemon(id, name, src)}>
        <Image source={{uri: src}} style={styles.imagePokemon} />
      </TouchableOpacity>
      <Text>
        His name is {name}, his level is {level}.
        <Text>
          {isMale ? <Text>This is a male</Text> : <Text>This is a Female</Text>}
        </Text>
      </Text>
    </>
  );
};

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  textTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'rgb(200, 0, 0)',
    marginTop: 30,
  },
  pokemonContainer: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  imagePokemon: {
    width: 200,
    height: 200,
  },
  iconButton: {
    width: 40,
    height: 40,
  },
  textAppeared: {
    marginBottom: 20,
    fontSize: 18,
    fontStyle: 'italic',
  },
  buttonNextPrevious: {
    ...commonStyle.elevationButton,
    ...commonStyle.roundedButton,
  },
});

export default HomeView;
