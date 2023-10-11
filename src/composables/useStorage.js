import { ref } from "vue";
import { storage, ref as prjRef, uploadBytes } from "@/configs/firebase";
import { useUser } from "@/composables/useUser";

const { getUser } = useUser();
const { user } = getUser();

const useStorage = (name) => {
  const error = ref(null);
  const filePath = ref(null);
  const isPending = ref(null);
  async function uploadFile(file) {
    isPending.value = true;
    filePath.value = `${name}/${user.value.email}/${file.name}`;
    const storageRef = prjRef(storage, filePath.value);
    try {
      await uploadBytes(storageRef, file);
    } catch (err) {
      error.value = err;
    } finally {
      isPending.value = false;
    }
  }
  return { error, isPending, uploadFile };
};

export { useStorage };
