import type {
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  Timestamp,
  WithFieldValue,
} from "firebase/firestore";
import type { Route } from "./route";

export interface ISession {
  uid: string;
  userUid: string;
  date: string;
  routes: Route[];
}

export class Session implements ISession {
  uid: string;
  userUid: string;
  date: string;
  routes: Route[];

  constructor({ uid, userUid, date, routes }: ISession) {
    this.uid = uid;
    this.userUid = userUid;
    this.date = date;
    this.routes = routes;
  }
}

export const sessionConverter: FirestoreDataConverter<Session> = {
  toFirestore: (session: WithFieldValue<Session>) => {
    return {
      uid: session.uid,
      userUid: session.userUid,
      date: session.date,
      routes: session.routes,
    };
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot<Session>) => {
    return new Session(snapshot.data());
  },
};
