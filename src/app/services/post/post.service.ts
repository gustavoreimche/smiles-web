import { Injectable } from '@angular/core';
import {
  DocumentData,
  DocumentReference,
  Firestore,
  QuerySnapshot,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { IPost } from 'src/app/models/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private firestore: Firestore) {}

  collectionPath = 'posts';
  collectionRef = collection(this.firestore, this.collectionPath);

  async create(post: IPost): Promise<DocumentReference<DocumentData>> {
    return addDoc(this.collectionRef, post);
  }

  async getAll() {
    return getDocs(this.collectionRef).then((querySnapshot) => {
      const posts: IPost[] = [];
      querySnapshot.forEach((doc) => {
        const post: IPost = {
          id: doc.id,
          ...(doc.data() as IPost),
        };
        posts.push(post);
      });
      return posts;
    });
  }

  async getById(id: string): Promise<IPost | null> {
    const docRef: DocumentReference<DocumentData> = doc(
      this.firestore,
      `${this.collectionPath}/${id}`
    );

    return getDoc(docRef).then((docSnapshot) => {
      if (docSnapshot.exists()) {
        const post: IPost = {
          id: docSnapshot.id,
          ...(docSnapshot.data() as IPost),
        };
        return post;
      } else {
        return null;
      }
    });
  }

  async getByTitle(title: string): Promise<IPost[] | null> {
    const queryRef = query(this.collectionRef, where('title', '==', title));

    return getDocs(queryRef).then(
      (querySnapshot: QuerySnapshot<DocumentData>) => {
        const posts: IPost[] = [];
        querySnapshot.forEach((doc) => {
          const post: IPost = {
            id: doc.id,
            ...(doc.data() as IPost),
          };
          posts.push(post);
        });
        return posts;
      }
    );
  }

  async update(post: IPost): Promise<void> {
    const postRef: DocumentReference<DocumentData> = doc(
      this.firestore,
      `${this.collectionPath}/${post.id}`
    );

    const { id, ...postData } = post;
    const postSnapshot = await getDoc(postRef);

    if (postSnapshot.exists()) {
      return updateDoc(postRef, postData);
    } else {
      throw new Error('Post não encontrado');
    }
  }

  async delete(id: string): Promise<void> {
    const postRef: DocumentReference<DocumentData> = doc(
      this.firestore,
      `${this.collectionPath}/${id}`
    );

    const postSnapshot = await getDoc(postRef);

    if (postSnapshot.exists()) {
      return deleteDoc(postRef);
    } else {
      throw new Error('Post não encontrado');
    }
  }
}
