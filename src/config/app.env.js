const CONF = {}

switch (process.env.NODE_ENV) {
    case 'development':
        // CONF.DOMAIN = 'myhabit-server.herokuapp.com'
        // CONF.PATH = 'api/v1'
        // CONF.PROTCOL = 'https'
        CONF.DOMAIN = 'localhost:3000'
        CONF.PATH = 'api/v1'
        CONF.PROTCOL = 'http'
        CONF.APIURL = CONF.PROTCOL + '://' + CONF.DOMAIN + '/' + CONF.PATH
        break;
    case 'staging':
        break;
    case 'production':
        break;
    default:
        throw new Error("not set env");
  }

  export const appConfig = Object.freeze(CONF)