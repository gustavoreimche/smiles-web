import { Component, inject } from '@angular/core';
import { PostService } from './services/post/post.service';
import { Storage, getDownloadURL } from '@angular/fire/storage';
import { IPost } from './models/post.model';
import { ref, uploadBytesResumable } from '@angular/fire/storage';
import { ImagesService } from './services/images/images.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'smiles-web';

  constructor(
    private postService: PostService,
    private imageService: ImagesService
  ) {}

  ngOnInit() {}

  storage: Storage = inject(Storage);

  uploadFile(input: HTMLInputElement) {
    this.imageService.uploadFile(input).then((url) => {
      console.log(url);
    });
  }

  downloadFile(fileName: string): Promise<string> {
    const storageRef = ref(this.storage, fileName);
    return getDownloadURL(storageRef);
  }
}
