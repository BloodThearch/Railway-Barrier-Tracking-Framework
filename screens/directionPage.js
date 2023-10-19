
import { StyleSheet, Text, View, TextInput, Button,Pressable, KeyboardAvoidingView, ImageBackground } from 'react-native';
import { Card } from 'react-native-paper';
const trainBg1 = {uri: 'https://i.pinimg.com/originals/e5/23/94/e52394d622f58c7567822eb84a2cbf62.jpg'};
//const trainBg1 = require('./e52394d622f58c7567822eb84a2cbf62.jpg');

export default function directionPage({ navigation }) {
    return (
        <View style={styles.container}>
          <ImageBackground source={trainBg1} resizeMode="cover" style={styles.container}> 
            <KeyboardAvoidingView style={styles.container}>
              {/*<TopBar style={styles.topItem} />*/}
              <View style={styles.outer_box}>
                <View style={styles.formGeneric}>
                  <Text style={styles.formTitle}>Directions</Text>
                  <Text style={styles.formText}>Start:</Text>
                  <TextInput style={styles.input}/>
                  <Text style={styles.formText}>Destination:</Text>
                  <TextInput style={styles.input} secureTextEntry={true}/>
                   <Pressable style={styles.input_submit}><Text style={styles.formGo}>Go</Text></Pressable>
                </View>
              </View>
            </KeyboardAvoidingView>
          </ImageBackground>
        </View>
    );
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
    outer_box:{
      padding: 20,
    flex: 1,
    justifyContent: 'center',
    borderRadius:30,

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
    //height: 60,
    width: 90,
    borderWidth: 0,
    alignSelf: 'center',
    backgroundColor:'green',
    borderColor:'green',
    fontSize: 20,
    color: 'white',
    padding: 10,
    marginVertical: 10,
  },
  cardGeneric: {
    padding: 20,
    flex: 1,
  },
  formGeneric: {
    backgroundColor: '#308ffdb1',
    padding: 20,
    borderRadius:30,
  },
  formText: {
    color: 'white',
    fontSize: 18,
  },
  formTitle: {
    fontFamily: 'Bold',
    color: 'white',
    fontSize: 28,
    alignSelf: 'center',
    marginBottom: 10,
  },
  formGo: {
      fontFamily: 'Bold',
      color: 'white',
      fontSize: 21,
      alignSelf: 'center',
      //padding:-100,
      }
});