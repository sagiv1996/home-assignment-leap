<template lang="pug">
UCard
  template(v-slot:header) List Users
  error-card(v-if="error || users?.data === undefined")
  template(v-else-if="users?.data")
    UTable(:rows="users.data" :loading="pending" :columns="columns")
      template(v-slot:fullName-data="{ row }") {{ row.firstName }} {{ row.lastName }}
      template(v-slot:_id-data="{ row }")
        UTooltip(:text="row._id") {{ row._id.slice(0,3) }}...
      template(v-slot:updatedAt-data="{ row }") {{ getTimeAgo(row.updatedAt) }}
      template(v-slot:avatar-data="{ row }")
        UAvatar(:src="row.avatar" :alt="`${row.firstName} ${row.lastName}`")
      template(v-slot:actions-data="{ row }")
        UTooltip(text="Actions" :popper="{ placement: 'left' }")
          UDropdown(:items="items(row)")
            UButton(color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal")
  template(v-slot:footer)
    div.flex.justify-center
      UPagination.mx-10(v-model="page" :page-count="users?.perPage" :total="users?.totalUsers")
      UButton.mx-10(@click="changeModal({ isOpen: true, mode:'create' })") Create new one
  UModal(v-model="modal.isOpen")
    update-user(:user="modal.userToEdit" @submit="refreshAndCloseModal" v-if="modal.mode === 'edit'")
    create-user(@submit="refreshAndCloseModal" v-else-if="modal.mode==='create'")    
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});
const columns = [
  { label: "ID", key: "_id" },
  { label: "Updated At", key: "updatedAt" },
  { label: "Email", key: "email" },
  { label: "Full Name", key: "fullName" },
  { label: "avatar", key: "avatar" },
  { key: "actions" },
];
const page = ref<number>(1);
const router = useRouter();

const { $api } = useNuxtApp();
const userRepo = userAPI($api);
const {
  data: users,
  refresh,
  pending,
  error,
} = await useAsyncData(
  `allUsers`,
  () => userRepo.getUsers({ page: page.value }),
  { watch: [page] }
);

const modal = reactive<{
  isOpen: boolean;
  mode?: "edit" | "create";
  userToEdit?: UserInterface;
}>({
  isOpen: false,
  mode: undefined,
  userToEdit: undefined,
});

const handleDeleteRow = async (id: string) => {
  try {
    await userRepo.deleteUserById(id);
    refresh();
  } catch (error) {
    console.log("error into handleDeleteRow");
  }
};

const items = (row: UserInterface) => [
  [
    {
      label: "Open",
      icon: "i-heroicons-link",
      click: () => router.push(`/user/${row._id}`),
      shortcuts: ["O"],
    },
    {
      label: "Edit",
      icon: "i-heroicons-pencil-square-20-solid",
      click: () => changeModal({ isOpen: true, mode: "edit", userToEdit: row }),
      shortcuts: ["E"],
    },
  ],
  [
    {
      label: "Delete",
      icon: "i-heroicons-trash-20-solid",
      click: () => handleDeleteRow(row._id),
      shortcuts: ["D"],
    },
  ],
];

const refreshAndCloseModal = () => {
  refresh();
  changeModal({});
};

const changeModal = ({
  isOpen = false,
  mode = undefined,
  userToEdit = undefined,
}: {
  isOpen?: boolean;
  mode?: "edit" | "create";
  userToEdit?: UserInterface;
}) => {
  modal.mode = mode;
  modal.userToEdit = userToEdit;
  modal.isOpen = isOpen;
};

const getTimeAgo = (time: string): string => {
  return useTimeAgo(time).value;
};
</script>
