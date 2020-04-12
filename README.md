# React Native App for Healert
 *This app utilizes the `React Native CLI` instead of the `Expo CLI` as earlier done.* Before you begin, make sure you setup your environment as outlined here https://reactnative.dev/docs/environment-setup. Ensure you have installed as indicated by the docs:

 1) JDK
 2) Android Studio
 3) Android SDK + Android Virtual Devoce
 4) XCode
 5) Cocoapods

# Development
 1. Clone the project on your machine `git clone https://github.com/Healert/healert-app.git`
 2. Install dependencies by running `yarn`
 3. Setup firebase config: 
    1. Android - include the `google-services.json` under `android/app` for firebase auth
    2. For IoS, using xcode, open the `ios` folder and right click the `healert` folder, click add files and add `GoogleService-info.plist`, ensure the copy files if needed checkbox is checked. Then add `GoogleService-info.plist` under the *Build Phases* tab in the *Compile Sources* section as shown in the image below. Then run `cd ios && pod install && cd ..`
    ![Adding GoogleService-info.plist to Compile Sources in XCode](screenshot.png)
 4. Run:
    1. Android: `yarn run:android`
    2. IoS: `yarn run:ios`


