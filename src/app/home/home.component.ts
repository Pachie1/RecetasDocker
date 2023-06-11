import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Receta } from '../core/interfaces/receta';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  recetas:any;
  mobil:boolean=false;

  constructor(private http:HttpClient, private router:Router) { }

  ngOnInit(): void {
    this.getReceta()
    if(window.screen.availWidth<=850){
      this.mobil=true;
    }
  }


  getReceta(){
      this.http.get('http://localhost:4200/assets/data/recetas.json').subscribe((food:Receta) => {
        this.recetas = food;
      });
    }

  alfabetico(){
    this.recetas.sort((a,b)=>{
      if(a.name > b.name){
          return 1;
      }
      if(a.name < b.name){
          return -1;
      }
      return 0;
    })
    console.log(this.recetas);
  }
  cPasosMenorMayor(){
    this.recetas.sort((a,b)=>a.cPasos-b.cPasos);
  }
  cPasosMayorMenor(){
    this.recetas.sort((a,b)=>b.cPasos-a.cPasos);
  }

  goToMovie(type: string, id: string){
    this.router.navigate(['food', type, id]);
  }
}
