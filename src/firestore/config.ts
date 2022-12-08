import * as admin from 'firebase-admin'

const serviceAccount = require("../../api-vue-guitarhero-firebase-adminsdk-1vtea-62ce4f6c21.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = {
    musics: admin.firestore().collection('musics')
}

export default db;