import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Category } from './model/category';
import { backendUrl } from '../app.config';

@Service()
export class CategoryService {
    protected readonly http = inject(HttpClient);

    private baseUrl = backendUrl.url + '/category';

    getCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(this.baseUrl);
    }

    saveCategory(category: Category): Observable<Category> {
        const { id } = category;
        const url = id ? `${this.baseUrl}/${id}` : this.baseUrl;
        return this.http.put<Category>(url, category);
    }

    deleteCategory(idCategory : number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${idCategory}`);
    }  
}
