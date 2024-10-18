import { Component, HostListener } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Нормализованные координаты курсора
  mouseX: number = 0;
  mouseY: number = 0;

  // Идентификатор запланированного кадра анимации
  animationFrame: any;

  // Обработчик события движения мыши
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    // Получаем нормализованные координаты курсора (от 0 до 1)
    this.mouseX = event.clientX / window.innerWidth;
    this.mouseY = event.clientY / window.innerHeight;

    // Проверяем, запланирована ли анимация
    if (this.animationFrame) {
      return;
    }

    // Запланировать анимацию в следующем кадре
    this.animationFrame = requestAnimationFrame(() => {
      this.animateBackground();
      this.animationFrame = null;
    });
  }

  // Функция для анимации заднего фона
  animateBackground() {
    // Calculate color values
    const red = Math.round(this.mouseX * 255);
    const blue = Math.round(this.mouseY * 255);
    const green = 100; // Adjusted for a lighter blue effect

    // Create a linear gradient with white, blue, and light blue stops
    const gradient = `linear-gradient(135deg, rgb(255, 255, 255), rgb(${red}, ${green}, ${blue}), rgb(${blue}, ${green}, ${red}))`;

    // Анимируем изменение фона с помощью GSAP
    gsap.to(document.body, {
      backgroundImage: gradient,
      duration: 10,
      ease: 'power2.out'
    });
  }
}
