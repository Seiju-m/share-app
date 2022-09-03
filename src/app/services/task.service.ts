import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Task } from 'src/app/interfaces/task';
import firebase from 'firebase/app';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private afs: AngularFirestore) {}

  createTask(name: string, task: string, dates:string, dayArray:[]) {
    const id = this.afs.createId();
    const date = new Date();
    const nowDate = date.getFullYear()+("0"+ (date.getMonth() + 1)).slice(-2) + ("0" + date.getDate()).slice(-2)
    const params: Task = {
      id,
      name,
      task,
      status: false,
      date: dates,
      day: dayArray
    };
    this.afs.collection<Task>('tasks').doc(id).set(params);
  }

  putTask(params: Task) {
    this.afs.collection<Task>('tasks').doc(params.id).set(params);
  }

  getTasks() {
    return this.afs.collection<Task>('tasks').valueChanges();
  }

  deleteTask(item) {
    // this.afs.collection<Task>('tasks').doc(id).delete();
    const task = this.afs.collection<any>('tasks').doc('doc');
    task.update({
      list: firebase.firestore.FieldValue.arrayRemove(item),
    });
  }
}
