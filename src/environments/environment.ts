// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // local
  //baseUrlAnalityca:'http://127.0.0.1:9000/apianalytica/',
  //baseUrlCfdi: 'http://127.0.0.1:8000/descarga',

  // Servidor Dev.
  baseUrlAnalityca:'http://167.86.112.83:8000/apianalytica/',
  baseUrlCfdi: 'http://167.86.112.83:9000/descarga',


  aKey: '857c4402ad934005eae4638a93812bf7'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
