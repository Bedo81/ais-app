// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: "https://us-central1-ris-app-a3f30.cloudfunctions.net",
  firebaseConfig: {
    apiKey: "AIzaSyBUcoLLw1Af_zZ6R_ypxgnY4TIctqluLN4",
    authDomain: "ris-app-a3f30.firebaseapp.com",
    databaseURL: "https://ris-app-a3f30-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "ris-app-a3f30",
    storageBucket: "ris-app-a3f30.appspot.com",
    messagingSenderId: "106106355778",
    appId: "1:106106355778:web:ee83e1aebe4eb486adeddb",
    measurementId: "G-HWFY4PRD1P"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
