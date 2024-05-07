// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  BACKEND_URL: 'http://test.data-factory.ua',
  API_BASE_URL: '/api/v0',

  SOCKET_ENDPOINT: 'ws://localhost:8050/api/v0/websocket',
  auth_api_url: '/auth',
  purpose_api_url: '/PurposePayments',
  req_check: '/request_check'
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
