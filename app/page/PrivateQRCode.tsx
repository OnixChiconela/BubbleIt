import { Alert, Image, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { router, useLocalSearchParams, useNavigation } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import Heading from '@/components/Heading'
import Avatar from '@/components/Avatar'
import Colors from '@/constants/Colors'
import { User } from '..'
import { getCurrentUserFromStorage } from '../actions/user/getCurrentUserFromStorage'
import { captureRef } from 'react-native-view-shot'
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";



const PrivateQRCode = () => {
    const navigation = useNavigation()
    const colorScheme = useColorScheme()

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "QR Code",
            headerLeft: () => (
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons
                        name='chevron-back' size={22}
                        color={colorScheme == "dark" ? "#fff" : "#000"}
                    />
                </TouchableOpacity>
            ),
            headerRight: () => (
                <TouchableOpacity onPress={() => share()}>
                    <Ionicons
                        name='share-outline' size={22}
                        color={colorScheme == "dark" ? "#fff" : "#000"}
                    />
                </TouchableOpacity>
            )
        })
    }, [])

    const [currentUser, setCurrentUser] = useState<User>()
    useEffect(() => {
        const getUser = async () => {
            try {
                const { user } = await getCurrentUserFromStorage()
                setCurrentUser(user)
            } catch (error) {

            }
        }
        getUser()
    }, [])

    const [localUri, setLocalUri] = useState<string | null>(null);

    useEffect(() => {
      const saveBase64ToFile = async () => {
        if (currentUser?.qrCodeImage) {
          const fileUri = FileSystem.documentDirectory + `${currentUser.displayName}qrCodeImage.png`;
          
          try {
            // Salva a imagem base64 no dispositivo
            await FileSystem.writeAsStringAsync(fileUri, currentUser.qrCodeImage.split(',')[1], {
              encoding: FileSystem.EncodingType.Base64,
            });
  
            // Atualiza o URI para o caminho do arquivo
            setLocalUri(fileUri);
          } catch (error) {
            console.error("Erro ao salvar a imagem:", error);
            Alert.alert("Erro", "Não foi possível salvar a imagem.");
          }
        }
      };
  
      saveBase64ToFile();
    }, [currentUser]);

    const share = async () => {
        try {
            if (localUri) {
              const isAvailable = await Sharing.isAvailableAsync();
              if (isAvailable) {
                await Sharing.shareAsync(localUri); // Compartilha o arquivo temporário
              } else {
                Alert.alert("Erro", "Compartilhamento não disponível neste dispositivo.");
              }
            } else {
              Alert.alert("Erro", "QR Code não disponível.");
            }
          } catch (error) {
            console.error("Erro ao compartilhar o QR Code:", error);
            Alert.alert("Erro", "Não foi possível compartilhar o QR Code.");
          }
    }

    return (
        <View style={{ height: "100%", backgroundColor: colorScheme == "dark" ? "#000" : "#fff" }}>

            <View style={{
                backgroundColor: colorScheme == "dark" ? "#000" : "#fff",
                paddingHorizontal: 20,
                marginTop: 10
            }}>
                <View>
                    <Heading medium='ID'
                        subtitle={`By share your qr code you're allowing someone to start conversation with you!`}
                    />
                </View>

                <View style={{ marginTop: 30, flexDirection: "column", alignItems: "center", gap: 15, justifyContent: 'center' }}>
                    <Avatar src={""} height={60} width={60} />
                    <Text style={{
                        fontSize: 16.5, fontWeight: "500",
                        color: colorScheme == "dark" ? "#fff" : "#000"
                    }}>
                        {currentUser?.displayName}
                    </Text>
                </View>
                <View style={{
                    marginTop: 20,
                    padding: 20,
                    justifyContent: "center",
                    borderRadius: 12,
                    alignItems: "center",
                    backgroundColor: colorScheme == "dark" ? Colors.darkness : Colors.empty,


                }}>
                    <Image
                        source={{ uri: currentUser?.qrCodeImage }}
                        style={{ height: "65%", resizeMode: "cover", aspectRatio: 12 / 12 }}
                    />
                </View>
            </View>
        </View>
    )
}

export default PrivateQRCode

const styles = StyleSheet.create({})