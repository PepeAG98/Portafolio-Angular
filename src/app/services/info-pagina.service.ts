import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina.interface';
import { Equipo } from '../interfaces/equipo-pagina.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina = {};
  cargado = false; 
  equipo: any[]= [];

  constructor( private http: HttpClient) {
    console.log('Servicio de la pagina listo');

    //Leer el archivo JSON
    this.cargarInfo();
    this.cargarEquipo();


   }

   private cargarInfo() {
    this.http.get('assets/data/data-pagina.json')
    .subscribe( (resp : InfoPagina) => {
      this.cargado = true;
      this.info = resp;
      //console.log(resp);
    });
   }

   private cargarEquipo() {
     this.http.get('https://angular-html-53746.firebaseio.com/equipo.json')
      .subscribe( (resp : any[]) => {
        this.equipo = resp;
        //console.log(resp);
      });
   }
}
