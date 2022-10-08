<script lang="ts">
  import type { Route } from "../Firebase";
  import { routeStore } from "../stores";
  import Fa from "svelte-fa/src/fa.svelte";
  import {
    faPersonFalling,
    faPlusCircle,
  } from "@fortawesome/free-solid-svg-icons";
  import { COLOR_MAP } from "../constants";
  import { toTitleCase } from "../utils";
  export let userRoutes: Array<Route> = [];

  let routeType;
  let gripType;
  let colorGrade;

  const colorMap = COLOR_MAP;

  routeStore.subscribe((value) => {
    userRoutes = value;
  });

  const getColor = (color: string) => {
    const lowerColor = color.toLowerCase();
    if (lowerColor in colorMap) {
      return colorMap[lowerColor].background;
    } else {
      return "bg-white";
    }
  };

  const filterRoutes = (route) => {
    console.log(`Selected route type: ${routeType}`);
    if (routeType === "All") {
      return true;
    } else if (routeType == "Other") {
      return !routeTypes.includes(route.routeType);
    } else if (routeType) {
      return route.routeType === routeType;
    }
  };

  const filterGrips = (route) => {
    console.log(`Selected grip type: ${gripType}`);
    if (gripType === "All") {
      return true;
    } else if (gripType == "Other") {
      return !routeTypes.includes(route.gripType);
    } else if (gripType) {
      return route.gripType === gripType;
    }
  };

  const filterColors = (route) => {
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

<div class="flex flex-col space-y-2 justify-center items-center">
  <div class="flex w-full space-x-4 p-4 items-center">
    <div class="w-1/2">
      <label
        for="types"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
      >
        Grip Type
      </label>
      <select
        class="w-full font-light text-sm px-2 py-1"
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
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
      >
        Route Type
      </label>
      <select
        class="w-full font-light text-sm px-2 py-1"
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
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
      >
        Color Grade
      </label>
      <select
        class="w-full font-light text-sm px-2 py-1"
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
  {#each filteredRoutes as route}
    <div class="flex w-full sm:rounded-xl px-4 py-2">
      <div class="flex flex-col items-start justify-center w-2/3 text-sm">
        <div class="capitalize">Name: {route.name}</div>
        <div class="capitalize">Route Type: {route.routeType}</div>
        <div class="capitalize">Grip Type: {route.gripType}</div>
        <div class="capitalize">
          Color Grade: {route.colorGrade}
        </div>
        <div class="capitalize">Difficulty: {route.difficulty}</div>
      </div>
      <div class="flex flex-col items-center justify-center w-1/3">
        <div
          class="flex flex-row overflow-y-visible space-x-4 items-center justify-center w-2/3 h-3/4 text-3xl text-white {getColor(
            route.colorGrade
          )}"
        >
          <Fa icon={faPersonFalling} />
        </div>
      </div>
    </div>
  {/each}
</div>
