import React from 'react';
import HomeView from './views/HomeView/HomeView';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PokemonDetailsView from './views/PokemonDetailsView/PokemonDetailsView';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeView}
            options={{title: '', headerShown: false}}
          />
          <Stack.Screen
            name="Details"
            component={PokemonDetailsView}
            options={{title: 'Characteristics of the Pokemon'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
