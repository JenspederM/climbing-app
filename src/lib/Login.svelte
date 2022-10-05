<script lang="ts">
  import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
  import { auth } from "../Firebase";
  import { userStore } from "../stores";

  let user;

  userStore.subscribe((value) => {
    user = value;
  });

  const loginWithGooglePopUp = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };
</script>

<div
  class="flex flex-col bg-gray-400 justify-center items-center absolute inset-0"
>
  <button
    class="bg-gradient-to-tr from-green-400 to-green-500 text-white rounded-xl px-4 py-2 2xl:px-8 2xl:py-4 text-2xl lg:text-3xl xl:text-4xl 2xl:text-6xl"
    on:click={loginWithGooglePopUp}>Login!</button
  >
</div>
