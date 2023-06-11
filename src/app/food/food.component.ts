import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Receta } from '../core/interfaces/receta';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss']
})
export class FoodComponent implements OnInit {

  type = '';
  id = '';
  url = '';
  recetas: any;
  food: Receta;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.type = this.route.snapshot.params['type'];
    this.id = this.route.snapshot.params['id'];
    if (this.type === 'recetas'){
      this.url = 'http://localhost:4200/assets/data/recetas.json';
    }
    this.getReceta();
  }

  getReceta() {
    this.http.get(this.url).subscribe((receta:Receta) => {
      this.recetas = receta;
      let index = this.recetas.findIndex((food: { id: string }) => food.id == this.id);
      console.log(index);
      if (index > -1) {
        this.food = this.recetas[index];
        console.log(this.recetas[index].ingredientes)
      }
    });
  }


}
