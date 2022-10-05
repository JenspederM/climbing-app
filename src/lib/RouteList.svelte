<script lang="ts">
  import type { Route } from "../Firebase";
  import { routeStore } from "../stores";

  let userRoutes: Array<Route> = [];

  routeStore.subscribe((value) => {
    userRoutes = value;
  });
</script>

<div class="flex flex-col space-y-2 justify-center items-center">
  {#each userRoutes as route}
    <div
      class="flex-col w-full sm:w-1/3 sm:rounded-xl px-4 py-2 {route.colorGrade !=
      ''
        ? `bg-${route.colorGrade.toLowerCase().trim()}-200`
        : `bg-yellow-200`}"
    >
      <div class="capitalize">Name: {route.name}</div>
      <div class="capitalize">Type: {route.type}</div>
      <div class="capitalize">Color Grade: {route.colorGrade}</div>
      <div class="capitalize">Difficulty: {route.difficulty}</div>
    </div>
  {/each}
</div>
