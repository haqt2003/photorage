import { ref } from "vue";
import {
  storage,
  ref as prjRef,
  uploadBytes,
  getDownloadURL,
} from "@/configs/firebase";
import { useUser } from "@/composables/useUser";

const { getUser } = useUser();
const { user } = getUser();
