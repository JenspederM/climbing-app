<script lang="ts">
  import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
  import { onSnapshot, getDoc, doc, setDoc } from "firebase/firestore";
  import { auth, db, User, userConverter } from "./firebase";
  import { userStore } from "./stores";

  let user = null;

  userStore.subscribe((value) => {
    user = value;
  });

  const unsubAuth = auth.onAuthStateChanged(async (user) => {
    if (user) {
      console.log("user is signed in");
      console.log(user);
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
      console.log("user is signed out");
      userStore.set(null);
    }
    getDoc(doc(db, "users", user.uid).withConverter(userConverter))
      .then((doc) => {
        if (doc.exists()) {
          console.log("Document data:", doc.data());
          userStore.set(doc.data());
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
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
</script>

<div class="flex flex-col p-4 bg-gray-200 absolute inset-0 w-full">
  {#if user}
    <div class="flex items-center justify-end space-x-6">
      <div class="flex flex-col w-8 sm:w-10">
        <img class="rounded-full" src={user.photoUrl} alt="profile" />
      </div>
      <div class="text-sm sm:text-lg">
        <div class="flex  justify-between  space-x-1">
          <div>Navn:</div>
          <div>{user.name}</div>
        </div>
        <div class="flex justify-between space-x-8">
          <div>Email:</div>
          <div>{user.email}</div>
        </div>
      </div>
    </div>
  {:else}
    <button class="text-3xl" on:click={loginWithGooglePopUp}>Login!</button>
  {/if}
</div>
