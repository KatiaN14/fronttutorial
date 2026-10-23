import { Component, OnInit, inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from '../model/category';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';

import { CategoryEdit } from '../category-edit/category-edit';
import { CategoryService } from '../category.service';
import { DialogConfirmation } from '../../core/dialog-confirmation/dialog-confirmation';
import { DialogError } from '../../core/dialog-error/dialog-error';

@Component({
    selector: 'app-category-list',
    imports: [
        MatButtonModule,
        MatIconModule,
        MatTableModule
    ],
    templateUrl: './category-list.page.html',
    styleUrl: './category-list.page.scss'
})
export class CategoryListPage implements OnInit{

    dataSource = new MatTableDataSource<Category>();
    displayedColumns: string[] = ['id', 'name', 'action'];

    protected readonly categoryService = inject(CategoryService);
    protected readonly dialog = inject(MatDialog);

    loadData(): void {
      this.categoryService.getCategories().subscribe(
            categories => this.dataSource.data = categories
        );
    }

    ngOnInit(): void {
        this.loadData();
    }

    createCategory() {    
      const dialogRef = this.dialog.open(CategoryEdit, {
        data: {}
      });

      dialogRef.afterClosed().subscribe(result => {
        if(!result) return;
        this.loadData();
      });    
    }

    editCategory(category: Category) {
      const dialogRef = this.dialog.open(CategoryEdit, {
        data: { category }
      });

      dialogRef.afterClosed().subscribe(result => {
        if(!result) return;
        this.loadData();
      });
    }

    deleteCategory(category: Category) {
      const dialogRef = this.dialog.open(DialogConfirmation, {
        data: { title: "Eliminar categoría", description: "Atención si borra la categoría se perderán sus datos.<br> ¿Desea eliminar la categoría?" }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.categoryService.deleteCategory(category.id).subscribe({
            next: () => this.loadData(),
            error: (err) => this.dialog.open(DialogError, {
              data: {
                title: 'Error al eliminar',
                description: err.error?.message ?? 'No se pudo eliminar la categría.',
              }
            })
          });  
        }
      });
    }
}
