import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Todo } from 'src/app/interfaces/todo';
import { tap } from 'rxjs/operators';
import firebase from 'firebase/app';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private afs: AngularFirestore) {}

  //food
  createTodo(title: string, checked: [], now: Date, type: string) {
    const id = this.afs.createId();
    const params = {
      title,
      id,
      selected: false,
      checked: checked,
      type: type,
      date: now,
    };

    // default
    // this.afs.collection<Todo>('todos').doc(id).set(params);

    // first register
    //this.afs.collection<any>('todos').doc('doc').set(docData);

    const todo = this.afs.collection<any>('todos').doc('doc');
    try {
      todo.update({
        list: firebase.firestore.FieldValue.arrayUnion(params),
      });
    } catch (error) {
      this.afs.collection<any>('todos').doc('doc').set(params);
    }

    //this.afs.collection<Todo>('todos').doc('test').set(params);
  }

  putTodo(params: any) {
    // this.afs.collection<any>('todos').doc(params.id).set(params);
    this.afs.collection<any>('todos').doc('doc').update(params);
  }

  getTodos() {
    // return this.afs.collection<Todo>('todos', ref => ref.orderBy('date', 'asc')).valueChanges();
    return this.afs.collection<Todo>('todos').valueChanges();
  }

  deleteTodo(item) {
    // this.afs.collection<Todo>('todos').doc(id).delete();
    const todo = this.afs.collection<any>('todos').doc('doc');
    todo.update({
      list: firebase.firestore.FieldValue.arrayRemove(item),
    });
  }

  //daily
  createTodo2(title: string, checked: [], now: Date, type: string) {
    const id = this.afs.createId();
    const params = {
      title,
      id,
      selected: false,
      checked: checked,
      type: type,
      date: now,
    };
    // 要修正
    //this.afs.collection<Todo>('todos2').doc(id).set(params);

    // first register
    //his.afs.collection<any>('todos2').doc('doc').set(params);

    try {
      const todo = this.afs.collection<any>('todos2').doc('doc');
      todo.update({
        list: firebase.firestore.FieldValue.arrayUnion(params),
      });
    } catch (error) {
      this.afs.collection<any>('todos2').doc('doc').set(params);
    }
  }

  putTodo2(params: any) {
    // this.afs.collection<Todo>('todos2').doc(params.id).set(params);
    this.afs.collection<any>('todos2').doc('doc').update(params);
  }

  getTodos2() {
    // return this.afs.collection<Todo>('todos2', ref => ref.orderBy('date', 'asc')).valueChanges();
    return this.afs.collection<any>('todos2').valueChanges();
  }

  deleteTodo2(item) {
    // this.afs.collection<Todo>('todos2').doc(id).delete();
    const todo = this.afs.collection<any>('todos2').doc('doc');
    todo.update({
      list: firebase.firestore.FieldValue.arrayRemove(item),
    });
  }

  //other
  createTodo3(title: string, checked: [], now: Date, type: string) {
    const id = this.afs.createId();
    const params = {
      title,
      id,
      selected: false,
      checked: checked,
      type: type,
      date: now,
    };
    // 要修正
    //this.afs.collection<Todo>('todos3').doc(id).set(params);
    // first register
    //this.afs.collection<any>('todos3').doc('doc').set(params);
    try {
      const todo = this.afs.collection<any>('todos3').doc('doc');
    todo.update({
      list: firebase.firestore.FieldValue.arrayUnion(params),
    }); 
    } catch (error) {
      this.afs.collection<any>('todos3').doc('doc').set(params);
    } 
  }

  putTodo3(params: any) {
    // this.afs.collection<Todo>('todos3').doc(params.id).set(params);
    this.afs.collection<any>('todos3').doc('doc').update(params);
  }

  getTodos3() {
    // return this.afs.collection<Todo>('todos3', ref => ref.orderBy('date', 'asc')).valueChanges();
    return this.afs.collection<any>('todos3').valueChanges();
  }

  deleteTodo3(item) {
    // this.afs.collection<Todo>('todos3').doc(id).delete();
    const todo = this.afs.collection<any>('todos3').doc('doc');
    todo.update({
      list: firebase.firestore.FieldValue.arrayRemove(item),
    });
  }
}
