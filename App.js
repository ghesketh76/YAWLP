import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { createStore } from 'redux'
import { Provider, useDispatch } from 'react-redux'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import reducers from './reducers'
import RestaurantsContainer from './components/RestaurantsContainer';

const apiKey = 'aBPTEDFRvHPLVcxzX26Gq-Y8vF0925Rp7GFc4LcW0tEhdNsQvD00ezkrsQmrcKgEL1weJ5E5KoGYjUiaZC2-_nmw1aYx5ajZj9niTfFkQSLN69AONQVQJrM8MttQYHYx'
const apiURL = 'https://api.yelp.com/v3/businesses/search?location=denver&term=restaurant'

export default function App() {

  const store = createStore(reducers)
  

  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <RestaurantsContainer />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
