import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductoInterface } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: ProductoInterface[] = [];
  prductoFiltrado: ProductoInterface[] = [];

  constructor( private http: HttpClient) {

    this.cargarProductos();

   }

  private cargarProductos() {

    return new Promise( (resolve, reject ) => {
      this.http.get('https://angular-html-53746.firebaseio.com/productos_idx.json')
      .subscribe( (resp: ProductoInterface[]) => {
        this.cargando = false;
        this.productos=resp;
        resolve();
      });
    });

    
  }

  getProducto( id: string) {
    return this.http.get(`https://angular-html-53746.firebaseio.com/productos/${ id }.json`)
  }  

  buscarProducto( termino: string) {

    if( this.productos.length === 0 ){
      //cargar productos
      this.cargarProductos().then( () => {
        //ejecutar despues de tener productos
        //aplicar filtro
        this.filtrarProductos( termino );
      });
    } else {
      //aplicar el filtro
      this.filtrarProductos( termino );
    }


    

    console.log(this.prductoFiltrado);
  }

  private filtrarProductos( termino: string) {
    console.log(this.productos);
    this.prductoFiltrado = [];
    termino = termino.toLocaleLowerCase();

    this.productos.forEach( prod => {
      const tituloLower = prod.titulo.toLocaleLowerCase(); 
      if(prod.categoria.indexOf( termino) >= 0 || tituloLower.indexOf( termino ) >= 0 ) {
        this.prductoFiltrado.push(prod);
      }
    });
  }
}
