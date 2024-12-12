# expo-sso-google

This bare application is a demonstration of how to integrate the React Native package `@react-native-google-signin/google-signin` into an Expo project for handling SSO with Google.

---

## Configuration

I have only included the configuration for iOS.
See the [documentation](https://react-native-google-signin.github.io/)

Replace values in curly parentheses, eg `{bundleIdentifier}` in `app.json`.
Replace `EXPO_PUBLIC_CLIENT_ID` environment variable in `App.tsx`. Do not follow this pattern in production as your client id would be exposed.

---

Note that this cannot be tested or used in Expo Go.
To test, run:
`npx expo prebuild --clean`
then
`npx expo run:android && npx expo run:ios`
