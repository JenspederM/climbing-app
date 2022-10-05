<script lang="ts">
  import {
    getDoc,
    doc,
    setDoc,
    onSnapshot,
    collection,
  } from "firebase/firestore";
  import {
    auth,
    db,
    Route,
    routeConverter,
    User,
    userConverter,
  } from "./Firebase";
  import { routeStore, userStore } from "./stores";
  import ProfileBar from "./lib/Profile.svelte";
  import NewRoute from "./lib/NewRoute.svelte";
  import Login from "./lib/Login.svelte";
  import { onDestroy } from "svelte";
  import RouteList from "./lib/RouteList.svelte";

  let user = null;

  userStore.subscribe((value) => {
    user = value;
  });

  const authUnsub = auth.onAuthStateChanged(async (user) => {
    if (user) {
      const loginUser = await getDoc(
        doc(db, "users", user.uid).withConverter(userConverter)
      );
      if (loginUser.exists()) {
        userStore.set(loginUser.data());
      } else {
        const newUser = new User({
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photoUrl: user.photoURL,
          createdAt: new Date(),
        });
        setDoc(
          doc(db, "users", user.uid).withConverter(userConverter),
          newUser
        );
        userStore.set(newUser);
      }
    } else {
      userStore.set(null);
    }
  });

  const routeUnsub = onSnapshot(
    collection(db, "routes").withConverter(routeConverter),
    (query) => {
      routeStore.set(query.docs.map((doc) => doc.data()));
    }
  );

  onDestroy(() => {
    authUnsub();
    routeUnsub();
  });
</script>

<div class="absolute inset-0">
  <div class="flex flex-col w-full h-screen">
    {#if user}
      <div class="flex justify-between items-center py-4 px-8">
        <div class="font-bold text-xl">Climbining App</div>
        <ProfileBar />
      </div>
      <div class="overflow-auto w-full">
        <div class="bg-green-400 h-6" />
        <NewRoute class="py-2 px-4  w-full sm:w-1/3  text-center" />
        <RouteList />
      </div>
    {:else}
      <Login />
    {/if}
  </div>
</div>
