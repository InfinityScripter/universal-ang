import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  standalone: true,
  styleUrls: ['./square.component.css']
})
export class SquareComponent {
  @Input() value!: 'X' | 'O';

  getBackgroundColor(): string {
    return this.value === 'X' ? '#007BFF' : this.value === 'O' ? '#FF5733' : '#FFFFFF';
  }
}
