import { StyleSheet, Text, View, TextInput, Button, KeyboardAvoidingView, ImageBackground } from 'react-native';

const trainBg1 = {uri: 'https://i.pinimg.com/originals/e5/23/94/e52394d622f58c7567822eb84a2cbf62.jpg'}; 

export default function registerPage({ navigation }) {
    return (
        <View style={styles.container}>
          <ImageBackground source={trainBg1} resizeMode="cover" style={styles.container}> 
            <KeyboardAvoidingView style={styles.container}>
              {/*<TopBar style={styles.topItem} />*/}
              <View style={[styles.cardGeneric, styles.centerItemVertical]}>
                <View style={styles.formGeneric}>
                  <Text style={styles.formTitle}>Register</Text>
                  <Text style={styles.formText}>Enter Username:</Text>
                  <TextInput style={styles.input}/>
                  <Text style={styles.formText}>Enter E-mail:</Text>
                  <TextInput style={styles.input}/>
                  <Text style={styles.formText}>Password:</Text>
                  <TextInput style={styles.input} secureTextEntry={true}/>
                  <Text style={styles.formText}>Re-type Password:</Text>
                  <TextInput style={styles.input} secureTextEntry={true}/>
                  <Button title="Submit" style={styles.submitButton} color='green' />
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
    height: 40,
    borderWidth: 1,
    borderColor: 'white',
    color: 'white',
    padding: 10,
    marginVertical: 10,
  },
  submitButton: {
    backgroundColor: '',
  },
  cardGeneric: {
    padding: 20,
    flex: 1,
  },
  formGeneric: {
    backgroundColor: '#006effca',
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
});