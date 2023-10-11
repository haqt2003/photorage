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
        class="flex justify-between items-center flex-wrap mt-8 cursor-pointer"
      >
        <div
          v-for="file in listFile"
          :key="file"
          class="img bg-cover bg-no-repeat bg-center"
          :style="`background-image: url('${file}');`"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useGetFile } from "@/composables/useGetFile";
import { auth } from "@/configs/firebase";
import { signOut } from "firebase/auth";
import { storage, ref as prjRef, getDownloadURL } from "@/configs/firebase";
export default {
  setup() {
    const isLogout = ref(false);
    const router = useRouter();
    const { getFile, error } = useGetFile("album");
    const listFile = reactive([]);

    function onBack() {
      router.push({ name: "UploadView", params: {} });
    }

    function onLogout() {
      isLogout.value = !isLogout.value;
    }

    function logOut() {
      signOut(auth)
        .then(() => {
          router.push({ name: "SignIn", params: {} });
        })
        .catch(() => {
          console.log("fail");
        });
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
      error,
      listFile,
      isLogout,
    };
  },
};
</script>

<style lang="css" scoped>
.img {
  width: 47.7%;
  aspect-ratio: 1 / 1;
  margin-top: 4.6%;
}

@media screen and (min-width: 600px) {
  .img {
    width: 32%;
    aspect-ratio: 1 / 1;
    margin-top: 2%;
  }
}
</style>
