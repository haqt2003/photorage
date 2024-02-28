<template>
  <div class="px-5 mt-20">
    <div class="container mx-auto">
      <div class="w-[184px] h-[29px] mx-auto">
        <img src="../assets/images/svg/logo-01.svg" alt="" />
      </div>
      <form @submit.prevent="onSignIn" class="mt-16">
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
        <div class="mt-7 flex justify-between items-center">
          <div class="flex items-center">
            <input
              type="checkbox"
              v-model="isRemember"
              class="w-4 h-4 cursor-pointer checkItem"
            />
            <span class="ml-2">Remember me</span>
          </div>
          <div class="flex items-center">
            <span
              class="cursor-pointer"
              id="forgotPassword"
              @click="onResetPassword"
              >Forgot password?</span
            >
          </div>
        </div>
        <button
          class="mt-8 font-semibold bg-[#FFF2D8] w-full py-4 hover:bg-[#FFECC7]"
          type="submit"
        >
          Sign in
        </button>
        <div class="mt-5 text-center">
          <span class=""
            >I'm a new user.
            <span class="text-[#BCA37F]"
              ><router-link :to="{ name: 'SignUp', params: {} }"
                >Sign up</router-link
              ></span
            ></span
          >
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useSignIn } from "@/composables/useSignIn";
import { useResetPassword } from "@/composables/useResetPassword";
export default {
  setup() {
    const router = useRouter();
    const isShowPassword = ref(false);
    const email = ref(null);
    const password = ref(null);
    const { error, isPending, signin } = useSignIn();
    const { resetPassword } = useResetPassword();

    function togglePassword() {
      this.isShowPassword = !this.isShowPassword;
      const passwordInput = document.querySelector("#password");
      if (passwordInput.type === "password") {
        passwordInput.type = "text";
      } else {
        passwordInput.type = "password";
      }
    }

    const initInfo = () => {
      if (localStorage.getItem("email") && localStorage.getItem("password")) {
        email.value = localStorage.getItem("email");
        password.value = localStorage.getItem("password");
      }
    };

    const onResetPassword = async () => {
      await resetPassword(email.value);
      document.getElementById("forgotPassword").innerHTML = "Check your email!";
    };

    const onSignIn = async () => {
      await signin(email.value, password.value);
      if (!error.value) {
        localStorage.clear();
        const checkbox = document.querySelector(".checkItem");
        if (checkbox.checked) {
          localStorage.setItem("email", email.value);
          localStorage.setItem("password", password.value);
        }
        localStorage.setItem("loggedIn", "true");
        router.push({ name: "UploadView", params: {} });
      } else alert(error.value);
    };

    onMounted(() => {
      initInfo();
    });

    return {
      email,
      password,
      isShowPassword,
      error,
      isPending,
      togglePassword,
      onSignIn,
      onResetPassword,
    };
  },
};
</script>
