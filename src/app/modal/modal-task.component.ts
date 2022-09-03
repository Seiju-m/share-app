import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { DialogData } from '../house-work/house-work.component';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { DateAdapter, NativeDateAdapter } from '@angular/material/core';

class MyDateAdapter extends NativeDateAdapter {
  getDateNames(): string[] {
    const dateNames: string[] = [];
    for (let i = 0; i < 31; i++) {
      dateNames[i] = String(i + 1);
    }
    return dateNames;
  }
}
// export interface DialogData {
//   name: string;
//   list:  [false,false,'checked'];
// }

@Component({
  selector: 'app-modal-task',
  templateUrl: './modal-task.component.html',
  styleUrls: ['./modal.component.css'],
  providers: [{ provide: DateAdapter, useClass: MyDateAdapter }],
})
export class ModalTaskComponent implements OnInit {
  date = new FormControl();
  byDateFlag = false;
  byDayFlag = false;
  dayInput : boolean;
  list: any[];
  sbook = '978-4-7741-9130-0';
  books = [
    { isbn: '978-4-8222-9894-4', title: '西村' },
    { isbn: '978-4-8222-5355-4', title: '森下' },
  ];
  form = this.fb.group({
    work: ['', [Validators.required, Validators.maxLength(15)]],
  });

  // dataにcheckboxの値とチェック状態の初期値：selectedを定義

checkdata2 = [
  { value: '月', selected: false}, // 初期値 true
  { value: '火', selected: false},
  { value: '水', selected: false},
  { value: '木', selected: false},
  { value: '金', selected: false},
  { value: '土', selected: false},
  { value: '日', selected: false},
]


  constructor(
    public dialogRef: MatDialogRef<ModalTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.list = [false, false, 'checked'];
    this.dayInput = false;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  click(newlis) {
    console.log('now data: + ' + JSON.stringify(this.data));
    setTimeout(() => {
      console.log('this.list:' + this.list);
    }, 5000);

    // this.data.list = ['a', 'b', 'c']
  }

  show(i: number) {
    console.log('ISBN：' + this.sbook);
    console.log('書名：' + this.books[i].title);
  
    // if (i == 0) {
    //   this.data.list = ['checked', false];
    // } else if (i == 1) {
    //   this.data.list = [false, 'checked'];
    // } 
    this.data.name = this.books[i].title;
  }

  output() {
    console.log(this.date.value.getFullYear());
    this.data.dates = this.date.value.getFullYear()+("0"+ (this.date.value.getMonth() + 1)).slice(-2) + ("0" + this.date.value.getDate()).slice(-2);
    this.dayInput = true;

  }


  byDate() {
    console.log('click');
    this.byDateFlag = true;
    this.byDayFlag = false;
    this.dayInput = false;
  }

  byDay() {
    this.byDateFlag = false;
    this.byDayFlag = true;
    this.dayInput = false;

    const selectedCountries = this.makeList();
    console.log('select:' + selectedCountries);
    if(selectedCountries.length>0){
      this.dayInput = true;
    } else {
      this.dayInput = false;
    }
  }

  dayClick() {
  setTimeout(() => {
    const selectedCountries = this.makeList();
    this.data.dayArray = selectedCountries;
    console.log('select:' + selectedCountries);
    if(selectedCountries.length>0){
      this.dayInput = true;
    } else {
      this.dayInput = false;
    }
  }, 0);

  }

  //
  makeList() {
    // 格納先の配列を宣言
    let countryList = [];

    // selectedからチェック状態を確認して、配列にを格納していく
    countryList = this.checkdata2
        .filter((d) => d.selected) // checkされているものに絞る
        .map((d) => d.value); // valueを取得
    return countryList; //
}

}
