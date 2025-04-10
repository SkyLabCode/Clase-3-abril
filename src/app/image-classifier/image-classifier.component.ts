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
    //await this.webcam.update();

    //4 Insertamos la webcam (canvas) dentro de un div en html
    this.webcamContainer.nativeElement.appendChild(this.webcam.canvas);

    //5 Establecemos el estado de la predicción como true
    this.isPredicting = true;
    this.loop();

  }

  //Función para disponer de un bucle continuo:
  async loop(){

    if(!this.isPredicting){
      return;
    }

    await this.webcam.update();

    const predictions = await this.model.predict(this.webcam.canvas);

    //console.log(predictions)

    //Extraemos la predicción con mayor probabilidad:
    const max = predictions.sort((a: any, b: any) => b.probability - a.probability)[0];
    //console.log(max);
    this.prediction = `${max.className} - Percentage: ${(max.probability * 100).toFixed(2)}%`;
    console.log(this.prediction)
    //Llamamos a la funcionalidad nativa del navegador que se encarga
    //de actualizar los frames de la captura de la webcam
    window.requestAnimationFrame(() => this.loop());

  }

}
