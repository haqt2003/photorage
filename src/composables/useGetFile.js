import { ref } from "vue";
import { useUser } from "@/composables/useUser";
import { storage, ref as prjRef, listAll } from "@/configs/firebase";

const { getUser } = useUser();
const { user } = getUser();

const useGetFile = (name) => {
  const error = ref(null);
  const filePath = ref(null);
  async function getFile() {
    filePath.value = `${name}/${user.value.email}`;
    const listRef = prjRef(storage, filePath.value);
    try {
      const response = await listAll(listRef);
      const files = response.items;
      return files;
    } catch (err) {
      error.value = err.message;
    }
  }
  return { getFile, error };
};

export { useGetFile };
