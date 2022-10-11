<script lang="ts">
  import { db, type Route, type Session } from "../Firebase";
  import { routeStore, sessionStore } from "../stores";
  import Fa from "svelte-fa/src/fa.svelte";
  import {
    faCheckCircle,
    faFilter,
    faPlusCircle,
    faTimesCircle,
  } from "@fortawesome/free-solid-svg-icons";
  import { toTitleCase, getColor } from "../utils";
  import { slide } from "svelte/transition";
  import { arrayUnion, doc, updateDoc } from "firebase/firestore";

  let userSession: Session;
  let userRoutes: Array<Route> = [];
  let routeValidator = 0;
  let routeType = "All";
  let gripType = "All";
  let colorGrade = "All";
  let showFilters = false;

  routeStore.subscribe((value) => {
    userRoutes = value;
  });

  sessionStore.subscribe((value) => {
    userSession = value;
  });

  const toggleShowFilters = () => {
    showFilters = !showFilters;
  };

  const addRouteToSession = async (route: Route) => {
    if (routeValidator == 1) {
      const newRoute = { ...route, climbedAt: new Date() };
      await updateDoc(doc(db, "sessions", userSession.uid), {
        routes: arrayUnion(newRoute),
      });
      sessionStore.set(userSession);
      routeValidator = 0;
    } else {
      routeValidator++;
    }
  };

  const filterRoutes = (route) => {
    console.debug(`Selected route type: ${routeType}`);
    if (routeType === "All") {
      return true;
    } else if (routeType == "Other") {
      return !routeTypes.includes(route.routeType);
    } else if (routeType) {
      return route.routeType === routeType;
    }
  };

  const filterGrips = (route) => {
    console.debug(`Selected grip type: ${gripType}`);
    if (gripType === "All") {
      return true;
    } else if (gripType == "Other") {
      return !routeTypes.includes(route.gripType);
    } else if (gripType) {
      return route.gripType === gripType;
    }
  };

  const filterColors = (route) => {
    console.debug(`Selected color grade: ${gripType}`);
    if (colorGrade === "All") {
      return true;
    } else if (colorGrade) {
      return route.colorGrade.toLowerCase() === colorGrade.toLowerCase();
    }
  };

  $: gripTypes = [
    "All",
    ...new Set(userRoutes.map((r) => (r.gripType ? r.gripType : "Other"))),
  ];
  $: routeTypes = [
    "All",
    ...new Set(userRoutes.map((r) => (r.routeType ? r.routeType : "Other"))),
  ];
  $: colorGrades = [
    "All",
    ...new Set(
      userRoutes.map((r) => toTitleCase(r.colorGrade ? r.colorGrade : "Other"))
    ),
  ];
  $: filteredRoutes = userRoutes
    .filter(filterRoutes)
    .filter(filterGrips)
    .filter(filterColors)
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
</script>

<!-- ################ -->
<!--   Route Filter   -->
<!-- ################ -->
<div class="w-full sm:w-2/3">
  <button
    class="flex items-center justify-center text-xs bg-yellow-400 w-full px-2 py-2 text-white font-bold"
    on:click={toggleShowFilters}
  >
    <div>
      <Fa icon={faFilter} class="mr-2" />
    </div>
    <div>Filter</div>
  </button>

  {#if showFilters}
    <div>
      <div transition:slide class="flex w-full space-x-4 p-4 items-center">
        <div class="w-1/2">
          <label
            for="types"
            class="block mb-2 text-xs font-medium text-gray-900 dark:text-gray-400"
          >
            Grip Type
          </label>
          <select
            class="w-full font-light text-xs px-2 py-1"
            bind:value={gripType}
            name="types"
            id="types"
          >
            {#each gripTypes as _gripType}
              <option value={_gripType}>{_gripType}</option>
            {/each}
          </select>
        </div>
        <div class="w-1/2">
          <label
            for="types"
            class="block mb-2 text-xs font-medium text-gray-900 dark:text-gray-400"
          >
            Route Type
          </label>
          <select
            class="w-full font-light text-xs px-2 py-1"
            bind:value={routeType}
            name="types"
            id="types"
          >
            {#each routeTypes as _routeType}
              <option value={_routeType}>{_routeType}</option>
            {/each}
          </select>
        </div>
        <div class="w-1/2">
          <label
            for="colors"
            class="block mb-2 text-xs font-medium text-gray-900 dark:text-gray-400"
          >
            Color Grade
          </label>
          <select
            class="w-full font-light text-xs px-2 py-1"
            bind:value={colorGrade}
            name="colors"
            id="colors"
          >
            {#each colorGrades as _colorGrade}
              <option value={_colorGrade}>{_colorGrade}</option>
            {/each}
          </select>
        </div>
      </div>
    </div>
  {/if}
</div>

<!-- ############## -->
<!--   Route List   -->
<!-- ############## -->
<div class="overflow-auto w-full sm:w-2/3 items-center pb-2">
  {#each filteredRoutes as route}
    <div class="flex flex-col w-full sm:rounded-xl pt-2">
      <div
        class="flex flex-col rounded-xl px-4 py-2 mx-4 {getColor(
          route.colorGrade
        )}"
      >
        <div class="flex items-center justify-between w-full border-b-2">
          <div class="text-lg md:text-xl font-bold capitalize">
            {route.name}
          </div>
          {#if routeValidator === 0}
            <button
              class="text-xl py-2 px-6"
              on:click={() => addRouteToSession(route)}
            >
              <Fa icon={faPlusCircle} />
            </button>
          {:else if routeValidator === 1}
            <div class="flex space-x-2 py-2 px-6">
              <button
                class="text-xl"
                on:click={() => {
                  routeValidator = 0;
                }}
              >
                <Fa icon={faTimesCircle} />
              </button>
              <button class="text-xl" on:click={() => addRouteToSession(route)}>
                <Fa icon={faCheckCircle} />
              </button>
            </div>
          {:else}
            <button
              class="text-xl py-2 px-6"
              on:click={() => addRouteToSession(route)}
            >
              <Fa icon={faTimesCircle} />
            </button>
          {/if}
        </div>
        <div class="flex justify-between">
          <div class="flex space-x-2">
            <div>{route.routeType}</div>
            <div>{route.gripType}</div>
          </div>
          <div class="capitalize">Difficulty: {route.difficulty}</div>
        </div>
      </div>
    </div>
  {/each}
</div>
