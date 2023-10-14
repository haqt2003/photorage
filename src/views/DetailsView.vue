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
        class="bg-cover bg-no-repeat bg-center text-center mt-12 overflow-hidden"
      >
        <img :src="$route.query.url" alt="" class="block mx-auto min-w-full" />
      </div>
      <div class="container mx-auto mt-10 flex items-center justify-center">
        <img
          @click="onShare"
          src="../assets/images/svg/share.svg"
          alt=""
          class="cursor-pointer"
        />
        <img
          @click="onDownload"
          src="../assets/images/svg/download.svg"
          alt=""
          class="ml-16 cursor-pointer"
        />
        <img
          @click="onDelete"
          src="../assets/images/svg/delete.svg"
          alt=""
          class="ml-16 cursor-pointer"
        />
      </div>
      <span
        @click="goToUpload"
        class="block font-semibold mt-16 text-center cursor-pointer"
        >Upload new photo</span
      >
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useSignOut } from "@/composables/useSignOut";
import { useDelete } from "@/composables/useDelete";
export default {
  setup() {
    const isLogout = ref(false);
    const router = useRouter();
    const route = useRoute();
    const { deleteImage } = useDelete();
    const { signout } = useSignOut();

    function onBack() {
      router.push({ name: "StorageView", params: {} });
    }

    function onLogout() {
      isLogout.value = !isLogout.value;
    }

    async function logOut() {
      await signout();
      router.push({ name: "SignIn", params: {} });
    }

    function goToUpload() {
      router.push({ name: "UploadView", params: {} });
    }

    function onShare() {
      let urlTmp = document.createElement("textarea");
      urlTmp = route.query.url;
      try {
        navigator.clipboard
          .writeText(urlTmp)
          .then(function () {
            alert("URL đã được sao chép");
          })
          .catch(function (error) {
            console.error("Lỗi khi sao chép: " + error);
          });
      } catch (err) {
        console.log(err);
      }
    }

    function onDownload() {
      const hiddenLink = document.createElement("a");
      hiddenLink.href = route.query.url;
      hiddenLink.download = `${route.params.id}.jpg`; // Tên tệp khi tải về
      document.body.appendChild(hiddenLink);
      hiddenLink.click();
      document.body.removeChild(hiddenLink);
    }

    async function onDelete() {
      await deleteImage(route.query.url);
      router.push({ name: "StorageView", params: {} });
    }

    return {
      isLogout,
      onBack,
      onLogout,
      logOut,
      goToUpload,
      onShare,
      onDownload,
      onDelete,
    };
  },
};
</script>
