const CONF = {}

switch (process.env.NODE_ENV) {
    case 'development':
        // CONF.DOMAIN = 'myhabit-api.herokuapp.com'
        // CONF.PROTCOL = 'https'
        CONF.DOMAIN = 'localhost:3000'
        CONF.PROTCOL = 'http'
        break;
    case 'staging':
        break;
    case 'production':
        CONF.DOMAIN = 'myhabit-api.herokuapp.com'
        CONF.PROTCOL = 'https'
        break;
    default:
        throw new Error("not set env");
  }

  CONF.PATH = 'api/v1'
  CONF.APIURL = CONF.PROTCOL + '://' + CONF.DOMAIN + '/' + CONF.PATH
  console.log(CONF.APIURL)

  export const appConfig = Object.freeze(CONF)