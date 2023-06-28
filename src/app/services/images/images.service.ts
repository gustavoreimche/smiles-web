import { Injectable, inject } from '@angular/core';
import {
  Storage,
  deleteObject,
  getDownloadURL,
  listAll,
  ref,
  uploadBytesResumable,
} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class ImagesService {
  constructor() {}
  storage: Storage = inject(Storage);

  uploadFile(input: HTMLInputElement): Promise<string | null> {
    if (!input.files) return Promise.resolve(null);

    const file: File | null = input.files[0];
    if (!file) return Promise.resolve(null);

    const storageRef = ref(this.storage, file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask
        .then(() => {
          getDownloadURL(storageRef)
            .then((url) => resolve(url))
            .catch((error) => reject(error));
        })
        .catch((error) => reject(error));
    });
  }

  downloadFile(fileName: string): Promise<string> {
    const storageRef = ref(this.storage, fileName);
    return getDownloadURL(storageRef);
  }

  deleteFile(fileName: string): Promise<void> {
    const storageRef = ref(this.storage, fileName);
    return deleteObject(storageRef);
  }

  getAll() {
    const storageRef = ref(this.storage);

    listAll(storageRef)
      .then((res) => {
        res.items.forEach((itemRef) => {
          console.log(itemRef.name);
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
}
