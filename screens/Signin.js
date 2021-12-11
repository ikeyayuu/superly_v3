import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, KeyboardAvoidingView, Image, TextInput, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import logo from '../assets/SUPERLY_logo.png'
import { Colours } from '../components/Colours'

const Signin = (props) => {
    const navigation = useNavigation()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        if (props.auth === true) {
          navigation.reset({ index: 0, routes: [{ name: 'Home' }] })
        }
      }, [props.auth])

      const handleSignin = () => {
        if (email === '' || password === '') {
          setError('Please do not leave any field in blank')
          setTimeout(() => {
            setError('')
          }, 3000)
        } else {
          setLoginText('LOGGING IN...')
          props.handler(email, password)
        }
      }

    return (
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.logoContainer}>
                <Image source={logo} style={styles.logo} />
                <Text style={styles.error}>{error || props.error}</Text>
            </View>
            <View style={styles.signinContainer}>
                <TextInput 
                    style={styles.textInput}
                    placeholder="email"
                    placeholderTextColor= {Colours.grey}
                    autoCapitalize="none"
                    textContentType="emailAddress"
                    autoComplete="email"
                    onChangeText={(text) => setEmail(text)}
                >
                </TextInput>
                <TextInput 
                    style={styles.textInput}
                    placeholder="password"
                    placeholderTextColor= {Colours.grey}
                    secureTextEntry={true}
                    textContentType="password"
                    autoComplete="password"
                    onChangeText={(text) => setPassword(text)}
                >
                </TextInput>
                <View style={styles.forgotContainer}>
                    <Text
                        style={styles.forgotPassword}
                        onPress={() => {
                        navigation.navigate('ForgotPassword')
                        }}
                    > forgot password?</Text>
                </View>
            </View>

            <View style={styles.signinButtonContainer}>
                <TouchableOpacity
                    style={[styles.buttons, styles.signinButton]}
                    onPress={() => {
                        handleSignin()
                    }}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.buttons, styles.signupButton]}
                    onPress={() => {
                        navigation.navigate('Signup')
                    }}
                >
                    <Text style={styles.buttonText2}>Register</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
      },
    logoContainer:{
        marginTop: 150,
        marginBottom: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo:{
        width: 200,
        height: 200,
        resizeMode: 'contain'
    },
    signinContainer:{
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
    forgotContainer: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        width: '70%',
    },
    forgotPassword:{
        color: Colours.salmon,
        fontSize: 14,
        fontWeight: '500',
    },
    signinButtonContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        width: '100%',
        maxHeight: '20%',
        maxWidth: '70%',
    },
    buttons:{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colours.aqua,
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
    buttonText2:{
        fontSize: 20,
        fontWeight: '700',
        color: Colours.aqua,
        textTransform: 'uppercase',
    },
    signupButton:{
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: Colours.aqua,
    },
    error:{
        color: 'red',
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingTop: 50,
    }
})

export default Signin
