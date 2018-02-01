import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GlobalService } from '../../-core';

// tslint:disable:max-line-length
@Injectable()
export class ArtistService {
    constructor(
        private http: HttpClient,
        private global: GlobalService
    ) {}
    public Top(page: number, limit: number): Observable<any> {
        return this.http.get(`${this.global.apiDomain}/artist/top/${page}/${limit}`)
            .map((res: any) => res.artists);
    }
}
