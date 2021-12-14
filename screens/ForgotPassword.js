import React, {useState} from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import { Colours } from '../components/Colours'

const ForgotPassword = (props) => {
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')

    const sendEmail = () => {
        if (email === '') {
          setError('Email invalid')
    
          setTimeout(() => {
            setError('')
          }, 3000)
        } else {
          props.onSubmit(email)
        }
      }
    
    return (
        <View style={styles.container}>
            <Text style={styles.success}>{props.success}</Text>
            <Text style={styles.error}>{error || props.error}</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    autoCapitalize='none'
                    placeholder="your existing email"
                    onChangeText={(text) => setEmail(text)}
                />
            </View>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                sendEmail()
                }}
            >
                <Text style={styles.buttonText}>RESET PASSWORD</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ForgotPassword

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    inputContainer:{
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        marginTop: -600,
    },
    input:{
        padding: 10,
        width: '70%',
        height: 50,
        borderColor: Colours.grey,
        borderRadius: 5,
        borderWidth: 1,
        marginBottom: 20,
    },
    button:{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colours.aqua,
        marginTop: 10,
        width: '70%',
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
    success:{
        color: 'green',
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingTop: 50,
    },
    error:{
        color: 'red',
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingTop: 50,
    },
})
