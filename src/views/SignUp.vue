<template>
  <div class="px-5 mt-[80px] mb-5">
    <div class="container mx-auto">
      <div class="w-[184px] h-[29px] mx-auto">
        <img src="../assets/images/svg/logo-01.svg" alt="" />
      </div>
      <form @submit.prevent="onSignUp" class="mt-12">
        <div class="">
          <span class="font-normal block">Email</span>
          <input
            v-model="email"
            type="email"
            class="mt-4 py-4 pl-6 bg-[#F0F0F0] w-full placehoder outline-none"
            placeholder="example@gmail.com"
          />
        </div>
        <div class="mt-7 relative">
          <span class="font-normal block">Password</span>
          <input
            v-model="password"
            id="password"
            type="password"
            class="mt-4 py-4 pl-6 bg-[#F0F0F0] w-full placehoder outline-none"
            placeholder="••••••"
          />
          <img
            v-if="!isShowPassword"
            src="../assets/images/svg/hide-password.svg"
            alt=""
            class="absolute top-[61px] right-5 cursor-pointer"
            @click.self="togglePassword"
          />
          <img
            v-if="isShowPassword"
            src="../assets/images/svg/show-password.svg"
            alt=""
            class="absolute top-[61px] right-5 cursor-pointer"
            @click.self="togglePassword"
          />
        </div>
        <div class="mt-7 relative">
          <span class="font-normal block">Confirm password</span>
          <input
            v-model="confirmPassword"
            type="password"
            class="mt-4 py-4 pl-6 bg-[#F0F0F0] w-full placehoder outline-none"
            placeholder="••••••"
          />
        </div>
        <button
          class="mt-8 font-semibold bg-[#FFF2D8] w-full py-4 hover:bg-[#FFECC7]"
          type="submit"
        >
          Sign up
        </button>
        <div class="mt-5 text-center">
          <span class=""
            >I'm already a member.
            <span class="text-[#BCA37F]"
              ><router-link :to="{ name: 'SignIn', params: {} }"
                >Sign in</router-link
              ></span
            ></span
          >
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useSignUp } from "@/composables/useSignUp";
export default {
  setup() {
    const router = useRouter();
    const email = ref(null);
    const password = ref(null);
    const confirmPassword = ref(null);
    const isShowPassword = ref(false);
    const { error, isPending, signup } = useSignUp();

    function togglePassword() {
      this.isShowPassword = !this.isShowPassword;
      const passwordInput = document.querySelector("#password");
      if (passwordInput.type === "password") {
        passwordInput.type = "text";
      } else {
        passwordInput.type = "password";
      }
    }

    const onSignUp = async () => {
      if (confirmPassword.value === password.value) {
        await signup(email.value, password.value);
        if (!error.value) router.push({ name: "UploadView", params: {} });
      }
    };

    return {
      email,
      password,
      confirmPassword,
      isShowPassword,
      error,
      isPending,
      togglePassword,
      onSignUp,
    };
  },
};
</script>
