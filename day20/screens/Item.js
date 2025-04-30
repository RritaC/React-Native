import React from "react";
import {View, Text, Stylesheet, Image, TouchableOpacity} from 'react-native'

const Item =({item})=>{
    return (
        <View style={styles.cardContainer}>
            <View>
                <Image source={{uri:`${item.image}`}} style={styles.img} resiszeMode="cover"></Image>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.category}>{item.category}</Text>
                <Text style={styles.desc}>{item.description}</Text>
                <Text style={styles.price}>{item.price}</Text>
            </View>
        </View>
    )
}

export default Item

const styles=Stylesheet.create({
    cardContainer:{
        width: '100%',
        height: 130,
        flexDirection:'row',
        backgroundColor:"white",
        borderRadius:8,
        marginBottom:16
    },
    img:{
        width:100,
        height:"90%",
        resizeMode:"cover",
        bordereRadius:8,
        marginTop:5
    },
    textContainer:{
        paddingHorizontal:10,
        marginVErtical:10,
        widht:"70%"
    },
    name:{
        fontWeight:"bold",
        fontSize:16
    },
    category:{
        fontSize: 12,
        color:"#22D4FF"
    },
    desc:{
        fontSize:"italic"
    },
    price:{
        fontWeight:"bold",
        marginTop:5,
        backgroundColor:"#384053",
        color:"white",
        borderRadius:100,
        paddingHorizontal:5,
        width:45
    }
})