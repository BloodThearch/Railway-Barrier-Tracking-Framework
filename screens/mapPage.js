import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Pressable, KeyboardAvoidingView, ImageBackground } from 'react-native';
import { Card } from 'react-native-paper';
import MapView from 'react-native-maps';

export default function mapPage({ navigation }) {
    return (
        <View style={styles.container}>
            <MapView style={styles.map}
                initialRegion={{
                    latitude: 30.35290,
                    longitude: 76.36070,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      width: '100%',
      height: '100%',
    },
  });