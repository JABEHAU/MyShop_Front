import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Product } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  protected productId: number = 0;
  protected product: Product = {
    productoId: 1,
    vendedorId: 7,
    categoriaId: 1,
    categoria: 'Electrónica, Audio y Video',
    nombre: 'Audifonos',
    descripcion: 'Audifonos xiaomi Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia eius nobis obcaecati maxime ratione veniam accusamus vero nam at autem sit cum quo ex nulla, consequuntur impedit ducimus harum sequi.',
    marca: 'Xiaomi',
    modelo: 'M2236E1',
    genero: 'N/A',
    cantidad: 2,
    precio: 380,
    esOferta: 0,
    precioOferta: 0,
    fotos:['']
  }

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(() => {
      var data = this.activatedRoute.snapshot.queryParamMap.get('productId');
      if(data==null){
        this.router.navigateByUrl('home');
      }else{
        this.productId = parseInt(data);
      }
    })
  }

  handleFileInput(event: Event){
    const inputElement = event.target as HTMLInputElement;

    if (inputElement.files && inputElement.files.length > 0) {
      // Ahora maneja cada archivo
      Array.from(inputElement.files).forEach(file => {
        this.convertToBase64(file);
      });
    }
  }

  convertToBase64(file: File): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const base64Image = e.target.result;
      console.log('Imagen en Base64:', base64Image);
    };
    reader.readAsDataURL(file);
  }
  
}
