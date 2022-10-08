<script lang="ts">
  import { doc, setDoc } from "firebase/firestore";
  import { db, Route, routeConverter } from "../Firebase";
  import { userStore } from "../stores";
  import { slide } from "svelte/transition";
  import { COLOR_MAP, GRIP_TYPES as ROUTE_TYPES } from "../constants";

  let user;

  let createNewRoute = false;
  let name;
  let difficulty;
  let routeType;
  let colorGrade;

  const colorGrades = Object.keys(COLOR_MAP);
  const routeTypes = ROUTE_TYPES;

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

  function toTitleCase(str: String): String {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

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
    difficulty = null;
    colorGrade = colorGrades[0];
    routeType = routeTypes[0];
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
              class="px-2 py-1 font-light text-sm w-full"
              type="text"
              placeholder="Route Name"
              bind:value={name}
            />
          </div>
          <div>
            <div class="capitalize bg-green-300 px-2 py-1">Difficulty</div>
            <input
              class="w-full font-light px-2 py-1"
              type="text"
              placeholder="4"
              bind:value={difficulty}
            />
          </div>
          <div>
            <div class="capitalize bg-green-300 px-2 py-1">Type</div>
            <select
              class="w-full font-light text-sm px-2 py-1"
              bind:value={routeType}
              name="grips"
              id="grips"
            >
              {#each routeTypes as _routeType}
                <option value={_routeType}>{toTitleCase(_routeType)}</option>
              {/each}
            </select>
          </div>
          <div>
            <div class="capitalize bg-green-300 px-2 py-1">Color Grade</div>
            <select
              class="w-full font-light text-sm px-2 py-1"
              bind:value={colorGrade}
              name="colors"
              id="colors"
            >
              {#each colorGrades as color}
                <option value={color}>{toTitleCase(color)}</option>
              {/each}
            </select>
          </div>
        </div>
        <div class="bg-green-400 py-2 px-4 rounded-xl text-white text-center">
          <button class="text-xl font-bold" type="submit"> Add Route </button>
        </div>
      </form>
    </div>
  {/if}
</div>
