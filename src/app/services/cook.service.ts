import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Cook } from 'src/app/interfaces/cook';

@Injectable({
  providedIn: 'root'
})
export class CookService {

  constructor(private afs: AngularFirestore) { }

  createCook() {
    const id = this.afs.createId();
    const params: Cook = {
      id,
      do_n: false,
      do_m : true,
      taskCount_n: 0,
      taskCount_m: 0,
    };
    this.afs.collection<Cook>('cooks').doc(id).set(params);
  }

  putCook(params: Cook) {
    this.afs.collection<Cook>('cooks').doc(params.id).set(params);
  }

  getCook() {
    return this.afs.collection<Cook>('cooks').valueChanges();
  }

  deleteCook(id: string) {
    this.afs.collection<Cook>('cooks').doc(id).delete();
  }
}
