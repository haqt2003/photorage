<template>
  <div class="px-5 my-16">
    <div class="container mx-auto">
      <div class="flex items-center relative">
        <img
          src="../assets/images/svg/previous.svg"
          alt=""
          @click="onBack"
          class="cursor-pointer"
        />
        <div class="w-[184px] h-[29px] absolute left-1/2 -translate-x-1/2">
          <img src="../assets/images/svg/logo-01.svg" alt="" />
        </div>
        <div class="absolute right-0">
          <img
            class="cursor-pointer"
            src="../assets/images/svg/user.svg"
            alt=""
            @click="onLogout"
            v-if="!isLogout"
          />
          <div class="w-full flex items-center">
            <span v-if="isLogout" @click="logOut" class="cursor-pointer"
              >Log out</span
            >
          </div>
        </div>
      </div>
      <div
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-center flex-wrap mt-8 lg:mt-10 cursor-pointer"
      >
        <div
          @click.self="goToDetails"
          v-for="(file, index) in listFile"
          :key="index"
          class="img bg-cover bg-no-repeat bg-center"
          :style="`background-image: url('${file}');`"
          :data-url="file"
          :data-id="index"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useGetFile } from "@/composables/useGetFile";
import { useSignOut } from "@/composables/useSignOut";
import { storage, ref as prjRef, getDownloadURL } from "@/configs/firebase";
export default {
  setup() {
    const isLogout = ref(false);
    const router = useRouter();
    const { getFile, error } = useGetFile("album");
    const { signout } = useSignOut();
    const listFile = reactive([]);

    function onBack() {
      router.push({ name: "UploadView", params: {} });
    }

    function onLogout() {
      isLogout.value = !isLogout.value;
    }

    async function logOut() {
      localStorage.setItem("loggedIn", "false");
      await signout();
      router.push({ name: "SignIn", params: {} });
    }

    function goToDetails(e) {
      if (e.target) {
        router.push({
          name: "DetailsView",
          params: { id: e.target.dataset.id },
          query: { url: e.target.dataset.url },
        });
      }
    }

    async function getData() {
      const files = await getFile();
      if (files) {
        files.forEach(async (element) => {
          const res = await getDownloadURL(prjRef(storage, element.fullPath));
          if (res) listFile.push(res);
        });
      }
    }

    getData();

    return {
      getData,
      onBack,
      onLogout,
      logOut,
      goToDetails,
      error,
      listFile,
      isLogout,
    };
  },
};
</script>

<style lang="css" scoped>
.img {
  aspect-ratio: 1 / 1;
}
</style>
