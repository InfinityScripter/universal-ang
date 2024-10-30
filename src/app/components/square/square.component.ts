import { Component, Input, OnChanges, SimpleChanges, ElementRef, ViewChild } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  standalone: true,
  styleUrls: ['./square.component.css']
})
export class SquareComponent implements OnChanges {
  @Input() value!: 'X' | 'O';
  @Input() isWinningSquare!: boolean | undefined;
  @ViewChild('squareButton', { static: true }) squareButton!: ElementRef;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isWinningSquare'] && this.isWinningSquare) {
      this.animateWinningSquare();
    }
  }

  animateWinningSquare() {
    gsap.to(this.squareButton.nativeElement, {
      scale: 1.05,
      fontWeight: 'bold',
      boxShadow: '0 0 10px #28a745',
      duration: 1,
      repeat: 3,
      yoyo: true
    });
  }

  getBackgroundColor(): string {
    return this.value === 'X' ? '#007BFF' : this.value === 'O' ? '#FF5733' : '#FFFFFF';
  }
}
