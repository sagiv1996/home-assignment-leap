<template lang="pug">
UCard
    UForm(:state="state" :schema="schema" @submit="onSubmit")
        UFormGroup(label="Email", name="email" required help="hint: email@gmail.com")
            UInput(v-model="state.email")
        UFormGroup(label="Password", name="password" required help="hint: this-is-my-password" )
            UInput(v-model="state.password" :type="isShowChars? 'text': 'password'" :ui="{ icon: { trailing: { pointer: '' } } }")
                template(v-slot:trailing)
                    UButton(@click="isShowChars=!isShowChars" :icon="isShowChars? 'i-heroicons-eye-slash':'i-heroicons-eye'" :padded="false"  color="gray" variant="link" )
        UButton.mt-3(type="submit" ) Login
</template>

<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";
const toast = useToast();
const router = useRouter();
const isShowChars = ref<boolean>(false);
const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(4, "Must be at least 4 characters"),
});
type Schema = z.output<typeof schema>;
useHead({ title: "Login page" });

const state = reactive<{
  email?: string;
  password?: string;
}>({
  email: undefined,
  password: undefined,
});

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  const { status, data } = await authFetch("/login", {
    body: {
      email: state.email,
      password: state.password,
    },
  });
  if (status.value === "error") {
    toast.add({
      title: "ERROR!",
      description: "Check the email and password and try again",
      color: "red",
    });
    return;
  }

  toast.add({ title: "You've logged in successfully" });
  router.push("/user");
};
</script>
