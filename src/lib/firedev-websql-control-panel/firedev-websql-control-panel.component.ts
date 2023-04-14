import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FiredevWebsqlControlPanelDialogComponent } from './dialog/firedev-websql-control-panel-dialog.component';

@Component({
  selector: 'app-firedev-websql-control-panel',
  templateUrl: './firedev-websql-control-panel.component.html',
  styleUrls: ['./firedev-websql-control-panel.component.scss']
})
export class FiredevWebsqlControlPanelComponent implements OnInit {
  name = '';
  animal = '';
  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(FiredevWebsqlControlPanelDialogComponent, {
      width: '250px',
      data: { name: 'dariusz', animal: 'cobra' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }



  ngOnInit() {
  }

}