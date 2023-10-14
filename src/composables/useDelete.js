import { ref } from "vue";
import { ref as prjRef, storage } from "@/configs/firebase";
import { deleteObject } from "firebase/storage";

const error = ref(null);

async function deleteImage(url) {
  const fileRef = prjRef(storage, url);
  try {
    const response = await deleteObject(fileRef);
    return response;
  } catch (err) {
    error.value = err;
  }
}

export function useDelete() {
  return { deleteImage, error };
}
