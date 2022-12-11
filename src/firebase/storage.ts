import app from './config'

const bucket = app.storage().bucket('gs://api-vue-guitarhero.appspot.com')

export default bucket