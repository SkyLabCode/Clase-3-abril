import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ImageClassifierComponent } from './image-classifier/image-classifier.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ImageClassifierComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'app-reconocimiento-imagenes';
}
