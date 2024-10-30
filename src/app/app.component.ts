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
    // Вычисляем значения цвета с направлением
    const red = Math.round(this.mouseX * 255);
    const blue = Math.round(this.mouseY * 255);
    const green = 120;

    // Создаём градиент с учётом направления курсора
    const gradient = `linear-gradient(${this.mouseX * 360}deg, rgb(255, 255, 255), rgb(${red}, ${green}, ${blue}), rgb(${blue}, ${green}, ${red}))`;

    // Анимируем изменение фона с помощью GSAP
    gsap.to(document.body, {
      backgroundImage: gradient,
      zIndex: -1, // Помещаем фон под контент
      duration: 0.5, // Уменьшаем длительность для быстрой реакции
      ease: 'power3.out'
    });
  }
}
