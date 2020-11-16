import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ProveedoresService {

  presURL = 'https://comprasapp-6f57a.firebaseio.com/proveedores.json';
  preURL = 'https://comprasapp-6f57a.firebaseio.com/proveedores';

  constructor(private http: HttpClient) { }
 


  postProveedor(presupuesto: any) {
    const newpres = JSON.stringify(presupuesto);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    }); return this.http.post(this.presURL, newpres, { headers }).pipe(map(res => {
      console.log(res);
      return res;
    })
    )
  }


  getProveedor(id$: string) {
    const url = `${this.preURL}/${id$}.json`;
    return this.http.get(url).pipe(map(res => res)
    );
  }
  getProveedores() {
    return this.http.get(this.presURL).pipe(map(res => res))
      ;
  }

  putProveedor(proveedor: any, id$: string): Observable<any> {
    const newpre = JSON.stringify(proveedor);
     const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.preURL}/${id$}.json`;
     return this.http.put(url, newpre, { headers }).pipe(map((res: any) => { return res; })); }

 delProveedor(id$: string) {
   const url = `${this.preURL}/${id$}.json`;
   return this.http.delete(url).pipe(map(res => res))

 }
}

