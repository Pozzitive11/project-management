export const environment = {
  production: false,
  BACKEND_URL: 'http://test.data-factory.ua',
  API_BASE_URL: '/api/v0',

  SOCKET_ENDPOINT: 'ws://10.11.33.10:8012/api/v0/websocket',
  asep_socket: 'ws://10.11.32.60:8000/api/v0/ASVPBot',
  postukr_socket: 'ws:///10.11.32.60:8000/api/v0/ukr_post',
  electronic_court_socket: 'ws://10.11.32.60:8000/api/v0/e_court/send_claims_socket',

  auth_api_url: '/auth',
  purpose_api_url: '/PurposePayments',
  req_check: '/request_check'
}
