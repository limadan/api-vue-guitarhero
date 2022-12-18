import { User } from '../models/User'
import app from './config'

const UserConverter = {
    toFirestore: (data: User) => data,
    fromFirestore: (snap: FirebaseFirestore.QueryDocumentSnapshot) => {
        return { id: snap.id, ...snap.data() } as User
    }
}

const db = {
    musics: app.firestore().collection('musics'),
    users: app.firestore().collection('users').withConverter(UserConverter)
}

export default db