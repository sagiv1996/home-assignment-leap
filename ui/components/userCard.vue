<template lang="pug">
UCard()
    template(v-slot:header) User info
    Placeholder.flex
        UAvatar(:src="user.avatar" 
        size="xl" 
        :alt="`${user.firstName} ${user.lastName}`")
        div.flex-auto.p-6
            div {{user.firstName}} {{ user.lastName }}
            ULink(:to="`mailto:user.email`") {{ user.email }}
            div Created at {{  getTimeAgo(user.createdAt)}}
            div Update at {{  getTimeAgo(user.updatedAt)}}


    template(v-slot:footer)
        ULink(to="/user") Go back to list users
</template>

<script setup lang="ts">
const props = defineProps<{ user: UserInterface }>();
const { user } = props;

const getTimeAgo = (time: string): string => {
  return useTimeAgo(time).value;
};
</script>
