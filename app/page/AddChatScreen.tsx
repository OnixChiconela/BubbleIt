import { StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import React, { useState } from 'react';

const AddChatScreen = () => {
  const [hasPermission, requestPermission] = useCameraPermissions();
  const [cameraType, setCameraType] = useState<CameraType>('back'); // Define se é câmera traseira ou frontal
  const [isCameraVisible, setCameraVisible] = useState(false); // Para controlar a exibição da câmera

  const toggleCameraType = () => {
    setCameraType((current) => (current === 'back' ? 'front' : 'back'));
  };

  if (!hasPermission) {
    return <View />;
  }

  if (!hasPermission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Precisamos da permissão para usar a câmera</Text>
        <Button title="Conceder Permissão" onPress={requestPermission} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isCameraVisible ? (
        <>
          <CameraView facing={cameraType} style={styles.camera}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
                <Text style={styles.text}>Trocar Câmera</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: 'red' }]}
                onPress={() => setCameraVisible(false)}>
                <Text style={styles.text}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </CameraView>
        </>
      ) : (
        <TouchableOpacity style={styles.scanButton} onPress={() => setCameraVisible(true)}>
          <Text style={styles.scanText}>Abrir Câmera</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default AddChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    textAlign: 'center',
    marginBottom: 10,
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  button: {
    padding: 15,
    backgroundColor: '#1E90FF',
    borderRadius: 10,
    marginHorizontal: 10,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
  scanButton: {
    padding: 15,
    backgroundColor: '#32CD32',
    borderRadius: 10,
  },
  scanText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
