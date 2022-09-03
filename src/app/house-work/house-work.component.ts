import { newArray } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { TaskService } from 'src/app/services/task.service';
import { CookService } from 'src/app/services/cook.service';
import { tap } from 'rxjs/operators';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ModalTaskComponent } from '../modal/modal-task.component';
import { element } from 'protractor';

export interface DialogData {
  name: string;
  // list: [any, any];
  dates: string;
  work: string;
  dayArray: any[];
}

@Component({
  selector: 'app-house-work',
  templateUrl: './house-work.component.html',
  styleUrls: ['./house-work.component.css'],
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
export class HouseWorkComponent implements OnInit {
  weeks = ['日', '月', '火', '水', '木', '金', '土'];
  week_per = [];
  date = new Date();
  year = this.date.getFullYear();
  month = this.date.getMonth() + 1;
  today = this.date.getDate();
  weekday = this.date.getDay();
  startDate = new Date(this.year, this.month - 1, 1); // 月の最初の日を取得
  endDate = new Date(this.year, this.month, 0); // 月の最後の日を取得
  endDayCount = this.endDate.getDate(); // 月の末日
  lastMonthEndDate = new Date(this.year, this.month - 1, 0); // 前月の最後の日の情報
  lastMonthendDayCount = this.lastMonthEndDate.getDate(); // 前月の末日
  startDay = this.startDate.getDay(); // 月の最初の日の曜日を取得
  dayCount = 1; // 日にちのカウント
  firstWeekDate = 6 - this.startDay + 1;
  weekCount = Math.ceil((this.endDayCount - this.firstWeekDate) / 7) + 1;
  thisMonth = this.year + ('0' + (this.date.getMonth() + 1)).slice(-2);

  name: string;
  work: string;
  dates: string;
  dayArray: any[];
  eventArr = [];
  public isCollapsed = true;
  status: boolean;
  //taskArr = [];
  taskList: any;
  todaytaskList = [];
  list2 = [false, 'checked'];

  //
  todoList: any;

  constructor(private task: TaskService, public dialog: MatDialog, private cook: CookService) {}

  ngOnInit(): void {
    this.eventArr.length = 6;
    this.taskList = this.task.getTasks().pipe(tap());
    this.taskList.subscribe((data) => {
      let list = [];
      const thisDate =
        this.date.getFullYear() +
        ('0' + (this.date.getMonth() + 1)).slice(-2) +
        ('0' + this.date.getDate()).slice(-2);
      data.forEach((element) => {
        if (
          element.date == thisDate ||
          element.day.includes(this.weeks[this.weekday])
        ) {
          list.push(element);
        }
      });
      this.todaytaskList = list;
    });
    this.week_per.length = this.weekCount;
    this.eventArr = new Array(31);

    this.todoList = this.cook.getCook().pipe(tap());

    // this.cook.createCook();

    this.status = false;
  }

  dateClick(date) {
    const newArr = ['eve', 'nt', '1'];
    this.eventArr.splice(date, 1, newArr);
  }

  prevMonth() {
    if (this.month == 1) {
      this.month = 13;
      this.year -= 1;
    }
    this.month -= 1;
    this.makeCalender();
  }

  nextMonth() {
    if (this.month == 12) {
      this.month = 0;
      this.year += 1;
    }
    this.month += 1;
    this.makeCalender();
  }

  makeCalender() {
    this.startDate = new Date(this.year, this.month - 1, 1); // 月の最初の日を取得
    this.endDate = new Date(this.year, this.month, 0); // 月の最後の日を取得
    this.endDayCount = this.endDate.getDate(); // 月の末日
    this.lastMonthEndDate = new Date(this.year, this.month - 1, 0); // 前月の最後の日の情報
    this.lastMonthendDayCount = this.lastMonthEndDate.getDate(); // 前月の末日
    this.startDay = this.startDate.getDay(); // 月の最初の日の曜日を取得
    this.dayCount = 1; // 日にちのカウント
    this.firstWeekDate = 6 - this.startDay + 1;
    this.weekCount = Math.ceil((this.endDayCount - this.firstWeekDate) / 7) + 1;
    this.week_per.length = this.weekCount;
  }

  changeStatus(i) {
    this.todaytaskList[i].status = !this.todaytaskList[i].status;
    this.task.putTask(this.todaytaskList[i]);
  }

  clicked(date) {
    console.log('clicked:' + date);
  }

  createTask() {
    const dialogRef = this.dialog.open(ModalTaskComponent, {
      width: '280px',
      data: {
        name: this.name,
        work: this.work,
        date: this.dates,
        dayArray: this.dayArray,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.task.createTask(
        result.name,
        result.work,
        result.dates || 'dummy',
        result.dayArray || []
      );
    });
  }

  //
  //deleteItem(item) {
    //console.log("delete" + item)
    
      //this.task.deleteTask(item);
    // else if (item.type == 'other') {
    //   this.todo.deleteTodo3(item);
    // }
  //}

  //cook task
  doneTask(s, cook: any) {
    if (s == 'n') {
      if (cook.do_n == true) {
        cook.taskCount_n += 1;
        this.cook.putCook(cook);
      }
      if (cook.taskCount_m == 0) {
        cook.do_n = true;
        cook.do_m = false;
        this.cook.putCook(cook);
      } else {
        cook.taskCount_m -= 1;
        this.cook.putCook(cook);
      }
    } else {
      if (cook.do_m == true) {
        cook.taskCount_m += 1;
        this.cook.putCook(cook);
      }
      if (cook.taskCount_n == 0) {
        cook.do_n = false;
        cook.do_m = true;
      this.cook.putCook(cook);
      } else {
        cook.taskCount_n -= 1;
        this.cook.putCook(cook);
      }
    }
  }

  undeCount(s, cook:any) {
    if (s == 'n' && cook.taskCount_n > 0) {
      cook.taskCount_n -= 1;
      this.cook.putCook(cook);
    } else if(cook.taskCount_m > 0) {
      cook.taskCount_m -= 1;
      this.cook.putCook(cook);
    }
  }

}
