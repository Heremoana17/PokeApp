import React from 'react';
import HomeView from './views/HomeView/HomeView';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PokemonDetailsView from './views/PokemonDetailsView/PokemonDetailsView';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MyPokemonView from './views/MyPokemonView/MyPokemonView';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              let iconName;

              if (route.name === 'Home') {
                return <FontAwesomeIcon name="home" size={30} color={'blue'} />;
              } else if (route.name === 'MyPokemon') {
                return (
                  <MaterialCommunityIcons
                    name="pokeball"
                    size={size}
                    color={color}
                  />
                );
              }
            },
          })}
          tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
          }}>
          <Tab.Screen name="Home" component={HomeStackScreen} />
          <Tab.Screen name="MyPokemon" component={MyPokemonStackScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
