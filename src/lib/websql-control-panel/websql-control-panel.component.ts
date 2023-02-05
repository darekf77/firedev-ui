import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WebsqlControlPanelDialogComponent } from './dialog/websql-control-panel-dialog.component';

@Component({
  selector: 'app-websql-control-panel',
  templateUrl: './websql-control-panel.component.html',
  styleUrls: ['./websql-control-panel.component.scss']
})
export class WebsqlControlPanelComponent implements OnInit {
  name = '';
  animal = '';
  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(WebsqlControlPanelDialogComponent, {
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
