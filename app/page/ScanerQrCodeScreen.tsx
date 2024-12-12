import React from 'react';
import { View, Text } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';
import axios from 'axios';

const ScanQRCodeScreen = () => {
  const navigation = useNavigation();

  const onSuccess = async (e: any) => {
    const qrCodeId = e.data; // Dados do QR Code

    if (qrCodeId.startswith("user")) {
        const userEmail = qrCodeId.replace("user", "")
        const user = await axios.get(`http://172.20.10.6:3010/api/users/Igor@gmail.com`)
    }
      router.push("/messages/Chat")
      router.setParams({conversationId: qrCodeId})

  };

  return (
    <View style={{ flex: 1 }}>
      {/* <QRCodeScanner
        onRead={onSuccess} // Chama a função onSuccess após o QR Code ser escaneado
        reactivate={true} // Permite escanear múltiplos QR Codes sem sair da tela
        reactivateTimeout={3000} // Intervalo de reativação
        showMarker={true} // Exibe o marcador de QR Code
      /> */}
    </View>
  );
};

export default ScanQRCodeScreen;
