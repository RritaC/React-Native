import React from "react";
import {View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView, Button} from 'react-native';
import Swiper from 'react-native-swiper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; 
import data from '../data/data.json';
import Item from './Item'

const Home =()=>{
    
    return(
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.sliderContainer}>
                    <Swiper 
                        autoplay
                        activeDotColor="#22D4FF"
                        autoplayTimeout={5}
                    >
                        <View style={styles.item}>
                            <Image source={{uri:'https://picsum.photos/seed/picsum/200/300'}}
                                style={styles.imgItem}
                                resizeMode="cover"
                            />
                        </View>
                        <View style={styles.item}>
                            <Image source={{uri:'https://picsum.photos/seed/picsum/200/300'}}
                                style={styles.imgItem}
                                resizeMode="cover"
                            />
                        </View>
                        <View style={styles.item}>
                            <Image source={{uri:'https://picsum.photos/seed/picsum/200/300'}}
                                style={styles.imgItem}
                                resizeMode="cover"
                            />
                        </View>
                        <View style={styles.item}>
                            <Image source={{uri:'https://picsum.photos/seed/picsum/200/300'}}
                                style={styles.imgItem}
                                resizeMode="cover"
                            />
                        </View>
                        <View style={styles.item}>
                            <Image source={{uri:'https://picsum.photos/seed/picsum/200/300'}}
                                style={styles.imgItem}
                                resizeMode="cover"
                            />
                        </View>
                        <View style={styles.item}>
                            <Image source={{uri:'https://picsum.photos/seed/picsum/200/300'}}
                                style={styles.imgItem}
                                resizeMode="cover"
                            />
                        </View>
                        <View style={styles.item}>
                            <Image source={{uri:'https://picsum.photos/seed/picsum/200/300'}}
                                style={styles.imgItem}
                                resizeMode="cover"
                            />
                        </View>
                    </Swiper>
                </View>
                <View style={styles.iconsContainer}>
                    <View>
                        <MaterialCommunityIcons name="cellphone-iphone" size={30} colors="#22D4FF"/>
                        <Text>Iphone</Text>
                    </View>
                    <View>
                        <MaterialCommunityIcons name="samsung" size={30} colors="#22D4FF"/>
                        <Text>Android</Text>
                    </View>
                    <View>
                        <MaterialCommunityIcons name="laptop" size={30} colors="#22D4FF"/>
                        <Text>Laptop</Text>
                    </View>
                </View>
                <View style={styles.productContainer}>
                    <Text>Most Popular products</Text>
                    <FlatList
                        data={data}
                        renderItem={({item})=>{
                            <View>
                                <Item item={item}/>
                            </View>
                        }}
                    />
                </View>
                <TouchableOpacity style={styles.btn}>
                    <Text style={styles.btnText}>View More</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )

}

export default Home

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#fff"
    },
    sliderContainer:{
        width:"100%",
        height:200,
        justifyContent:"center",
        alignSelf:"center",
        backgroundColor:"lightgray"
    },
    imgItem:{
        width:"100%",
        height: "100%",
    },
    item:{
        flex:1,
        justifyContent: "center",

    },
    iconsContainer:{
        width:"90%",
        alignSelf:"center",
        marginTop: 30,
        flexDirection: "row",
        justifyContent:"space-between",

    },
    title:{
        marginTop:35,
        fontSize:20,
        marginBottom:16,
    },
    productContainer:{
        marginHorizontal:20,
    },
    btn:{
        backgroundColor:"#22D4FF",
        height:50,
        borderRadius:8,
        justifyContent:"center",
        marginBottom:20,
    },
    btnText:{
        color:"white",
        textAlign:"center",
        fontWeight:"bold"
    },
    textStyle:{
        fontSize:15,
        marginBottom:20
    }
})