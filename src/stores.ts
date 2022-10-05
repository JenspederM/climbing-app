import { writable, type Writable } from "svelte/store";
import type { User, Route } from "./Firebase";

export const userStore: Writable<User> = writable();
export const routeStore: Writable<Route[]> = writable();
export const currentRouteStore: Writable<String> = writable();
