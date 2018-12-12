const CONF = {}

switch (process.env.NODE_ENV) {
    case 'development':
        CONF.APIDOMAIN = 'localhost'
        CONF.APIPORT = '3000'
        CONF.APIURL = 'http://' + CONF.APIDOMAIN + ':' + CONF.APIPORT + '/'
        break;
    case 'staging':
        break;
    case 'production':
        break;
    default:
        throw new Error("not set env");
  }

  export const appConfig = Object.freeze(CONF)