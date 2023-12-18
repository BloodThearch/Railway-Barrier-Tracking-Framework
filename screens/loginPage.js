import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Pressable, KeyboardAvoidingView, ImageBackground } from 'react-native';
import { Card } from 'react-native-paper';
import { backendURL } from './constants';
import React, { useState } from 'react';

const trainBg1 = { uri: 'https://i.pinimg.com/originals/e5/23/94/e52394d622f58c7567822eb84a2cbf62.jpg' };

export default function loginPage({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={styles.container}>
      <ImageBackground source={trainBg1} resizeMode="cover" style={styles.container}>
        <KeyboardAvoidingView style={styles.container}>
          {/*<TopBar style={styles.topItem} />*/}
          <View style={[styles.cardGeneric, styles.centerItemVertical]}>
            <View style={styles.formGeneric}>
              <Text style={styles.formTitle}>Login</Text>
              <Text style={styles.formText}>Enter Username:</Text>
              <TextInput 
                style={styles.input} 
                value={username} 
                onChangeText={(text) => setUsername(text)} 
              />
              <Text style={styles.formText}>Password:</Text>
              <TextInput 
                style={styles.input} 
                secureTextEntry={true} 
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
              <Pressable style={styles.input_submit} onPress={async () => {
                const loginResult = await checkLogin(username, password);
                if (loginResult === 1) {
                  console.log("hi4");
                  navigation.navigate('directionPage');
                }
              }}>
                <Text style={styles.formSubmit}>Submit</Text>
              </Pressable>
              <Text style={[styles.formText, styles.centerItemHorizontal]}>Don't have an account yet?</Text>
              <Pressable style={styles.input_submit} onPress={() => navigation.navigate('registerPage')}>
                <Text style={styles.formSubmit}>Register</Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
}

async function checkLogin(username, password) {
  // console.log("hi1");
  let result;
  const res = await fetch(backendURL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  });
  // console.log("hi2")
  result = await res.json();
  // console.log("hi3")
  if (result.data === 1) {
    console.log("Successful Login.")
    return 1;
    // navigation.navigate('registerPage')
  }
  return 0;
  console.log(result)
}

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  containerH: {
    flex: 1,
    flexDirection: 'row',
  },
  centerItemHorizontal: {
    alignSelf: 'center',
  },
  centerItemVertical: {
    justifyContent: 'center',
  },
  topItem: {
    alignSelf: 'flex-start',
  },
  input: {
    borderRadius: 50,
    height: 40,
    borderWidth: 1,
    borderColor: 'white',
    color: 'white',
    padding: 10,
    marginVertical: 10,
  },
  input_submit: {
    borderRadius: 50,
    width: 130,
    borderWidth: 0,
    alignSelf: 'center',
    backgroundColor: 'green',
    borderColor: 'green',
    fontSize: 20,
    color: 'white',
    padding: 10,
    marginVertical: 10,
  },
  submitButton: {
    marginBottom: 50,
  },
  cardGeneric: {
    padding: 20,
    flex: 1,
  },
  formGeneric: {
    borderRadius: 30,
    backgroundColor: '#308ffdb1',
    padding: 20,
  },
  formText: {
    color: 'white',
    fontSize: 18,
  },
  formTitle: {
    color: 'white',
    fontSize: 24,
    alignSelf: 'center',
    marginBottom: 10,
  },
  formSubmit: {
    fontFamily: 'Bold',
    color: 'white',
    fontSize: 21,
    alignSelf: 'center',
  }
});