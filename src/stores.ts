import { writable, type Writable } from "svelte/store";
import type { User, Route, Session } from "./Firebase";

export const userStore: Writable<User> = writable();
export const routeStore: Writable<Route[]> = writable();
export const sessionStore: Writable<Session> = writable();
