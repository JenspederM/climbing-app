<script lang="ts">
  import { sessionStore } from "../stores";
  import { slide } from "svelte/transition";
  import type { Session } from "../Firebase";

  let userSession: Session;

  sessionStore.subscribe((value) => {
    userSession = value;
  });

  let showCurrentSession = false;

  const toggleShowCurrentSession = () => {
    showCurrentSession = !showCurrentSession;
  };

  $: numberOfRoutes = userSession.routes.length;
  $: totalDifficulty = Math.round(
    userSession.routes.reduce(
      (acc, route) => acc + Number(route.difficulty),
      0
    ) / numberOfRoutes
  );
</script>

<div class="bg-white w-full sm:w-2/3">
  {#if showCurrentSession}
    <div transition:slide>
      {#if userSession}
        <div class="flex flex-col items-center justify-center h-full">
          <div class="flex flex-col items-center justify-center">
            <h1 class="text-2xl font-bold">Current Session</h1>
            <p class="text-sm text-gray-500">Session started at</p>
            <p class="text-sm text-gray-500">
              {userSession.startedAt.toLocaleString()}
            </p>
          </div>
          <div class="flex flex-col items-center justify-center">
            <h1 class="text-2xl font-bold">Routes</h1>
            <p class="text-sm text-gray-500">
              Number of routes: {numberOfRoutes}
            </p>
            <p class="text-sm text-gray-500">
              Average difficulty: {totalDifficulty}
            </p>
          </div>
        </div>
      {:else}
        <div class="flex flex-col items-center justify-center h-full">
          <h1 class="text-2xl font-bold">No current session</h1>
        </div>
      {/if}
    </div>
  {/if}
</div>

<button
  class="flex w-full sm:w-2/3 py-2 rounded-lg mb-2 items-center justify-center bg-yellow-100"
  on:click={toggleShowCurrentSession}
>
  Current Session
</button>
