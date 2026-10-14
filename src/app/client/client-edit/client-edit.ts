import { Component, OnInit, inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ClientService } from '../client.service';
import { Client } from '../model/client';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DialogConfirmation } from '../../core/dialog-confirmation/dialog-confirmation';

@Component({
    selector: 'app-client-edit',
    imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule ],
    templateUrl: './client-edit.html',
    styleUrl: './client-edit.scss'
})
export class ClientEdit implements OnInit {
    protected readonly dialogRef = inject(MatDialogRef<ClientEdit>);
    protected readonly clientService = inject(ClientService);
    protected readonly data = inject(MAT_DIALOG_DATA) as { client: Client };

    protected readonly id = signal<number | null>(null);
    protected readonly name = signal<string | null>(null);
    protected readonly errorMessage = signal<string | null>(null);
    protected readonly dialog = inject(MatDialog);

    ngOnInit(): void {
        this.loadFormData(this.data.client ?? null);
    }

    loadFormData(initialData: Client | null): void {
        this.id.set(initialData?.id ?? null);
        this.name.set(initialData?.name ?? null);
    }

    onSave() {
        const id = this.id();
        const name = this.name();

        this.errorMessage.set(null);

        if(!name) {
            return;
        }

        const client = { id, name } as Client;
        this.clientService.saveClient(client).subscribe({
            next: () => this.dialogRef.close(true),
            error: () => this.dialog.open(DialogConfirmation, {
                data: {
                    title: 'Error al guardar',
                    message: 'No se pudo guardar el cliente. Puede que ya exista un cliente con ese nombre',
                }
            })
        });
    }

    onClose() {
        this.dialogRef.close();
    }
}
