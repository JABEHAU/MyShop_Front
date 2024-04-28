import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public isUserLogin: boolean = false;
  constructor() { }

  public categories: any[]=[
    {categoriaId: 1, categoria: 'Ropas'},
    {categoriaId: 2, categoria: 'Calzado'}
  ]

  ngOnInit(): void {
  }

}
