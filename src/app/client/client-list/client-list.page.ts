import { Component, OnInit, inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';

import { Client } from '../model/client';
import { ClientEdit } from '../client-edit/client-edit';
import { ClientService } from '../client.service';
import { DialogConfirmation } from '../../core/dialog-confirmation/dialog-confirmation';
import { DialogError } from '../../core/dialog-error/dialog-error';

@Component({
    selector: 'app-client-list',
    imports: [
        MatButtonModule,
        MatIconModule,
        MatTableModule
    ],
    templateUrl: './client-list.page.html',
    styleUrl: './client-list.page.scss'
})
export class ClientListPage implements OnInit{

    dataSource = new MatTableDataSource<Client>();
    displayedColumns: string[] = ['id', 'name', 'action'];

    protected readonly clientService = inject(ClientService);
    protected readonly dialog = inject(MatDialog);

    loadData(): void {
      this.clientService.getClients().subscribe(
            clients => this.dataSource.data = clients
        );
    }

    ngOnInit(): void {
        this.loadData();
    }

    createClient() {    
      const dialogRef = this.dialog.open(ClientEdit, {
        data: {}
      });

      dialogRef.afterClosed().subscribe(result => {
        if(!result) return;
        this.loadData();
      });    
    }

    editClient(client: Client) {
      const dialogRef = this.dialog.open(ClientEdit, {
        data: { client }
      });

      dialogRef.afterClosed().subscribe(result => {
        if(!result) return;
        this.loadData();
      });
    }

    deleteClient(client: Client) {
      const dialogRef = this.dialog.open(DialogConfirmation, {
        data: { title: "Eliminar cliente", description: "Atención si borra el cliente se perderán sus datos.<br> ¿Desea eliminar el cliente?" }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.clientService.deleteClient(client.id).subscribe({
            next: () => this.loadData(),
            error: (err) => this.dialog.open(DialogError, {
              data: {
                title: 'Error al eliminar',
                description: err.error?.message ?? 'No se pudo eliminar el cliente.',
              }
            })
          });  
        }
      });
    }
}
