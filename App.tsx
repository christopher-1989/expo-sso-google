import { StyleSheet, Text, View } from 'react-native'
import { useState } from 'react'
import {
  GoogleSignin,
  GoogleSigninButton,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
  User,
} from '@react-native-google-signin/google-signin'

GoogleSignin.configure({
  iosClientId: process.env.EXPO_PUBLIC_CLIENT_ID,
})

export default function App() {
  const [userInfo, setUserInfo] = useState<User | null>(null)

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices()
      const response = await GoogleSignin.signIn()
      if (isSuccessResponse(response)) {
        setUserInfo(response.data)
        console.log('user: ', response.data)
      } else {
        // sign in was cancelled by user
      }
    } catch (error) {
      console.log({ error })
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            // operation (eg. sign in) already in progress
            break
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // Android only, play services not available or outdated
            break
          default:
          // some other error happened
        }
      } else {
        // an error that's not related to google sign in occurred
      }
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SSO Demo App</Text>
      {userInfo ? (
        <Text style={styles.userInfo}>Welcome, {userInfo.user.givenName}</Text>
      ) : (
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={signIn}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: { fontSize: 24, marginBottom: 20 },
  userInfo: { marginTop: 20, fontSize: 18 },
})
