import React, { useEffect, useState, useCallback } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { Colours } from '../components/Colours'
import { Signout } from '../screens/Signout'

const Home = (props) => {
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
    
      const getUser = () => {
        props
          .getUserDetails(props.user?.uid)
          .then((document) => setUserDetails(document))
          .catch((error) => console.log(error))
      }
    

    return (
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.headerRow}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                        <View>
                            <Image
                                source={require('../assets/account.png')}
                                style={styles.avatar}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
                    <View style={styles.header}>
                        <Text style={styles.hello}>
                            Welcome, {userDetails?.firstname} {userDetails?.lastname}
                        </Text>
                    </View>
            </View>
            <View style={styles.selectionContainer}>
                <TouchableOpacity 
                    style={styles.btnSuppliers}
                    
                >
                        <Text style={styles.textSuppliers}>Supplier List</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnOrders} onPress={() => navigation.navigate('Supplier')}>
                    <Text style={styles.textOrders}>Order list</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

export default Home

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    headerRow:{
        flex: 1,
        flexDirection: 'row',
        backgroundColor: Colours.yellow,
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        maxHeight: '10%',
        marginTop: 40,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    header:{
        flex:1,
    },
    avatar:{
        marginLeft: 30,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colours.grey,
    },
    hello:{
        fontSize: 20,
        marginLeft: -110,
        color: Colours.darkGrey,
    },
    selectionContainer:{
        flex: 1,
        marginTop: 30,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    btnSuppliers:{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colours.aqua,
        marginTop: 10,
        width: '80%',
        height: 100,
        marginBottom: 20,
        borderRadius: 20,
    },
    btnOrders:{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colours.salmon,
        marginTop: 10,
        width: '80%',
        height: 100,
        marginBottom: 20,
        borderRadius: 20,
    },
    textSuppliers:{
        fontSize: 20,
        fontWeight: '700',
        color: 'white',
        textTransform: 'uppercase',
    },
    textOrders:{
        fontSize: 20,
        fontWeight: '700',
        color: 'white',
        textTransform: 'uppercase',
    },
})
