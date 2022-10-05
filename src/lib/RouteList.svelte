<script lang="ts">
  import type { Route } from "../Firebase";
  import { routeStore } from "../stores";
  import Fa from "svelte-fa/src/fa.svelte";
  import {
    faPersonThroughWindow,
    faPersonFalling,
  } from "@fortawesome/free-solid-svg-icons";
  let userRoutes: Array<Route> = [];

  const colorMap = {
    red: "bg-red-400",
    orange: "bg-orange-400",
    yellow: "bg-yellow-400",
    green: "bg-green-400",
    blue: "bg-blue-400",
    purple: "bg-purple-400",
    pink: "bg-pink-400",
  };

  routeStore.subscribe((value) => {
    userRoutes = value;
  });

  const getColor = (color: string) => {
    const lowerColor = color.toLowerCase();
    if (lowerColor in colorMap) {
      return colorMap[lowerColor];
    } else {
      return colorMap["white"];
    }
  };
</script>

<div class="flex flex-col space-y-2 justify-center items-center">
  {#each userRoutes as route}
    <div class="flex w-full sm:rounded-xl px-4 py-2">
      <div class="flex flex-col items-start justify-center w-2/3 text-sm">
        <div class="capitalize">Name: {route.name}</div>
        <div class="capitalize">Type: {route.type}</div>
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
