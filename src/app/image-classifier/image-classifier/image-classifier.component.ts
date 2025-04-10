import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
declare const tmImage: any;


@Component({
  selector: 'app-image-classifier',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-classifier.component.html',
  styleUrl: './image-classifier.component.css'
})
export class ImageClassifierComponent{
  @ViewChild('webcamContainer', { static: true }) webcamContainer!: ElementRef;
  model: any;
  webcam: any;
  prediction: string = '';
  isPredicting: boolean = false;

  async ngOnInit() {
    const modelURL = 'https://teachablemachine.withgoogle.com/models/C9zDSXjQn/model.json';
    const metadataURL = 'https://teachablemachine.withgoogle.com/models/C9zDSXjQn/metadata.json';

    this.model = await tmImage.load(modelURL, metadataURL);
    this.webcam = new tmImage.Webcam(300, 300, true);
    await this.webcam.setup();
    await this.webcam.play();

    this.webcamContainer.nativeElement.appendChild(this.webcam.canvas);

    // Iniciar predicción continua
    this.isPredicting = true;
    this.loop();
  }

  async loop() {
    if (!this.isPredicting) return;

    await this.webcam.update(); // actualizar frame

    const predictions = await this.model.predict(this.webcam.canvas);
    const top = predictions.sort((a: any, b: any) => b.probability - a.probability)[0];
    this.prediction = `${top.className} (${(top.probability * 100).toFixed(2)}%)`;

    window.requestAnimationFrame(() => this.loop());
  }
}
