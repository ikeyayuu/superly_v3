import React, { useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import { Colours } from '../components/Colours'

const Signup = (props) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [address, setAddress] = useState('')

    const [error, setError] = useState('')


    const handlerSignUp = () => {
        if (
            (firstName === undefined || firstName === '') &&
            (lastName === undefined || lastName === '') &&
            (email === undefined || email === '') &&
            (password === undefined || password === '') &&
            (address === undefined || address === '')
        ) {
            setError('Please do not leave any field in blank')
            setTimeout(() => {
            setError('')
            }, 3000)
            return
        }
        props.handler(email, password, firstName, lastName, address)
    }
        

    return (
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.title}>
                <Text style={styles.text}>Complete to register</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput 
                    autoFocus={true}
                    style={styles.textInput}
                    placeholder="email"
                    autoCapitalize="none"
                    placeholderTextColor= {Colours.grey}
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    textContentType="emailAddress"
                    autoComplete="email"
                />
                <TextInput 
                    style={styles.textInput}
                    placeholder="password"
                    placeholderTextColor= {Colours.grey}
                    autoCapitalize="none"
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    secureTextEntry={true}
                />
                <TextInput 
                    style={styles.textInput}
                    placeholder="first name"
                    placeholderTextColor= {Colours.grey}
                    onChangeText={(text) => setFirstName(text)}
                    value={firstName}
                    textContentType="givenName"
                    autoComplete="name-given"
                />
                <TextInput 
                    style={styles.textInput}
                    placeholder="last name"
                    placeholderTextColor= {Colours.grey}
                    onChangeText={(text) => setLastName(text)}
                    value={lastName}
                    textContentType="familyName"
                    autoComplete="name-family"
                />
                <TextInput 
                    style={styles.textInput}
                    placeholder="address"
                    placeholderTextColor= {Colours.grey}
                    autoCapitalize="none"
                    onChangeText={(text) => setAddress(text)}
                    value={address}
                    textContentType="streetAddressLine1"
                    autoComplete="postal-address"
                />
            </View>
            <Text style={styles.error}>{error || props.error}</Text>
            <View style={styles.btnContainer}>
                <TouchableOpacity 
                    style={styles.btn}
                    onPress={() => {
                        handlerSignUp(email, password, firstName, lastName, address)
                    }}
                >
                    <Text style={styles.btnText}>Register</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

export default Signup

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    title:{
        justifyContent: 'flex-start',
        margin: 20,
        marginTop: -100,
    },
    text:{
        fontSize: 20,
        color: Colours.salmon,
        fontWeight: '700'
    },
    inputContainer:{
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    textInput: {
        padding: 5,
        width: '70%',
        height: 40,
        borderColor: Colours.grey,
        borderRadius: 5,
        borderWidth: 1,
        marginBottom: 20,
    },
    btnContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        maxHeight: '20%',
        maxWidth: '70%',
    },
    btn:{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colours.aqua,
        marginTop: 10,
        width: '100%',
        height: 50,
        marginBottom: 10,
        borderRadius: 5,
    },
    btnText:{
        fontSize: 20,
        fontWeight: '700',
        color: 'white',
        textTransform: 'uppercase',
    },
    error:{
        color: 'red',
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingTop: 50,
    }
})
