<template>
  <div class="px-5 mt-14 mb-10">
    <div class="container mx-auto">
      <div class="flex w-full justify-end">
        <img
          @click="onLogout"
          v-if="!isLogout"
          src="../assets/images/svg/user.svg"
          alt=""
          class="cursor-pointer"
        />
        <img
          @click="onLogout"
          v-if="isLogout"
          class="rotate-180 mr-2 cursor-pointer"
          src="../assets/images/svg/previous.svg"
          alt=""
        />
        <span v-if="isLogout" @click="logOut" class="cursor-pointer"
          >Log out</span
        >
      </div>
      <div class="w-[184px] h-[29px] mx-auto mt-20">
        <img src="../assets/images/svg/logo-01.svg" alt="" />
      </div>
      <label for="file" class="text-center">
        <div
          class="w-[171px] h-[171px] bg-[#FFF2D8] mx-auto mt-20 relative cursor-pointer"
        >
          <img
            src="../assets/images/svg/add.svg"
            alt=""
            class="absolute top-1/4 left-1/4 -translate-x-[3px]"
          />
        </div>
        <input id="file" @change="onChangeFile" type="file" class="hidden" />
        <span v-if="isPending === null" class="block mt-3"
          >Upload your photo</span
        >
        <span v-if="isPending" class="block mt-3">Uploading...</span>
        <span v-if="isPending === false" class="block mt-3">Success!</span>
      </label>
      <span class="block font-semibold mt-20 text-center py-2"
        ><router-link :to="{ name: 'StorageView', params: {} }"
          >View album</router-link
        ></span
      >
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { auth } from "@/configs/firebase";
import { signOut } from "firebase/auth";
import { useStorage } from "@/composables/useStorage";
export default {
  setup() {
    const isLogout = ref(false);
    const router = useRouter();
    const file = ref(null);
    const { uploadFile, error, isPending } = useStorage("album");

    function onLogout() {
      isLogout.value = !isLogout.value;
    }

    function logOut() {
      signOut(auth)
        .then(() => {
          router.push({ name: "SignIn", params: {} });
          console.log("success");
        })
        .catch(() => {
          console.log("fail");
        });
    }

    async function onChangeFile(e) {
      const selected = e.target.files[0];
      if (selected) {
        file.value = selected;
      } else {
        file.value = null;
      }
      if (file.value) {
        await uploadFile(file.value);
      }
    }

    return {
      isLogout,
      error,
      isPending,
      onLogout,
      logOut,
      onChangeFile,
    };
  },
};
</script>
