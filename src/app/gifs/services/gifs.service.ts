import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';


@Injectable({
  providedIn: 'root'
})
export class GifsService {

private apiKey      : string = 'JkV0srwWWamOCtCcsHioNqvQTY61E1Kl';
private servicioUrl : string = 'https://api.giphy.com/v1/gifs';
private _historial  : string [] = [];

//TODO: cambiar any por su tipo
public resultados: Gif[] = [];



get historial() {

    return [...this._historial];
}


constructor( private http: HttpClient ) {
/* Muestro la busqueda en el local storage*/
/*Forma 1 */
/*   if(localStorage.getItem('historial') ){
    this._historial = JSON.parse( localStorage.getItem('historial')! );
  } */

/*Forma 2  si regresa null entonces regresa un arreglo vacio*/

this._historial = JSON.parse(localStorage.getItem('historial') !) || [];
this.resultados = JSON.parse(localStorage.getItem('resultados') !) || [];

}



buscarGifs( query: string ) {

  query = query.trim().toLocaleLowerCase();

  if( !this._historial.includes( query ) ) {
      this._historial.unshift( query );
/* para limitar el historial a 10 */
       this._historial = this._historial.splice(0,10);
/* guardo busqueda en local storage*/       
       localStorage.setItem( 'historial', JSON.stringify(this._historial) );

  }



const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);

   



this.http.get< SearchGifsResponse >(`${ this.servicioUrl }/search`, { params } )
   .subscribe( ( resp ) => {
    this.resultados = resp.data;
     
/*Guardo imagenes en el local storage  */
localStorage.setItem( 'resultados', JSON.stringify(this.resultados) );

   });

}


 }




/* [.....] operador spread para romper la referencia 

unshift para insertar al comienzo*/