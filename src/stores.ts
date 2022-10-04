import { writable, type Writable } from "svelte/store";
import type { User } from "./firebase";

export const userStore: Writable<User> = writable();
