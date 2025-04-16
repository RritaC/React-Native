// keys->values, keys are the names used to identify pieces of data, values are the data assigned to those keys.
// keys must be strings and always use double  quotes(" ")

import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import data from '../data/countries.json';


class CountriesScreen extends React.Component{
    constructor(){
        super();
        this.state = {
            countries:[]
        }
    }

    componentDidMount(){
        this.setState({
            countries : data
        })
    }


    render(){
        return(
            <View>
                <Text style={styles.screenTitle}>Countries Screen</Text>
                <FlatList 
                 data = {this.state.countries}
                 keyExtractor = {countries => 
countries.id
}
                 renderItem = {({item}) => (
                    <View style={styles.cardWrapper}>
                    <Text>City name: {
item.name
}</Text>
                    <Text>Country name: {
item.country
}</Text>
                    <Text>Description name: {item.desciption}</Text>
                    </View>
                 )}
                />
                   
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    screenTitle:{
        fontSize:20,
        textAlign:'center',
        marginVertical: 15,
        fontWeight: 'bold'
    },
    cardWrapper:{
        backgroundColor:'lightgrey',
        marginVertical : 5
    }
});

export default CountriesScreen 