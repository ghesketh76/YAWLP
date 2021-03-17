import React, {useEffect, useState} from 'react'
import { Text, View, StyleSheet, ScrollView, TextInput, Button, TouchableOpacity } from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import RestaurantCard from './RestaurantCard'

const apiKey = 'aBPTEDFRvHPLVcxzX26Gq-Y8vF0925Rp7GFc4LcW0tEhdNsQvD00ezkrsQmrcKgEL1weJ5E5KoGYjUiaZC2-_nmw1aYx5ajZj9niTfFkQSLN69AONQVQJrM8MttQYHYx'
const apiURL = `https://api.yelp.com/v3/businesses/search?location=denver&term=restaurant`

export default function RestaurantsContainer() {

    const dispatch = useDispatch()
    const restaurants = useSelector(state => state.restaurants)

    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        fetch(apiURL, {
          method: 'GET',
          headers: {
            "Authorization": `Bearer ${apiKey}`
          }
        }).then(response => response.json())
          .then(({businesses}) => dispatch({type: 'SET_RESTAURANTS', restaurants: businesses}))
      }, [])

      const showRestaurants = () => restaurants.map((restaurant, i) => {
          return <RestaurantCard 
                    key={restaurant.id} 
                    restaurant={restaurant} 
                    index={i + 1}
                />
      })

      const handleSearchText = (text) => {
          setSearchTerm(text)
      }

      const handleSearch = () => {
            const updatedURL = `https://api.yelp.com/v3/businesses/search?location=${searchTerm}&term=restaurant`

            fetch(updatedURL, {
                method: 'GET',
                headers: {
                "Authorization": `Bearer ${apiKey}`
                 }
            }).then(response => response.json())
              .then(({businesses}) => dispatch({type: 'SET_RESTAURANTS', restaurants: businesses}))
      }

 
    return (
        <>
        <View style={{flexDirection: 'row'}}>
            <TextInput 
                onChangeText={handleSearchText} 
                value={searchTerm} 
                style={styles.search}
                placeholder='Enter Location'
            />
            <Button onPress={handleSearch} title='Search' style={styles.button}/>
            
        </View>
            <ScrollView style={styles.container}>
                {showRestaurants()}
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 15
    },
    search: {
        flex: 2, 
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1,
        marginHorizontal: 15,
        paddingHorizontal: 15
    },
    button: {
        width: '25%', 
        flex: 1
    }
 
})
