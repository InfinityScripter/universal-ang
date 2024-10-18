import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements AfterViewInit {
  // Получаем доступ к элементу навигационного бара
  @ViewChild('navBar', { static: true }) navBar!: ElementRef;

  ngAfterViewInit() {
    this.animateNavBar();
    this.addHoverAnimations();
  }

  // Функция для анимации навигационного бара
  navBarAnimationSettings = {
    duration: 2,
    y: -100,
    opacity: 0,
    ease: 'power3.out'
  };

// Настройки для анимации при наведении
  hoverAnimationSettings = {
    scale: 1.05,
    duration: 0.5,
    ease: 'power3.out'
  };

  hoverOutAnimationSettings = {
    scale: 1,
    duration: 0.2
  };

// Обновленные функции с использованием настроек
  animateNavBar() {
    gsap.from(this.navBar.nativeElement, this.navBarAnimationSettings);
  }

  addHoverAnimations() {
    const menuItems = this.navBar.nativeElement.querySelectorAll('li');

    menuItems.forEach((item: HTMLElement) => {
      item.addEventListener('mouseenter', () => {
        gsap.to(item, this.hoverAnimationSettings);
      });

      item.addEventListener('mouseleave', () => {
        gsap.to(item, this.hoverOutAnimationSettings);
      });
    });
  }

}
