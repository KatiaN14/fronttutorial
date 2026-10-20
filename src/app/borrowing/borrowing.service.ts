import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pageable } from '../core/model/page/pageable';
import { Borrowing } from './model/borrowing';
import { PaginatedData } from '../core/model/page/paginated-data';
import { HttpClient } from '@angular/common/http';
import { BORROWING_DATA_LIST } from './model/mock-borrowings-list';
import { BORROWING_DATA } from './model/mock-borrowings';

@Injectable({
    providedIn: 'root',
})
export class BorrowingService {
    protected readonly http = inject(HttpClient);

    private baseUrl = 'http://localhost:8080/borrowing';

    getBorrowings(pageable: Pageable, gameId?: number, clientId?: number, date?: string): Observable<PaginatedData<Borrowing>> {
        return this.http.post<PaginatedData<Borrowing>>(this.composeFindUrl(gameId, clientId, date), { pageable: pageable });
    }

    saveBorrowing(borrowing: Borrowing): Observable<Borrowing> {
        const { id } = borrowing;
        const url = id ? `${this.baseUrl}/${id}` : this.baseUrl;
        return this.http.put<Borrowing>(url, borrowing);
    }

    deleteBorrowing(idBorrowing: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${idBorrowing}`);
    }

    getAllBorrowings(): Observable<Borrowing[]> {
        return this.http.get<Borrowing[]>(this.baseUrl);
    }

    private composeFindUrl(gameId?: number, clientId?: number, date?: string): string {
        const params = new URLSearchParams();
        if(gameId) {
            params.set('idGame', gameId.toString());
        }
        if(clientId) {
            params.set('idClient', clientId.toString());
        }
        if(date) {
            params.set('date', date);
        }
        const queryString = params.toString();
        return queryString ? `${this.baseUrl}?${queryString}` : this.baseUrl;
    }
}
