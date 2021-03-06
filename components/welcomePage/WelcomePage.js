import React, {useEffect, useState} from 'react';
import { StyleSheet, View, Pressable, ActivityIndicator } from 'react-native';
import { Button, Text, Image, useTheme } from 'react-native-elements';
import {getData} from "../../utils/asyncStorageUtils";


export default function WelcomePage({navigation}) {
    const { theme } = useTheme();
     useEffect(async ()=>{
         const loggedInUser = await getData("Access Token");
         if(loggedInUser){
             navigation.navigate('Tabs');
         }
     })

    return (
        <View style={styles.container}>
            <Text
                style={styles.text}
                h1
                h1Style={{ color: theme?.colors?.primary }}
            >
                TODO-Bom
            </Text>
            <View style={styles.imageView}> 
                <Image style={styles.image}
                    source={require("./todoP.jpeg")}
                    containerStyle={styles.imageContainer}
                    PlaceholderContent={<ActivityIndicator />}
                />
            </View>
            
            <Button
                title={'Sign In'}
                containerStyle={{
                    width: 200,
                    marginHorizontal: 50,
                    marginVertical: 10,
                }}
                onPress={() => navigation.navigate('Sign In')}
            />
            <Button
                title={'Sign Up'}
                containerStyle={{
                    width: 200,
                    marginHorizontal: 50,
                    marginVertical: 10,
                }}
                onPress={() => navigation.navigate('Sign Up')}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    image: {
        flex:1,
        resizeMode: 'contain'
    },
    text: {
        textAlign: 'center',
        padding: 2,
    },
    container: {
        display: 'flex',
        alignItems: 'center',
        marginTop:'10%',
        height: '100%',
        width: '100%',

    },
    imageContainer:{
        height: '100%',
        width:'100%'
    },
    imageView:{
        height: '50%',
        width:'80%'
    }
});



