# Runner

## Run app
### Start metro server (keep metro server running)
```
react-native start
```
### Install app
```
react-native start-android
```

## Generate SHA-1
### Syntax
```
keytool -list -v -keystore PATH_TO_YOUR_KEYSTORE.keystore -alias YOUR_ALIAS_NAME -storepass YOUR_STORE_PASS -keypass YOUR_KEY_PASS
```
### For debug (goto ./android/app)
### Alias and password are set by default, you can change them in ./android/app/build.gradle, look for `signingConfigs`.
```
keytool -list -v -keystore debug.keystore -alias androiddebugkey -storepass android -keypass android
```
### For release APK click [here](https://reactnative.dev/docs/signed-apk-android) for help.
### After getting both SHA-1 put them in firebase android config and download `google-services.json` and place that in ./android/

## Google Map API
### You can take help from [here](https://medium.com/@kinley.tshering/google-maps-with-react-native-f7c98bb92362)
### After getting API paste it in ./android/app/src/main/AndroidManifest.xml

## Configure Firebase
### In google-services.json find client_id with client_type = 3. Copy that id and paste that in ./src/utils/Config.js , google_web_client_id.

## Platforms
### Android
> Eveything works fine.
### IOS
> Not Tested

## Any Errors ?
### [Google Signin](https://github.com/react-native-google-signin/google-signin)
### [Google Map](https://github.com/Agontuk/react-native-geolocation-service)
