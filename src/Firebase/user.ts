import type {
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  Timestamp,
  WithFieldValue,
} from "firebase/firestore";

interface IUser {
  uid: string;
  name: string;
  email: string;
  photoUrl: string;
  createdAt: Date;
}

export class User implements IUser {
  uid: string;
  name: string;
  email: string;
  photoUrl: string;
  createdAt: Date;

  constructor({ uid, name, email, photoUrl, createdAt = new Date() }: IUser) {
    this.uid = uid;
    this.name = name;
    this.email = email;
    this.photoUrl = photoUrl;
    if (createdAt instanceof Date) {
      this.createdAt = createdAt;
    } else {
      const _purchaseDate = createdAt as Timestamp;
      this.createdAt = _purchaseDate.toDate();
    }
  }
}

export const userConverter: FirestoreDataConverter<User> = {
  toFirestore: (user: WithFieldValue<User>) => {
    return {
      uid: user.uid,
      name: user.name,
      email: user.email,
      photoUrl: user.photoUrl,
      createdAt: user.createdAt,
    };
  },
  fromFirestore: (docSnap: QueryDocumentSnapshot<User>) => {
    return new User(docSnap.data());
  },
};
