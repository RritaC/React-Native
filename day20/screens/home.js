import React from "react";
import {View, Text, Stylesheet, Image, TouchableOpacity, FlatList, ScrollView, Button} from 'react-native'

const home =()=>{
    
}

const styles=Stylesheet.create({
        container:{
            flex:1,
            backgroundColor:"#fff"
        },
        sliderContainer:{
            width: "100%",
            height: 200,
            justifyContent:"center",
            alignSlef:"center",
            backgroundColor:"lightgray"
        },
        imgItem:{
            width: "100%",
            height: "100%"    
        },
        item:{
            flex:1,
            justifyContent:"center"
        },
        iconsContainer:{
            width:"90%",
            alignSelf:"center",
            marginTop:30,
            flexDirection:"row",
            justifyContent:"space-between"
        },
        title:{
            marginTop:35,
        }

})

export default home