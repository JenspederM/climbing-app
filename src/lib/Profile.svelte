<script lang="ts">
  import { userStore } from "../stores";

  let user;

  userStore.subscribe((value) => {
    user = value;
  });
</script>

<div class="flex items-center justify-end">
  <div class="flex flex-col w-8 sm:w-10">
    <img class="rounded-full" src={user.photoUrl} alt="profile" />
  </div>
</div>
