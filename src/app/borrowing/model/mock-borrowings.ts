import {PaginatedData} from '../../core/model/page/paginated-data';
import {Borrowing} from "./borrowing";

export const BORROWING_DATA: PaginatedData<Borrowing> = {
    content: [
        { id: 1, game: { id: 1, title: 'Juego 1', age: 6, category: { id: 1, name: 'Categoría 1' }, author: { id: 1, name: 'Autor 1', nationality: 'Nacionalidad 1' } }, client: { id: 1, name: 'Cliente 1'}, startDate: new Date('2023-01-01'), endDate: new Date('2023-01-10') },
        { id: 2, game: { id: 2, title: 'Juego 2', age: 8, category: { id: 1, name: 'Categoría 1' }, author: { id: 2, name: 'Autor 2', nationality: 'Nacionalidad 2' } }, client: { id: 2, name: 'Cliente 2'}, startDate: new Date('2023-02-01'), endDate: new Date('2023-02-10') },
        { id: 3, game: { id: 3, title: 'Juego 3', age: 4, category: { id: 1, name: 'Categoría 1' }, author: { id: 3, name: 'Autor 3', nationality: 'Nacionalidad 3' } }, client: { id: 3, name: 'Cliente 3'}, startDate: new Date('2023-03-01'), endDate: new Date('2023-03-10') },
        { id: 4, game: { id: 4, title: 'Juego 4', age: 10, category: { id: 2, name: 'Categoría 2' }, author: { id: 1, name: 'Autor 1', nationality: 'Nacionalidad 1' } }, client: { id: 4, name: 'Cliente 4'}, startDate: new Date('2023-04-01'), endDate: new Date('2023-04-10') },
        { id: 5, game: { id: 5, title: 'Juego 5', age: 16, category: { id: 2, name: 'Categoría 2' }, author: { id: 2, name: 'Autor 2', nationality: 'Nacionalidad 2' } }, client: { id: 5, name: 'Cliente 5'}, startDate: new Date('2023-05-01'), endDate: new Date('2023-05-10') },
        { id: 6, game: { id: 6, title: 'Juego 6', age: 16, category: { id: 2, name: 'Categoría 2' }, author: { id: 3, name: 'Autor 3', nationality: 'Nacionalidad 3' } }, client: { id: 6, name: 'Cliente 6'}, startDate: new Date('2023-06-01'), endDate: new Date('2023-06-10') },
        { id: 7, game: { id: 7, title: 'Juego 7', age: 12, category: { id: 3, name: 'Categoría 3' }, author: { id: 1, name: 'Autor 1', nationality: 'Nacionalidad 1' } }, client: { id: 7, name: 'Cliente 7'}, startDate: new Date('2023-07-01'), endDate: new Date('2023-07-10') },
    ],
    pageable: {
        pageSize: 5,
        pageNumber: 0,
        sort: [{ property: 'id', direction: 'ASC' }],
    },
    totalElements: 7,
};