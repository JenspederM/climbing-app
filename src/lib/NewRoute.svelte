<script lang="ts">
  import { doc, setDoc } from "firebase/firestore";
  import { db, Route, routeConverter } from "../Firebase";
  import { userStore } from "../stores";
  import { slide } from "svelte/transition";

  let user;

  let createNewRoute = false;
  let name;
  let routeType;
  let colorGrade;
  let difficulty;

  userStore.subscribe((value) => {
    user = value;
  });

  const toggleNewRoute = () => {
    createNewRoute = !createNewRoute;
  };

  const guid = () => {
    const CHARS =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    let autoId = "";

    for (let i = 0; i < 20; i++) {
      autoId += CHARS.charAt(Math.floor(Math.random() * CHARS.length));
    }
    return autoId;
  };

  const addRoute = () => {
    const newRoute = new Route({
      uid: guid(),
      name: name,
      type: routeType,
      colorGrade: colorGrade,
      difficulty: difficulty,
      createdAt: new Date(),
      createdBy: user.uid,
    });
    setDoc(
      doc(db, "routes", newRoute.uid).withConverter(routeConverter),
      newRoute
    );
    name = null;
    routeType = null;
    colorGrade = null;
    difficulty = null;
    createNewRoute = false;
  };

  $: buttonBg = createNewRoute ? "bg-red-500" : "bg-green-500";
</script>

<div class="w-full">
  <button
    on:click={toggleNewRoute}
    class="text-xl lg:text-2xl py-6 px-4 w-full {buttonBg}"
  >
    {!createNewRoute ? "New Route" : "Cancel"}
  </button>
  {#if createNewRoute}
    <div
      transition:slide
      class="flex flex-col w-full justify-center items-center py-3"
    >
      <form on:submit|preventDefault={addRoute}>
        <div class="flex flex-col font-bold space-y-2 py-2">
          <div class="">
            <div class="capitalize bg-green-300 px-2 py-1">Name</div>
            <input
              class="px-2 py-1 text-sm w-full"
              type="text"
              placeholder="Route Name"
              bind:value={name}
            />
          </div>
          <div>
            <div class="capitalize bg-green-300 px-2 py-1">Type</div>
            <input
              class="px-2 py-1"
              type="text"
              placeholder="Sloper"
              bind:value={routeType}
            />
          </div>
          <div>
            <div class="capitalize bg-green-300 px-2 py-1">Color Grade</div>
            <input
              class="px-2 py-1"
              type="text"
              placeholder="Blue"
              bind:value={colorGrade}
            />
          </div>
          <div>
            <div class="capitalize bg-green-300 px-2 py-1">Difficulty</div>
            <input
              class="px-2 py-1"
              type="text"
              placeholder="4"
              bind:value={difficulty}
            />
          </div>
        </div>
        <div class="bg-green-400 py-2 px-4 rounded-xl text-white text-center">
          <button class="text-xl font-bold" type="submit"> Add Route </button>
        </div>
      </form>
    </div>
  {/if}
</div>
