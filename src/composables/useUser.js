import { ref } from "vue";
import { auth } from "@/configs/firebase";

const user = ref(auth.currentUser);

auth.onAuthStateChanged((_user) => {
  if (_user) user.value = _user;
});

function getUser() {
  return { user };
}

export function useUser() {
  return { getUser };
}
