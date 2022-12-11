import app from './config'

const db = {
    musics: app.firestore().collection('musics')
}

export default db