import { writable, type Writable } from "svelte/store";
import type { User } from "./Firebase/User";
import type { Route } from "./Firebase/Route";

export const userStore: Writable<User> = writable();
export const reouteStore: Writable<Route> = writable();
