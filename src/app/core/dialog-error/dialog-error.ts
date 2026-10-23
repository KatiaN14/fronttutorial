import { Component, inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  imports: [MatButtonModule],
  selector: 'app-dialog-error',
  styleUrl: './dialog-error.scss',
  templateUrl: './dialog-error.html',
})
export class DialogError {
  protected readonly title = signal<string | null>(null);
  protected readonly description = signal<string | null>(null);

  protected readonly dialogRef = inject(MatDialogRef<DialogError>);
  protected readonly data = inject(MAT_DIALOG_DATA);

  ngOnInit(): void {
    this.title.set(this.data.title);
    this.description.set(this.data.description);
  }

  onClose(value = false) {
    this.dialogRef.close(value);
  }
}
