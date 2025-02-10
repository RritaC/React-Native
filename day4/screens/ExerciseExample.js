import React from 'react'
import {View, Text, FlatList} from 'react-native'

const ExerciseExample =()=>{

    const StudentList=[
        {name: "Rrita", surname: "Canolli", age: 14},
        {name: "Jona", surname: "Mehmeti", age: 17},
        {name: "Alma", surname: "Kamberi", age: 27},
    ]
    return(
        <View>
            <Text>Hello form this screen</Text>
            <Text>Lorem ipsum asdfasdkfbaskdjhfasdjkfasdf</Text>
            <FlatList
                data={StudentList}
                renderItem={({item}) => {
                        return <Text>{item.name} {item.surname} - {item.age}</Text>
                }}
            />
        </View>
    )
}

export default ExerciseExample;