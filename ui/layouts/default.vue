<template lang="pug">
main
    UContainer.mt-14
        UCard.mb-5 Full Stack Developer Home Assignment {{ isLight }}
            template(v-slot:header)
                div.flex.justify-between
                    UBreadcrumb( :links="links")
                    ULink(@click="handleSignOut" to="/" v-if="accessToken") Sign out
        NuxtPage
        UCard.mt-5
            UToggle( v-model="isLight" off-icon="i-heroicons-moon" on-icon="i-heroicons-sun")
    UNotifications
</template>
<script setup lang="ts">
const route = useRoute();
const colorMode = useColorMode();
const accessToken = useCookie("access_token");
const isLight = computed({
  get() {
    return colorMode.value === "light";
  },
  set() {
    colorMode.preference = colorMode.value === "light" ? "dark" : "light";
  },
});

const loginPage = { label: "Login Page", icon: "i-heroicons-home", to: "/" };
const usersPage = {
  label: "List Of Users",
  icon: "i-heroicons-square-3-stack-3d",
  to: "/user",
};
const userIdPage = { label: "specific User", icon: "i-heroicons-link" };
const links = computed(() => {
  switch (route.name) {
    case "index":
      return [loginPage];
    case "user":
      return [loginPage, usersPage];
    case "user-id":
      return [loginPage, usersPage, userIdPage];
  }
});

const handleSignOut = () => {
  accessToken.value = null;
};
</script>
