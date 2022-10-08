import type {
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  Timestamp,
  WithFieldValue,
} from "firebase/firestore";

export interface IRoute {
  uid: string;
  name: string;
  routeType: string;
  gripType: string;
  colorGrade: string;
  difficulty: number;
  createdAt: Date;
  createdBy: string;
}

export class Route implements IRoute {
  uid: string;
  name: string;
  routeType: string;
  gripType: string;
  colorGrade: string;
  difficulty: number;
  createdAt: Date;
  createdBy: string;

  constructor({
    name,
    uid,
    routeType,
    gripType,
    colorGrade,
    difficulty,
    createdAt,
    createdBy,
  }: IRoute) {
    this.uid = uid;
    this.name = name;
    this.routeType = routeType;
    this.gripType = gripType;
    this.colorGrade = colorGrade;
    this.difficulty = difficulty;
    if (createdAt instanceof Date) {
      this.createdAt = createdAt;
    } else {
      const _purchaseDate = createdAt as Timestamp;
      this.createdAt = _purchaseDate.toDate();
    }
    this.createdBy = createdBy;
  }
}

export const routeConverter: FirestoreDataConverter<Route> = {
  toFirestore: (route: WithFieldValue<Route>) => {
    return {
      uid: route.uid,
      name: route.name,
      routeType: route.routeType,
      gripType: route.gripType,
      colorGrade: route.colorGrade,
      difficulty: route.difficulty,
      createdAt: route.createdAt,
      createdBy: route.createdBy,
    };
  },
  fromFirestore: (docSnap: QueryDocumentSnapshot<Route>) => {
    return new Route(docSnap.data());
  },
};
