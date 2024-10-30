import { Component, OnInit } from '@angular/core';
import { SquareComponent } from "../square/square.component";
import { NgForOf, NgIf } from "@angular/common";
import confetti from 'canvas-confetti';
import { DialogModule } from "primeng/dialog";
import { Button } from "primeng/button";
import { ChipsModule } from "primeng/chips";
import { MatButton } from "@angular/material/button";

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    SquareComponent,
    NgIf,
    NgForOf,
    DialogModule,
    Button,
    ChipsModule,
    MatButton
  ],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  squares!: any[];
  xIsNext!: boolean;
  winner!: null | string;
  winningCombination!: number[] | null;
  visible: boolean = false;

  constructor() {}

  ngOnInit() {
    this.newGame();
  }

  newGame() {
    this.squares = Array(9).fill(null);
    this.winner = null;
    this.winningCombination = null;
    this.xIsNext = true;
    this.visible = false;
  }

  get player() {
    return this.xIsNext ? 'X' : 'O';
  }

  makeMove(idx: number) {
    if (!this.squares[idx]) {
      this.squares.splice(idx, 1, this.player);
      this.xIsNext = !this.xIsNext;
    }
    this.winner = this.calculateWinner();

    if (this.winner) {
      this.showCelebration();
    }
  }

  calculateWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) {
        this.winningCombination = [a, b, c];
        return this.squares[a];
      }
    }
    return null;
  }

  showCelebration() {
    this.visible = true;
    confetti({
      particleCount: 100,
      spread: 120,
      origin: { y: 0.6 }
    });
  }



}
