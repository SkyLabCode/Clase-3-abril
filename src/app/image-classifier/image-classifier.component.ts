import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

declare const tmImage: any;

@Component({
  selector: 'app-image-classifier',
  standalone: true,
  imports: [],
  templateUrl: './image-classifier.component.html',
  styleUrl: './image-classifier.component.css'
})
export class ImageClassifierComponent {

  model: any //Variable para alojar el modelo
  webcam: any //Instancia para la webcam
  prediction: string = '' //Variable para almacenar el porcentaje de la predicción
  isPredicting: boolean = false //Variable para controlar el bucle de predicción

  modelUrl: string = 'https://teachablemachine.withgoogle.com/models/VWHz8Iedu/model.json';
  metadataUrl: string = 'https://teachablemachine.withgoogle.com/models/VWHz8Iedu/metadata.json';

  //Creamos la referencia para acceder al elemento html donde se mostrará la webcam
  @ViewChild('webcamContainer', { static: true }) webcamContainer!: ElementRef;

  async ngOnInit(){

    //1 Cargamos el modelo con tmImage.load
    this.model = await tmImage.load(this.modelUrl, this.metadataUrl);

    //2 Pedimos acceso a la webcam del ordenador (width, height, invertir eje x)
    this.webcam = new tmImage.Webcam(300, 300, true);

    //3 Inicializamos la captura de la webcam
    await this.webcam.setup();
    await this.webcam.play();
    await this.webcam.update();

    //4 Insertamos la webcam (canvas) dentro de un div en html
    this.webcamContainer.nativeElement.appendChild(this.webcam.canvas);

  }

}
