import React from 'react';
import HomeView from './views/HomeView/HomeView';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PokemonDetailsView from './views/PokemonDetailsView/PokemonDetailsView';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MyPokemonView from './views/MyPokemonView/MyPokemonView';

const Stack = createNativeStackNavigator();

const App = () => {
  const HomeStack = createNativeStackNavigator();

  function HomeStackScreen() {
    return (
      <HomeStack.Navigator>
        <HomeStack.Screen
          name="Home"
          component={HomeView}
          options={{title: '', headerShown: false}}
        />
        <HomeStack.Screen
          name="Details"
          component={PokemonDetailsView}
          options={{title: 'Characteristics of the Pokemon'}}
        />
      </HomeStack.Navigator>
    );
  }

  const MyPokemonStack = createNativeStackNavigator();

  function MyPokemonStackScreen() {
    return (
      <MyPokemonStack.Navigator>
        <MyPokemonStack.Screen
          name="MyPokemon"
          component={MyPokemonView}
          options={{title: 'My Pokemon Team'}}
        />
      </MyPokemonStack.Navigator>
    );
  }

  const Tab = createBottomTabNavigator();

  return (
    <>
      <NavigationContainer>
        <Tab.Navigator screenOptions={{headerShown: false}}>
          <Tab.Screen name="Home" component={HomeStackScreen} />
          <Tab.Screen name="MyPokemon" component={MyPokemonStackScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
