import * as admin from 'firebase-admin'

const serviceAccount = require("../../api-vue-guitarhero-firebase-adminsdk-1vtea-62ce4f6c21.json");

const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export default app;