import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Client } from './model/client';
import { backendUrl } from '../app.config';

@Service()
export class ClientService {
    protected readonly http = inject(HttpClient);

    private baseUrl = backendUrl.url + '/client';

    getClients(): Observable<Client[]> {
        return this.http.get<Client[]>(this.baseUrl);
    }

    saveClient(client: Client): Observable<Client> {
        const { id } = client;
        const url = id ? `${this.baseUrl}/${id}` : this.baseUrl;
        return this.http.put<Client>(url, client);
    }

    deleteClient(idClient : number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${idClient}`);
    }
}
