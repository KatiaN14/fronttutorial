import { Component, inject, OnInit, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import {Borrowing} from '../model/borrowing';
import { Game } from '../../game/model/game';
import { Client } from '../../client/model/client';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BorrowingService } from '../borrowing.service';
import { GameService } from '../../game/game.service';
import { ClientService } from '../../client/client.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { validateFields } from '../../core/helpers/validation.helper';

@Component({
  imports: [
    MatFormFieldModule, 
    MatSelect, 
    FormsModule, 
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  standalone: true,
  selector: 'app-borrowing-create',
  styleUrl: './borrowing-create.scss',
  templateUrl: './borrowing-create.html',
})
export class BorrowingCreate implements OnInit {
  protected readonly borrowingService = inject(BorrowingService);
  protected readonly dialogRef = inject(MatDialogRef<BorrowingCreate>);
  protected readonly data = inject(MAT_DIALOG_DATA);
  protected readonly gameService = inject(GameService);
  protected readonly clientService = inject(ClientService);
  
  protected readonly id = signal<number | null>(null);
  protected readonly gameId = signal<number | null>(null);
  protected readonly clientId = signal<number | null>(null);
  protected readonly games = signal<Game[]>([]);
  protected readonly clients = signal<Client[]>([]);
  protected readonly startDate = signal<Date | null>(null);
  protected readonly endDate = signal<Date | null>(null);

  ngOnInit(): void {
    this.loadFormData(this.data.borrowing ?? null);
  }

  loadFormData(initialData: Borrowing | null): void {
    this.id.set(initialData?.id ?? null);
    this.startDate.set(initialData?.startDate ?? null);
    this.endDate.set(initialData?.endDate ?? null);

    this.gameService.getGames().subscribe((games) => {
      this.games.set(games);
      this.gameId.set(initialData?.game?.id ?? null);
    });

    this.clientService.getClients().subscribe((clients) => {
      this.clients.set(clients);
      this.clientId.set(initialData?.client?.id ?? null);
    });
  }

  onSave() {
    const id = this.id();
    const gameId = this.gameId();
    const clientId = this.clientId();
    const startDate = this.startDate();
    const endDate = this.endDate();

    const requiredFields = ["gameId", "clientId", "startDate", "endDate"] as const;
    const data = { gameId, clientId, startDate, endDate };

    if (!validateFields(data, requiredFields)) {
      return;
    }

    const borrowing = {
      id,
      game: this.games().find(g => g.id === gameId) ?? null,
      client: this.clients().find(c => c.id === clientId) ?? null,
      startDate,
      endDate,
    } as Borrowing;
    this.borrowingService.saveBorrowing(borrowing).subscribe(() => {
      this.dialogRef.close(true);
    });
  }

  onClose() {
    this.dialogRef.close(false);
  }
}
