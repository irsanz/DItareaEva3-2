import { Article } from 'src/app/interfaces/interfaces';
import { Injectable } from '@angular/core';
import { GestionStorageService } from './almacenamiento.service';

@Injectable({
  providedIn: 'root'
})
export class GestionNoticiasLeerService {

  private leerNoticias : Article[] = [];

  constructor(private gestionNoticiasAlmacenar: GestionStorageService) { 
  let noticiaPromesa: Promise<Article[]> = gestionNoticiasAlmacenar.getObject("leerNoticias");
    noticiaPromesa.then( notis=> { if (notis){
      this.leerNoticias.push(...notis);
      //Comprueba si hay noticias para leer antes de hacerlo
    }})
}
  // Devuelve todas las noticias para leer
  getNoticias() {
    return this.leerNoticias;
    
  }

  //Añade una nueva noticia al array para poder leer
  addNoticias(noticia : Article){
    let noticiaString = JSON.stringify(noticia);
    noticia = JSON.parse(noticiaString);

    this.leerNoticias.push(noticia);
    this.gestionNoticiasAlmacenar.setObject("leerNoticias", this.leerNoticias)
  }

  /* Comprueba si una noticia ya está en el array.
   * Mediante find vamos recorriendo todo el array hasta encontrar un objeto noticia que coincida con el objeto item que viene desde tab1.page.ts -> seleccionado()
   */
  buscarNoticia(item: Article): number  {
    let articuloEncontrado: any = this.leerNoticias.find(
      function(noticia) { 
        return JSON.stringify(noticia) == JSON.stringify(item);
      }
    );
    let indice = this.leerNoticias.indexOf(articuloEncontrado);
    return indice;
  }

  // Borra una noticia del array
  borrarNoticia(item: Article) {
    let indice = this.buscarNoticia(item);
    if (indice != -1) {
      this.leerNoticias.splice(indice, 1);
      this.gestionNoticiasAlmacenar.setObject("leerNoticias", this.leerNoticias)
    }
  }

}
