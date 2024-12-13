import React, { useEffect, useRef, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { Camera } from 'expo-camera';
import { useRouter } from 'expo-router';
import Colors from '@/constants/Colors';
import CustomButton from '@/components/CustomButton';

const ScannerQrCodeScreen = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);
  const router = useRouter();

  let cameraRef = useRef<Camera>(null);

  useEffect(() => {
    const requestPermission = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    requestPermission();
  }, []);

  const handleBarCodeScanned = async ({ barcodes }: { barcodes: any[] }) => {
    if (scanned || barcodes.length === 0) return;
    setScanned(true);

    const firstCode = barcodes[0];
    if (firstCode?.data) {
      try {
        const parsedData = JSON.parse(firstCode.data);
        if (parsedData.chatId) {
          Alert.alert('QR Code Scanned', `Chat ID: ${parsedData.chatId}`, [
            {
              text: 'Go to Chat',
              onPress: () => router.push(`/chat/${parsedData.chatId}`),
            },
            {
              text: 'Cancel',
              style: 'cancel',
              onPress: () => setScanned(false),
            },
          ]);
        } else {
          throw new Error('Invalid QR Code');
        }
      } catch (error) {
        Alert.alert('Error', 'Invalid QR Code format.');
        setScanned(false);
      }
    }
  };

  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Camera permission is required to scan QR codes.</Text>
        <CustomButton title="Request Permission" onPress={Camera.requestCameraPermissionsAsync} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {scanned && (
        <CustomButton
          title="Scan Again"
          onPress={() => setScanned(false)}
          style={styles.scanButton}
        />
      )}
      {!scanned && (
        <Camera
          style={styles.camera}
          ref={(ref) => (cameraRef = ref)}
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          barCodeScannerSettings={{
            barCodeTypes: [Camera.Constants.BarCodeType.qr],
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.empty,
  },
  text: {
    fontSize: 16,
    color: Colors.text1,
    marginBottom: 20,
    textAlign: 'center',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  scanButton: {
    marginTop: 20,
  },
});

export default ScannerQrCodeScreen;
