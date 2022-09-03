import {
  Component,
  OnInit,
  Inject,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { tap } from 'rxjs/operators';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { TodoService } from 'src/app/services/todo.service';
import { FormBuilder, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { ClickDirective } from 'angular-calendar/modules/common/click.directive';
import { Observable } from 'rxjs';
import { MatAccordion } from '@angular/material/expansion';

import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ThirdPartyDraggable } from '@fullcalendar/interaction';

export interface DialogData {
  name: string;
  list: [any, any, any];
  title: string;
  btnTitle: string;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  animations: [
    trigger('smoothCollapse', [
      state(
        'initial',
        style({
          height: '0',
          overflow: 'hidden',
          opacity: '0',
        })
      ),
      state(
        'final',
        style({
          overflow: 'hidden',
          opacity: '1',
        })
      ),
      transition('initial=>final', animate('300ms')),
      transition('final=>initial', animate('300ms')),
    ]),
  ],
})
export class ListComponent implements OnInit {
  // @ViewChild(MatAccordion) accordion: MatAccordion;
  step = 0;

  panelOpenState = true;
  public testid = 'check1a';
  public isCollapsed = false;
  public isCollapsed2 = false;
  public isCollapsed3 = false;
  public foodCount = 0;
  public dailyCount = 0;
  public otherCount = 0;

  todoList: any;
  todoList2: any;
  todoList3: any;
  todo1: any;
  todo2: any;
  //todo3: any;
  //
  name: string;
  list2 = [false, false, 'checked'];
  form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(10)]],
  });

  deleting = false;
  editing = true;

  //
  todooo = [
    'Get to work',
    'Pick up groceries',
    'Go home',
    'Fall asleep'
  ];

  done = [
    'Get up',
    'Brush teeth',
    'Take a shower',
    'Check e-mail',
    'Walk dog'
  ];


  constructor(
    private todo: TodoService,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const todo1 = this.todo.getTodos();
    // this.todoList = this.todo.getTodos();
    // console.log("todolist:" + this.todoList)
    // let count = 0;
    //   this.todoList.forEach((element) => {
    //     if (element.selected == false) {
    //       count++;
    //     }
    //   });
    //   this.foodCount = count;

    todo1.subscribe((data) => {

      let count = 0;
      this.todoList = data[0].list;
      
       //console.log('list:' + JSON.stringify( data[4].list));

      this.todoList.forEach((element: any) => {
        
        //this.todoList = element;
        if (element.selected == false) {
          count++;
        }
      });
      this.foodCount = count;
    })

    // this.todoList2 = this.todo.getTodos2().pipe(tap());
    // this.todoList3 = this.todo.getTodos3().pipe(tap());
    const todo2 = this.todo.getTodos2();
    todo2.subscribe((data) => {
      this.todoList2 = data[0].list

      let count = 0;
      this.todoList2.forEach((element) => {
        if (element.selected == false) {
          count++;
        }
      });
      this.dailyCount = count;
    })

    // const todo3 = this.todo.getTodos3();
    // todo3.subscribe((data) => {
    //   this.todoList3 = data;

    //   let count3 = 0;
    //   this.todoList3.forEach((element) => {
    //     if (element.selected == false) {
    //       count3++;
    //     }
    //   });
    //   this.otherCount = count3;
    // })
  }

  // ngAfterViewInit(): void {}

  check(item, type, i) {
    if (type == 'food') {
      const params = {
        list: this.todoList
      }
      this.todo.putTodo(params);
    } else if (type == 'daily') {
      const params = {
        list: this.todoList2
      }
      this.todo.putTodo2(params);
    } 
    // else if (type == 'other') {
    //   const params = {
    //     list: this.todoList3
    //   }
    //   this.todo.putTodo3(params);
    // }
  }

  click(item: any, num: number, i: number) {
    if (num == 0) {
      this.todoList
      item.checked = ['checked', false, false];
    } else if (num == 1) {
      item.checked = [false, 'checked', false];
    } else if (num == 2) {
      item.checked = [false, false, 'checked'];
    }
    if (item.type == 'food') {
      this.todoList[i].checked 
      const params = {
        list: this.todoList
      }
      this.todo.putTodo(params);
    } else if (item.type == 'daily') {
      const params = {
        list: this.todoList2
      }
      this.todo.putTodo2(params);
    } 
    // else if (item.type == 'other') {
    //   const params = {
    //     list: this.todoList3
    //   }
    //   this.todo.putTodo3(params);
    // }
  }

  createTodo(type: string) {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '250px',
      data: { name: this.name, list: this.list2, title: 'リスト追加', btnTitle: '登録'  },
    });

    let now = new Date();

    if (type == 'food') {
      dialogRef.afterClosed().subscribe((result) => {
        console.log('ress:' + JSON.stringify(result));
        this.todo.createTodo(result.name, result.list, now, type);
        this.form.reset();
        this.form.controls.name.setErrors({ required: null });
      });
    } else if (type == 'daily') {
      dialogRef.afterClosed().subscribe((result) => {
        this.todo.createTodo2(result.name, result.list, now, type);
        this.form.reset();
        this.form.controls.name.setErrors({ required: null });
      });
    } 
    // else if (type == 'other') {
    //   dialogRef.afterClosed().subscribe((result) => {
    //     this.todo.createTodo3(result.name, result.list, now, type);
    //     this.form.reset();
    //     this.form.controls.name.setErrors({ required: null });
    //   });
    // }
  }

  deleteItem(item) {
    if (item.type == 'food') {
      this.todo.deleteTodo(item);
    } else if (item.type == 'daily') {
      this.todo.deleteTodo2(item);
    } 
    // else if (item.type == 'other') {
    //   this.todo.deleteTodo3(item);
    // }
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  editTodo(item: any, i: number) {

    console.log("index:" + JSON.stringify(this.todoList))
    this.todoList[i] = item

    const dialogRef = this.dialog.open(ModalComponent, {
      width: '250px',
      data: { name: item.title, list: item.checked, title: 'リスト編集', btnTitle: '更新' },
    });

    dialogRef.afterClosed().subscribe((result) => {
          item.checked = result.list
          item.title = result.name

          if (item.type == 'food') {
            const params = {
              list: this.todoList
            }
            this.todo.putTodo(params);
          } else if (item.type == 'daily') {
            const params = {
              list: this.todoList2
            }
            this.todo.putTodo2(params);
          } 
          // else if (item.type == 'other') {
          //   const params = {
          //     list: this.todoList3
          //   }
          //   this.todo.putTodo3(params);
          // }
          this.form.reset();
          this.form.controls.name.setErrors({ required: null });
        });
  }

  onSwipe(event, item) {
    const x =
      Math.abs(event.deltaX) > 40 ? (event.deltaX > 0 ? 'Right' : 'Left') : '';


    if (x == 'Right' || 'Left') {
      console.log('right' + JSON.stringify(item));
      this.editing = !this.editing;
      this.deleting = !this.deleting;
      // this.editTodo(item)
    }   
  }

   drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      //this.todoList =  event.container.data;
      const params = {
        list: event.container.data
      }
      const data: any = event.container.data
      if(data[0].type == 'food') {
        this.todo.putTodo(params);
      } else if(data[0].type == 'daily') {
        this.todo.putTodo2(params);
      } 
      // else {
      //   this.todo.putTodo3(params);
      // }
      
    } else {
      console.log('transfer')
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }
}
