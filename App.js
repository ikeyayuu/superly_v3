import { LogBox } from 'react-native'
LogBox.ignoreLogs(['AsyncStorage'])

import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// screens
import Signin from './screens/Signin'
import Home from './screens/Home'
import Signout from './screens/Signout'
import Profile from './screens/Profile'
import Signup from './screens/Signup'
import { Supplier } from './screens/Supplier';
import ForgotPassword from './screens/ForgotPassword';
import Update from './screens/Update';

// firebase
import { firebaseConfig } from './Config'
import { initializeApp } from 'firebase/app'
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from 'firebase/auth'

import {
  initializeFirestore,
  setDoc,
  doc,
  addDoc,
  getDoc,
  collection,
  query,
  where,
  onSnapshot,
  updateDoc,
  arrayUnion,
  arrayRemove,
  increment,
  deleteDoc,
} from 'firebase/firestore'
import { Colours } from './components/Colours';

const FBapp = initializeApp(firebaseConfig)
const FSdb = initializeFirestore(FBapp, { useFetchStreams: false })
const FBauth = getAuth()

const Stack = createNativeStackNavigator()

export default function App() {
  const [auth, setAuth] = useState(true)
  const [user, setUser] = useState()
  const [signupError, setSignupError] = useState()
  const [signinError, setSigninError] = useState()
  const [forgotPasswordError, setForgotPasswordError] = useState()
  const [forgotPasswordSuccess, setForgotPasswordSuccess] = useState()
  const [data, setData] = useState();

  useEffect(() => {
    onAuthStateChanged(FBauth, (user) => {
      if (user) {
        setAuth(true)
        setUser(user)
          if (!data) {
            getData();
          }
      } else {
        setAuth(false)
        setUser(null)
      }
    })
  })

  const SigninHandler = (email, password) => {
    signInWithEmailAndPassword(FBauth, email, password)
      .then(() => {
        setUser(FBauth.currentUser.user)
        setAuth(true)
      })
      .catch((error) => {
        const message = error.code.includes('/')
          ? error.code.split('/')[1].replace(/-/g, ' ')
          : error.code
        setSigninError(message)
        setTimeout(() => {
          setSigninError('')
        }, 3000)
      })
  }

  const SignoutHandler = () => {
    signOut(FBauth)
      .then(() => {
        setAuth(false)
        setUser(null)
      })
      .catch((error) => console.log(error.code))
  }

  const getUserDetails = async (id) => {
    const docRef = doc(FSdb, 'Users', id)
    const docData = await getDoc(docRef)
    return new Promise((resolve, reject) => {
      if (docData.exists()) {
        let document = docData.data()
        document.id = id
        resolve(document)
      } else {
        reject('no such document')
      }
    })
  }

  const addData = async (data) => {
    const ref = await setDoc(
      doc(FSdb, `Users/${user.uid}/documents/${new Date().getTime()}`),
      data
    );
  };

  const getData = () => {
    const FSQuery = query(collection(FSdb, `Users/${user.uid}/documents`));
    const unsubscribe = onSnapshot(FSQuery, (querySnapshot) => {
      let FSdata = [];
      querySnapshot.forEach((doc) => {
        let item = {};
        item = doc.data();
        item.id = doc.id;
        console.log(doc.id);
        FSdata.push(item);
      });
      setData(FSdata);
      console.log(FSdata);
    });
  };

  const SignupHandler = (email, password, firstName, lastName, address) => {
    setSignupError(null)
    createUserWithEmailAndPassword(FBauth, email, password)
      .then(() => {
        setDoc(doc(FSdb, 'Users', FBauth.currentUser.uid), {
          email: email,
          firstname: firstName,
          lastname: lastName,
          address: address,
        })

        setUser(FBauth.currentUser.user)
        setAuth(true)
      })
      .catch((error) => {
        setSignupError(error.code)
        setTimeout(() => {
          setSignupError('')
        }, 3000)
      })
  }

  const resetPassword = (email) => {
    sendPasswordResetEmail(FBauth, email)
      .then(() => {
        setForgotPasswordSuccess('Email sent!')
        setTimeout(() => {
          setForgotPasswordSuccess('')
        }, 3000)
      })
      .catch((error) => {
        setForgotPasswordError(error.code)
        setTimeout(() => {
          setForgotPasswordError('')
        }, 3000)
      })
  }

  

  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
          name="Signin"
          options={{
            headerShown: false,
          }}
        >
          {(props) => (
            <Signin
              {...props}
              auth={auth}
              error={signinError}
              handler={SigninHandler}
            />
          )}
        </Stack.Screen>

        <Stack.Screen
          name="Home"
          options={{
            headerShown: false,
            headerTitle: 'Home',
            headerRight: (props) => (
              <Signout {...props} handler={SignoutHandler} user={user} />
            ),
          }}
        >
          {(props) => (
            <Home
              {...props}
              user={user}
              auth={auth}
              getUserDetails={getUserDetails}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="Profile"
          options={{
            headerShown: true,
            headerTitle: 'Profile',
          }}
        >
          {(props) => (
            <Profile
              {...props}
              user={user}
              auth={auth}
              handler={SignoutHandler}
              getUserDetails={getUserDetails}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="Signup"
          options={{
            headerTitle: 'Register',
            headerTitleStyle: {
              fontSize: 15,
              fontWeight: 'bold',
              color: Colours.salmon,
            },
          }}
        >
          {(props) => (
            <Signup
              {...props}
              user={user}
              error={signupError}
              handler={SignupHandler}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="Supplier"
          options={{
            headerTitle: 'Order List',
            headerTitleStyle: {
              fontSize: 15,
              fontWeight: 'bold',
              color: Colours.salmon,
            },
            headerShown: true,
          }}
        >
          {(props) => (
            <Supplier
              {...props}
              auth={auth}
              add={addData}
              data={data}
              user={user}
              getUserDetails={getUserDetails}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="ForgotPassword"
          options={{
            headerTitle: 'Reset your password',
            headerTitleStyle: {
              fontSize: 15,
              fontWeight: 'bold',
              color: Colours.salmon,
            },
            headerShown: true,
          }}
        >
          {(props) => (
            <ForgotPassword
              {...props}
              error={forgotPasswordError}
              success={forgotPasswordSuccess}
              onSubmit={resetPassword}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
            name="Update Item"
            component={Update}
          />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
