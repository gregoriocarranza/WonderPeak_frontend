import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Alert,
  Button,
  ActivityIndicator,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

type MapScreenProps = {
  initialLatitude: number;
  initialLongitude: number;
  onConfirmLocation: (latitude: number, longitude: number) => void;
};

export default function MapScreen({
  initialLatitude = -34.602875183188374,
  initialLongitude = -58.59995648543427,
  onConfirmLocation,
}: MapScreenProps) {
  const [currentLocation, setCurrentLocation] = useState<{
    latitude: number;
    longitude: number;
  }>({ latitude: initialLatitude, longitude: initialLongitude });

  const [selectedLocation, setSelectedLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  useEffect(() => {
    const fetchLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permiso denegado",
          "No se puede acceder a la ubicación. Actívelo en la configuración."
        );
        return;
      }
      const location = await Location.getCurrentPositionAsync();
      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    };

    if (
      !currentLocation ||
      (currentLocation.latitude === 0 && currentLocation.longitude === 0)
    ) {
      fetchLocation();
    }
  }, [currentLocation]);

  const handleSelectLocation = (event: any) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });
  };

  const handleConfirmLocation = () => {
    if (!selectedLocation) {
      Alert.alert("Error", "Por favor, selecciona una ubicación.");
      return;
    }
    onConfirmLocation(selectedLocation.latitude, selectedLocation.longitude);
  };

  if (!currentLocation) {
    return (
      <ActivityIndicator size="large" color="blue" style={styles.loader} />
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: currentLocation?.latitude,
          longitude: currentLocation?.longitude,
          latitudeDelta: 0.5,
          longitudeDelta: 0.5,
        }}
        zoomEnabled={true}
        scrollEnabled={true}
        rotateEnabled={true}
        showsUserLocation={true}
        onPress={handleSelectLocation}
      >
        {selectedLocation && <Marker coordinate={selectedLocation} />}
      </MapView>
      <View style={styles.buttonContainer}>
        <Button title="Confirmar ubicación" onPress={handleConfirmLocation} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 100,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
