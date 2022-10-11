<script lang="ts">
  import {
    getDoc,
    doc,
    setDoc,
    onSnapshot,
    collection,
    getDocs,
    query,
    where,
  } from "firebase/firestore";
  import {
    auth,
    db,
    Session,
    routeConverter,
    sessionConverter,
    User,
    userConverter,
  } from "./Firebase";
  import { routeStore, sessionStore, userStore } from "./stores";
  import ProfileBar from "./lib/Profile.svelte";
  import NewRoute from "./lib/NewRoute.svelte";
  import Login from "./lib/Login.svelte";
  import { onDestroy } from "svelte";
  import RouteList from "./lib/RouteList.svelte";
  import { guid } from "./utils";
  import CurrentSession from "./lib/CurrentSession.svelte";

  let user = null;
  let userSession: Session = null;

  userStore.subscribe((value) => {
    user = value;
  });

  sessionStore.subscribe((value) => {
    userSession = value;
  });

  const sessionUnsub = onSnapshot(
    collection(db, "sessions").withConverter(sessionConverter),
    (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          if (user) {
            console.log("Added session");
            sessionStore.set(change.doc.data());
          }
        }
        if (change.type === "modified") {
          sessionStore.set(change.doc.data());
          console.log("Modified session: ", change.doc.data());
        }
        if (change.type === "removed") {
          sessionStore.set(change.doc.data());
          console.log("Removed session: ", change.doc.data());
        }
      });
    }
  );

  const authUnsub = auth.onAuthStateChanged(async (user) => {
    if (user) {
      const loginUser = await getDoc(
        doc(db, "users", user.uid).withConverter(userConverter)
      );

      let newUser;

      if (loginUser.exists()) {
        newUser = loginUser.data();
      } else {
        newUser = new User({
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
      }

      const today = new Date().toDateString();

      const sessionsQuery = await getDocs(
        query(
          collection(db, "sessions").withConverter(sessionConverter),
          where("userUid", "==", user.uid),
          where("date", "==", today)
        )
      );

      let sessions = [];

      sessionsQuery.forEach((session) => {
        sessions.push(session.data());
      });

      if (sessions.length === 0) {
        const newSession = new Session({
          uid: guid(),
          userUid: user.uid,
          date: today,
          startedAt: new Date(),
          routes: [],
        });

        setDoc(
          doc(db, "sessions", newSession.uid).withConverter(sessionConverter),
          newSession
        );

        sessions.push(newSession);
      }

      console.log("Sessions: ", sessions);
      sessionStore.set(sessions[0]);
      userStore.set(newUser);
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
    if (userSession) {
      console.log(`Saving app session ${userSession}`);
      setDoc(
        doc(db, "sessions", userSession.uid).withConverter(sessionConverter),
        userSession
      );
    }
    authUnsub();
    routeUnsub();
    sessionUnsub();
  });
</script>

<div class="flex bg-gray-200 flex-col w-full items-center absolute inset-0">
  {#if user}
    <div class="flex w-full sm:w-2/3 justify-between items-center py-4 px-8">
      <div class="font-bold text-3xl sm:text-4xl font-['Lobster']">Climb</div>
      <ProfileBar />
    </div>
    <div class="flex w-full sm:w-2/3 items-center justify-center">
      <NewRoute />
    </div>
    <RouteList />
    <CurrentSession />
  {:else}
    <Login />
  {/if}
</div>
