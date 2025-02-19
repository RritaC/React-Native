import React from 'react'
import {View, Text, FlatList, StyleSheet, TextInput} from 'react-native'

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 22,
    },
    item: {
      padding: 10,
      fontSize: 16,
      height: 44,
    },
    h1: {
        padding: 10,
        fontSize: 20,
        height: 44,
      },
    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: 'rgba(247,247,247,1.0)',
      },
  });

const ExerciseExample =()=>{

    const StudentList=[
        {name: "Rrita", surname: "Canolli", age: 14, birthdate: "29.06.2010"},
        {name: "Buna", surname: "Gashi", age: 24, birthdate: "19.07.2000"},
        {name: "Klea", surname: "Lluka", age: 25, birthdate: "09.08.1999"},
    ]
    return(
        <View style={styles.container}>
            <Text style={styles.sectionHeader}>Hello on this screen you can see our friends birthdates.</Text>
            <Text style={styles.sectionHeader}>Come and celebrate with us!</Text>
            <FlatList
                data={StudentList}
                renderItem={({item}) => {
                        return <Text style={styles.item}><TextInput
                        style={{
                        height: 40,
                        borderColor: 'gray',
                        borderWidth: 1,
                        }}
                        placeholder="Write your name here"
                        /> has a birthday on <TextInput
                        style={{
                        height: 40,
                        borderColor: 'gray',
                        borderWidth: 1,
                        }}
                        placeholder="Write your birthday here"
                        />, currently she is <TextInput
                        style={{
                        height: 40,
                        borderColor: 'gray',
                        borderWidth: 1,
                        }}
                        placeholder="Write your current age here"
                        />  </Text>
                }}
            />
            
        </View>
    )
}

export default ExerciseExample;