import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Circle } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapViewDirections from 'react-native-maps-directions';
import Constants from 'expo-constants';
import { apiKey, checkBarrierURL } from './constants';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const INITIAL_POSITION = {
  latitude: 30.35661,
  longitude: 76.36469,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};

function InputAutocomplete({ label, placeholder, onPlaceSelected }) {
  return (
    <>
      <Text>{label}</Text>
      <GooglePlacesAutocomplete
        styles={{ textInput: styles.input }}
        placeholder={placeholder || ''}
        fetchDetails
        onPress={(data, details = null) => {
          onPlaceSelected(details);
        }}
        query={{
          key: apiKey, // Replace with your API key
          language: 'en',
        }}
      />
    </>
  );
}

export default function directionPage() {
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [showDirections, setShowDirections] = useState(false);
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [duration_min, setDurationMin] = useState(0);
  const [circleColor, setCircleColor] = useState('#80bfff');
  const [circleKey, setCircleKey] = useState(Date.now().toString()); // Add key state
  const mapRef = useRef(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetch(checkBarrierURL)
      .then(response => response.json())
      .then(data => {
        console.log('API Response:', data);

        // Parse data.data as an integer
        const responseData = parseInt(data.data, 10);
        setDurationMin(parseInt(data.duration_min, 10));
        console.log(parseInt(data.duration_min, 10));
        console.log(responseData === 1)

        // Compare with integer 1
        setCircleColor(responseData === 1 ? '#00ff00' : '#ff0000');
        setCircleKey(Date.now().toString());
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, 30000);

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  const moveTo = async position => {
    const camera = await mapRef.current?.getCamera();
    if (camera) {
      camera.center = position;
      mapRef.current?.animateCamera(camera, { duration: 1000 });
    }
  };

  const edgePaddingValue = 70;

  const edgePadding = {
    top: edgePaddingValue,
    right: edgePaddingValue,
    bottom: edgePaddingValue,
    left: edgePaddingValue,
  };

  const traceRouteOnReady = args => {
    if (args) {
      setDistance(args.distance);
      setDuration(args.duration);
    }
  };

  const traceRoute = () => {
    if (origin && destination) {
      setShowDirections(true);
      mapRef.current?.fitToCoordinates([origin, destination], { edgePadding });
    }
  };

  const onPlaceSelected = (details, flag) => {
    const setFunc = flag === 'origin' ? setOrigin : setDestination;
    const position = {
      latitude: details?.geometry.location.lat || 0,
      longitude: details?.geometry.location.lng || 0,
    };
    setFunc(position);
    moveTo(position);
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_POSITION}
      >
        {origin && <Marker coordinate={origin} />}
        {destination && <Marker coordinate={destination} />}
        {showDirections && origin && destination && (
          <>
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={apiKey}
            strokeColor="#6644ff"
            strokeWidth={4}
            onReady={traceRouteOnReady}
          />
          <Circle
          key={circleKey}
            center={{
              latitude: 30.34025,
              longitude: 76.36657,
            }}
            radius={50}
            strokeWidth={2}
            strokeColor={circleColor}
            fillColor={circleColor}
          />
          </>
          
        )}
        {/* {showDirections && origin && destination && (
          <Circle
          key={circleKey}
            center={{
              latitude: 30.34525,
              longitude: 76.37788,
            }}
            radius={50}
            strokeWidth={2}
            strokeColor={circleColor}
            fillColor={circleColor}
          />
        )} */}
      </MapView>
      <View style={styles.searchContainer}>
        <InputAutocomplete
          label="Origin"
          onPlaceSelected={details => onPlaceSelected(details, 'origin')}
        />
        <InputAutocomplete
          label="Destination"
          onPlaceSelected={details => onPlaceSelected(details, 'destination')}
        />
        <TouchableOpacity style={styles.button} onPress={traceRoute}>
          <Text style={styles.buttonText}>Trace route</Text>
        </TouchableOpacity>
        {distance && duration ? (
          <View>
            <Text>Distance: {distance.toFixed(2)}</Text>
            <Text>Duration: {(duration_min)} min</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  searchContainer: {
    position: 'absolute',
    width: '90%',
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
    padding: 8,
    borderRadius: 8,
    top: Constants.statusBarHeight,
  },
  input: {
    borderColor: '#888',
    borderWidth: 1,
  },
  button: {
    backgroundColor: '#bbb',
    paddingVertical: 12,
    marginTop: 16,
    borderRadius: 4,
  },
  buttonText: {
    textAlign: 'center',
  },
});

