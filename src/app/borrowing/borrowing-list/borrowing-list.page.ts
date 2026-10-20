import { Component, OnInit, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { BorrowingEdit } from '../borrowing-edit/borrowing-edit';
import { BorrowingService } from '../borrowing.service';
import { Borrowing } from '../model/borrowing';
import { Pageable } from '../../core/model/page/pageable';
import { DialogConfirmation } from '../../core/dialog-confirmation/dialog-confirmation';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Game } from '../../game/model/game';
import { GameService } from '../../game/game.service';  
import { Client } from '../../client/model/client';
import { ClientService } from '../../client/client.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

@Component({
  imports: [
    MatButtonModule, 
    MatIconModule, 
    MatTableModule, 
    CommonModule, 
    MatPaginatorModule,
    FormsModule, 
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  selector: 'app-borrowing-list',
  styleUrl: './borrowing-list.page.scss',
  templateUrl: './borrowing-list.page.html',
})
export class BorrowingListPage implements OnInit{
  protected readonly games = signal<Game[]>([]);
  protected readonly clients = signal<Client[]>([]);
  protected readonly filterGame = signal<Game | null>(null);
  protected readonly filterClient = signal<Client | null>(null);
  protected readonly filterDate = signal<string | null>(null);

  protected readonly borrowingService = inject(BorrowingService);
  protected readonly gameService = inject(GameService);
  protected readonly clientService = inject(ClientService);
  protected readonly dialog = inject(MatDialog);

  pageNumber: number = 0;
  pageSize: number = 5
  totalElements: number = 0;

  dataSource = new MatTableDataSource<Borrowing>();
  displayedColumns: string[] = ['id', 'game', 'client','startDate', 'endDate', 'action'];

  ngOnInit(): void {
    this.gameService.getGames().subscribe((games) => this.games.set(games));
    this.clientService.getClients().subscribe((clients) => this.clients.set(clients));
    this.borrowingService.getBorrowings({ pageNumber: this.pageNumber, pageSize: this.pageSize, sort: [] }).subscribe((data) => {
      this.dataSource.data = data.content;
      this.pageNumber = data.pageable.pageNumber;
      this.pageSize = data.pageable.pageSize;
      this.totalElements = data.totalElements;
    });
    this.loadPage();
  }

  onCleanFilter(): void {
    this.filterGame.set(null);
    this.filterClient.set(null);
    this.filterDate.set(null);
    this.loadPage();
  }

  onSearch(): void {
    const gameId = this.filterGame() != null ? this.filterGame().id : null;
    const clientId = this.filterClient() != null ? this.filterClient().id : null;
    const date = this.filterDate() != null ? this.filterDate() : null;
    this.borrowingService.getBorrowings({ pageNumber: this.pageNumber, pageSize: this.pageSize, sort: [] }, gameId, clientId, date).subscribe((data) => {
      this.dataSource.data = data.content;
      this.pageNumber = data.pageable.pageNumber;
      this.pageSize = data.pageable.pageSize;
      this.totalElements = data.totalElements;
    });
  }

  loadPage(event?: PageEvent) {
    const pageable: Pageable = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      sort: [
        {
          property: 'id',
          direction: 'ASC',
        },
      ],
    };

    if (event != null) {
      pageable.pageSize = event.pageSize;
      pageable.pageNumber = event.pageIndex;
    }

    this.borrowingService.getBorrowings(pageable).subscribe((data) => {
      this.dataSource.data = data.content;
      this.pageNumber = data.pageable.pageNumber;
      this.pageSize = data.pageable.pageSize;
      this.totalElements = data.totalElements;
    });
  }

  createBorrowing() {
    const dialogRef = this.dialog.open(BorrowingEdit, {
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit();
    });
  }

  editBorrowing(borrowing: Borrowing) {
    const dialogRef = this.dialog.open(BorrowingEdit, {
      data: { borrowing: borrowing },
    });
  }

  deleteBorrowing(borrowing: Borrowing) {
    const dialogRef = this.dialog.open(DialogConfirmation, {
      data: {
        title: 'Eliminar préstamo',
        description:
        'Atención, si borra el préstamo se perderán sus datos. <br> ¿Desea eliminar el préstamo?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.borrowingService.deleteBorrowing(borrowing.id).subscribe(() => {
          this.ngOnInit();
        });
      }
    });
  }
}
