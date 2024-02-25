<template lang="pug">
UCard 
    UForm(:state="state" :schema="schema" @submit="onSubmit" validate-on="submit")
        UFormGroup(label="Email" name="email" required)
            UInput(v-model="state.email")
        UFormGroup(label="First Name", name="firstName" required)
            UInput(v-model="state.firstName")
        UFormGroup(label="last Name" name="lastName" required)
            UInput(v-model="state.lastName")
        UFormGroup(label="Link to Avatar" name="avatar")
            UInput(v-model="state.avatar")
        UButton(type="submit" :loading="isLoading") Create user
</template>
<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";
const emit = defineEmits(["submit"]);
const isLoading = ref<boolean>(false);

const state = reactive<{
  email?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
}>({
  email: undefined,
  firstName: undefined,
  lastName: undefined,
  avatar: undefined,
});

const schema = z.object({
  email: z.string().email("Invalid email"),
  firstName: z.string().min(3, "Must be at least 3 characters"),
  lastName: z.string().min(3, "Must be at least 3 characters"),
  avatar: z.string().url("Invalid url").optional(),
});
type Schema = z.output<typeof schema>;

const { $api } = useNuxtApp();
const userRepo = userAPI($api);

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  isLoading.value = true;
  try {
    const user = await userRepo.createUser({
      firstName: state.firstName!,
      lastName: state.lastName!,
      email: state.email!,
      avatar: state.avatar,
    });
    emit("submit", user);
  } catch (e) {
    console.log("error into createUser");
  } finally {
    isLoading.value = false;
  }
};
</script>
