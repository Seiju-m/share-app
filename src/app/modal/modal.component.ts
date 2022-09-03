import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { DialogData } from '../list/list.component';
import { FormBuilder, Validators } from '@angular/forms';

// export interface DialogData {
//   name: string;
//   list:  [false,false,'checked'];
// }

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  list: any[];
  sbook = '978-4-7741-9130-0';
  books = [
    { isbn: '978-4-8222-9894-4', title: '西村' },
    { isbn: '978-4-8222-5355-4', title: '森下' },
    { isbn: '978-4-7741-9130-0', title: '未定' },
  ];
  form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(15)]],
  });

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.list = [false, false, 'checked'];
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
    if (i == 0) {
      this.data.list = ['checked', false, false];
    } else if (i == 1) {
      this.data.list = [false, 'checked', false];
    } else if (i == 2) {
      this.data.list = [false, false, 'checked'];
    }
  }
}
