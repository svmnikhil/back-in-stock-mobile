import * as React from 'react';
import ProductsList from './screens/ProductsList';
import { registerRootComponent } from 'expo';
import {NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductDetails from './screens/ProductDetails';


const Stack = createNativeStackNavigator();


function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="ProductsList" 
          component={ProductsList}
          options={{ headerShown: false }}
          />
          <Stack.Screen 
          name="ProductDetails" 
          component={ProductDetails}
          options={{ headerShown: false }}
          />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

registerRootComponent(App);