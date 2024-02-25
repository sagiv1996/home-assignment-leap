<template lang="pug">
UCard 
    UForm(:state="state" :schema="schema" @submit="onSubmit")
        UFormGroup(label="Email", name="email" required)
            UInput(v-model="state.email")
        UFormGroup(label="First Name", name="firstName" required)
            UInput(v-model="state.firstName")
        UFormGroup(label="last Name", name="lastName" required)
            UInput(v-model="state.lastName")
        UButton(type="submit" :loading="isLoading") Update user
</template>
<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";
const props = defineProps<{ user: UserInterface }>();
const { user } = props;
const emit = defineEmits(["submit"]);
const isLoading = ref<boolean>(false);
const schema = z.object({
  email: z.string().email("Invalid email"),
  firstName: z.string().min(3, "Must be at least 3 characters"),
  lastName: z.string().min(3, "Must be at least 3 characters"),
});
type Schema = z.output<typeof schema>;

const { $api } = useNuxtApp();
const userRepo = userAPI($api);
const state = reactive({
  email: user.email,
  firstName: user.firstName,
  lastName: user.lastName,
});

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  isLoading.value = true;
  try {
    const res = await userRepo.updateUserById(user._id, state);
    emit("submit", res);
  } catch (e) {
    console.log("error into updateUser");
  } finally {
    isLoading.value = false;
  }
};
</script>
