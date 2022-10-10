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
  startedAt: Date;
  routes: Route[];
}

export class Session implements ISession {
  uid: string;
  userUid: string;
  date: string;
  startedAt: Date;
  routes: Route[];

  constructor({ uid, userUid, date, startedAt, routes }: ISession) {
    this.uid = uid;
    this.userUid = userUid;
    this.date = date;
    if (startedAt instanceof Date) {
      this.startedAt = startedAt;
    } else {
      const _startedAt = startedAt as Timestamp;
      console.log(startedAt);
      this.startedAt = _startedAt.toDate();
    }
    this.routes = routes;
  }
}

export const sessionConverter: FirestoreDataConverter<Session> = {
  toFirestore: (session: WithFieldValue<Session>) => {
    console.log(`session.toFirestore: ${JSON.stringify(session)}`);
    return {
      uid: session.uid,
      userUid: session.userUid,
      date: session.date,
      startedAt: session.startedAt,
      routes: session.routes,
    };
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot<Session>) => {
    return new Session(snapshot.data());
  },
};
