<script lang="ts">
  import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
  import {
    onSnapshot,
    getDoc,
    doc,
    setDoc,
    collection,
  } from "firebase/firestore";
  import { auth, db } from "./Firebase";
  import { User, userConverter } from "./Firebase/User";
  import { Route, routeConverter } from "./Firebase/Route";
  import { userStore } from "./stores";

  let user = null;

  userStore.subscribe((value) => {
    user = value;
  });

  auth.onAuthStateChanged(async (user) => {
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
      }
    } else {
      userStore.set(null);
    }
    getDoc(doc(db, "users", user.uid).withConverter(userConverter))
      .then((doc) => {
        if (doc.exists()) {
          userStore.set(doc.data());
        } else {
          // doc.data() will be undefined in this case
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  });

  const loginWithGooglePopUp = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  onSnapshot(
    collection(db, "routes").withConverter(routeConverter),
    (query) => {
      query.forEach((doc) => {
        console.log(doc.data());
      });
    }
  );

  const guid = () => {
    const CHARS =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    let autoId = "";

    for (let i = 0; i < 20; i++) {
      autoId += CHARS.charAt(Math.floor(Math.random() * CHARS.length));
    }
    return autoId;
  };

  let name = "";
  let type = "";
  let colorGrade = "";
  let difficulty = -1;

  const addRoute = () => {
    const newRoute = new Route({
      uid: guid(),
      name: name,
      type: type,
      colorGrade: colorGrade,
      difficulty: difficulty,
      createdAt: new Date(),
      createdBy: user.uid,
    });
    setDoc(
      doc(db, "routes", newRoute.uid).withConverter(routeConverter),
      newRoute
    );
    name = "";
    type = "";
    colorGrade = "";
    difficulty = -1;
  };
</script>

<div class="flex flex-col p-4 bg-gray-200 absolute inset-0 w-full">
  {#if user}
    <div class="flex items-center justify-end space-x-6">
      <div class="flex flex-col w-8 sm:w-10">
        <img class="rounded-full" src={user.photoUrl} alt="profile" />
      </div>
    </div>
    <form
      class="flex flex-col w-full justify-center items-center space-y-2"
      on:submit|preventDefault={addRoute}
    >
      <div>
        <div class="flex flex-col font-bold">
          <div>
            <div class="capitalize">Name</div>
            <input
              class="px-2 py-1 text-sm w-full"
              type="text"
              bind:value={name}
            />
            <div>{name}</div>
          </div>
          <div>
            <div class="capitalize">Type</div>
            <input class="px-2 py-1" type="text" bind:value={type} />
            <div>{type}</div>
          </div>
          <div>
            <div class="capitalize">Color Grade</div>
            <input class="px-2 py-1" type="text" bind:value={colorGrade} />
            <div>{colorGrade}</div>
          </div>
          <div>
            <div class="capitalize">Difficulty</div>
            <input class="px-2 py-1" type="text" bind:value={difficulty} />
            <div>{difficulty}</div>
          </div>
        </div>
      </div>
      <div>
        <button type="submit"> Add Route </button>
      </div>
    </form>
  {:else}
    <button class="text-3xl" on:click={loginWithGooglePopUp}>Login!</button>
  {/if}
</div>
