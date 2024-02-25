<template lang="pug">
error-card(v-if="error")
user-card(v-else-if="!error" :user="user")
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});
const { params } = useRoute();
const userId: string = params.id.toString();

const { $api } = useNuxtApp();
const userRepo = userAPI($api);
const { data: user, error } = await useAsyncData(`user/${userId}`, () =>
  userRepo.getUserById(userId)
);
</script>
