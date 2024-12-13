import { Alert, Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native'
import React, { useLayoutEffect, useMemo, useState } from 'react'
import { router, useNavigation } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import Animated, { interpolate, SlideInDown, useAnimatedRef, useAnimatedStyle, useScrollViewOffset } from 'react-native-reanimated'
import CustomButton from '@/components/CustomButton'
import Colors from '@/constants/Colors'
import Heading from '@/components/Heading'
import CustomInput from '@/components/inputs/CustomInput'
import ImageUpload from '@/components/inputs/ImageUpload'
import { createUser } from '../actions/user/createUser'
import { logIn } from '../actions/user/login'
import { User } from '..'
import { saveTokenToStore } from '../actions/token/saveTokenToStore'

enum STEPS {
    INTRO = 0,
    AUTHINFO = 1,
    IMGNAME = 2,
    PHONE = 3,
    HAVEACC = 4
}

const LoginPage = () => {
    const navigation = useNavigation()
    const colorScheme = useColorScheme()

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "",
            headerTransparent: true,
            headerBackground: () => (
                <Animated.View style={[styles.header, animatedHeader]} />
            ),
            headerLeft: () => (
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name='close' color={colorScheme == "dark" ?
                        "#fff" : "#000"
                    } size={22} />
                </TouchableOpacity>
            )
        })
    })
    const height = 100
    const scrollRef = useAnimatedRef<Animated.ScrollView>()
    const scrollOffset = useScrollViewOffset(scrollRef)
    const animatedHeader = useAnimatedStyle(() => {
        return {
            opacity: interpolate(scrollOffset.value, [0, height / 4], [0, 1]),
            backgroundColor: colorScheme == "dark" ? Colors.darkness : Colors.empty
        }
    })

    const [step, setStep] = useState(STEPS.INTRO)
    const [isLoading, setIsLoading] = useState(false)

    const onBack = () => {
        setStep((value) => value - 1)
        if (step == STEPS.INTRO) {
            router.back()
        } else if (step == STEPS.HAVEACC) {
            setStep(STEPS.INTRO)
        }
    }
    const onNext = () => {
        if (step == STEPS.PHONE) {
            onSubmit()
        }
        else if (step == STEPS.HAVEACC) {
            signIn()
        }
        else {
            setStep((value) => value + 1)
        }
    }
    const actionLabel = useMemo(() => {
        if (step == STEPS.PHONE) {
            return 'Create'
        } else if (step == STEPS.HAVEACC) {
            return "Login"
        }
        return 'Next'
    }, [step])
    const secondaryActionLabel = useMemo(() => {
        if (step == STEPS.INTRO) {
            return 'Close'
        }
        return 'Back'
    }, [step])

    const [email, setEmail] = useState("")
    const [hashedPassword, setPassword] = useState("")
    const [displayName, setDisplayName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [image, setImage] = useState("")

    //--------------Image-----------------------------\\
    const handleImageChange = (selected: string) => {
        setImage(selected)
    }

    //--------------------------Submit--------------------\\
    const onSubmit = async () => {
        if (step != STEPS.PHONE) {
            return onNext()
        }
        setIsLoading(true)
        try {
            const data = {
                email: email,
                hashedPassword: hashedPassword,
                displayName: displayName,
                phoneNumber: phoneNumber,
                image: image
            }
            await createUser(data)
        } catch (error) {
            Alert.alert("Oops", "something went wrong")
        } finally {
            setIsLoading(false)
        }
    }
    //----------------------Login-----------------------\\
    const signIn = async () => {
        setIsLoading(true)
        try {
            const data = {
                email: email,
                hashedPassword: hashedPassword
            }
            const login = await logIn(email, hashedPassword);
            console.log(login.data)
            if (!login) {
                throw new Error("Login response is undefined");
            }

            const { token, user } = login;
            await saveTokenToStore(token, user)
            Alert.alert('Sucesso', 'login realizado com sucesso')
            router.push("/(tabs)")
        } catch (error) {
            Alert.alert('Erro', 'Erro ao logar usuario')
            console.log("Erro: ", error)
        } finally {
            setIsLoading(false)
        }
    }

    console.log(email)

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS == "ios" ? "height" : "position"}
        >
            <Animated.View style={{}}>
                {step == STEPS.INTRO && (
                    <Animated.ScrollView style={[styles.steps, {
                        backgroundColor: colorScheme == "dark" ? "#000" : "#fff"
                    }]} ref={scrollRef}>
                        <View>
                            <Heading medium='Hi, Welcome' />
                            <Image />
                            <View style={{ marginTop: 20, height: 300, backgroundColor: "blue" }}>
                                <Text>
                                    Image Here
                                </Text>
                            </View>
                            <View style={{ marginVertical: 20 }}>
                                <Text style={{
                                    color: colorScheme == "dark" ? "#fff" : "#000",
                                    fontSize: 16
                                }}>
                                    Ready to start? Create quickly conversation with someone, by share or
                                    scan a QR Code
                                </Text>
                            </View>
                        </View>
                        <TouchableOpacity style={{ marginTop: 200 }} onPress={() => setStep(STEPS.HAVEACC)}>
                            <Text style={{
                                fontWeight: "500", color: colorScheme == "dark" ? "#fff" : "#000",
                                fontSize: 16, textDecorationLine: "underline"
                            }}>
                                Already have account?
                            </Text>
                        </TouchableOpacity>
                    </Animated.ScrollView>
                )}
                {step == STEPS.AUTHINFO && (
                    <Animated.ScrollView style={[styles.steps, {
                        backgroundColor: colorScheme == "dark" ? "#000" : "#fff"
                    }]} ref={scrollRef}>
                        <View>
                            <Heading
                                medium='Start by create account'
                                subtitle='Add your email and receive a individual ID that will be used for your conversations'
                            />
                            <View style={{ marginVertical: 40, flexDirection: "column", gap: 30 }}>
                                <CustomInput
                                    title='Email'
                                    value={email}
                                    onChangeText={setEmail}
                                />
                                <CustomInput
                                    title='Password'
                                    value={hashedPassword}
                                    onChangeText={setPassword}
                                />
                            </View>
                        </View>
                    </Animated.ScrollView>
                )}
                {step == STEPS.IMGNAME && (
                    <Animated.ScrollView style={[styles.steps, {
                        backgroundColor: colorScheme == "dark" ? "#000" : "#fff"
                    }]} ref={scrollRef}>
                        <View>
                            <Heading
                                medium={`How you'll appear`}
                                subtitle='Add a profile image and your display name, this is how other will see you'
                            />
                            <View style={{ marginTop: 40, flexDirection: "column", gap: 20 }}>
                                <View style={{ justifyContent: "center", alignItems: "center" }}>
                                    <ImageUpload
                                        value={image}
                                        onChange={handleImageChange}
                                    />
                                </View>
                                <Heading small='Display name' />
                                <View>
                                    <CustomInput
                                        title='Display name'
                                        value={displayName}
                                        onChangeText={setDisplayName}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={{ marginTop: 100 }} />
                    </Animated.ScrollView>
                )}
                {step == STEPS.PHONE && (
                    <Animated.ScrollView style={[styles.steps, {
                        backgroundColor: colorScheme == "dark" ? "#000" : "#fff"
                    }]} ref={scrollRef}>
                        <View>
                            <Heading
                                medium='Phone number'
                                subtitle='Your number wont be showned with anyone'
                            />
                            <View style={{ marginVertical: 40, flexDirection: "column", gap: 30 }}>
                                <CustomInput
                                    title='Phone number'
                                    value={phoneNumber}
                                    onChangeText={setPhoneNumber}
                                />

                            </View>
                        </View>
                    </Animated.ScrollView>
                )}
                {step == STEPS.HAVEACC && (
                    <Animated.ScrollView style={[styles.steps, {
                        backgroundColor: colorScheme == "dark" ? "#000" : "#fff"
                    }]} ref={scrollRef}>
                        <View>
                            <Heading
                                medium='Login'
                                subtitle='Login to your account'
                            />
                            <View style={{ marginVertical: 40, flexDirection: "column", gap: 30 }}>
                                <CustomInput
                                    title='Email'
                                    value={email}
                                    onChangeText={setEmail}
                                />
                                <CustomInput
                                    title='password'
                                    value={hashedPassword}
                                    onChangeText={setPassword}
                                />

                            </View>
                        </View>
                    </Animated.ScrollView>
                )}
            </Animated.View>
            <Animated.View style={[styles.footer, {
                backgroundColor: colorScheme == "dark" ? Colors.darkness : Colors.empty,
                borderTopColor: colorScheme == "dark" ? "rgba(255,255,255,0.1)" : "#eee"

            }]} entering={SlideInDown.duration(150)}>
                <View style={[styles.footerContainer]}>
                    <TouchableOpacity onPress={() => onBack()}>
                        <Text style={{
                            fontSize: 16, fontWeight: "500",
                            color: colorScheme == "dark" ? "#fff" : "#000"
                        }}>
                            {secondaryActionLabel}
                        </Text>
                    </TouchableOpacity>
                    <CustomButton
                        small title={actionLabel}
                        onPress={() => onNext()}
                        disabled={isLoading}
                    />
                </View>
            </Animated.View>
        </KeyboardAvoidingView>
    )
}

export default LoginPage

const styles = StyleSheet.create({
    steps: {
        paddingHorizontal: 20,
        paddingVertical: 110,
        // backgroundColor: "#fff",
        height: "100%"
    },
    header: {
        height: "100%",
        borderBottomWidth: 0.6,
        backgroundColor: "#fff"
    },
    footer: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        borderTopWidth: 1,
        borderTopColor: Colors.lightGray,
        // backgroundColor: "#fff",
        paddingHorizontal: 20,
        paddingTop: 10,
        height: 100

    },
    footerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
        width: "100%",
    },
})