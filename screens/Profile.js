import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Colours } from '../components/Colours'

const Profile = (props) => {
    const navigation = useNavigation()
    const [userDetails, setUserDetails] = useState()

    useEffect(() => {
        if (!props.auth) {
          navigation.reset({ index: 0, routes: [{ name: 'Signin' }] })
        }
      }, [props.auth])
    
      useEffect(() => {
        if (userDetails === undefined) {
          props
            .getUserDetails(props.user?.uid)
            .then((document) => setUserDetails(document))
            .catch((error) => console.log(error))
        }
      }, [])

    return (
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.textContainer}>
                <View style={styles.infoContainer}>
                    <Text style={styles.textDetails}>First name:</Text>
                    <Text style={styles.userDetails}>{userDetails?.firstname}</Text>
                </View>
                <View style={{borderBottomColor: Colours.grey, borderBottomWidth: 1,}}/>
                <View style={styles.infoContainer}>
                    <Text style={styles.textDetails}>Last name:</Text>
                    <Text style={styles.userDetails}>{userDetails?.lastname}</Text>
                </View>
                <View style={{borderBottomColor: Colours.grey, borderBottomWidth: 1,}}/>
                <View style={styles.infoContainer}>
                    <Text style={styles.textDetails}>Email:</Text>
                    <Text style={styles.userDetails}>{userDetails?.email}</Text>
                </View>
                <View style={{borderBottomColor: Colours.grey, borderBottomWidth: 1,}}/>
                <View style={styles.infoContainer}>
                    <Text style={styles.textDetails}>Address:</Text>
                    <Text style={styles.userDetails}>{userDetails?.address}</Text>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => props.handler()}>
                    <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

export default Profile

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    textContainer:{
        flex:1,
        margin: 10,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        height: '100%',
    },
    infoContainer:{
        margin: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
    },
    textDetails:{
        margin: 10,
        fontWeight: '500',
        textTransform: 'uppercase',
    },
    userDetails:{
        fontSize: 18,
        marginTop: 7,
        marginLeft: -5,
        fontWeight: '700',
        color: Colours.blue,
    },
    buttonContainer:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        maxHeight: '20%',
        maxWidth: '70%',
    },
    button:{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colours.salmon,
        marginTop: 10,
        width: '100%',
        height: 50,
        marginBottom: 10,
        borderRadius: 5,
    },
    buttonText:{
        fontSize: 20,
        fontWeight: '700',
        color: 'white',
        textTransform: 'uppercase',
    },
})
