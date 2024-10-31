import { Component } from '@angular/core';
import {BoardComponent} from "../../components/board/board.component";

@Component({
  selector: 'app-game',
  standalone: true,
    imports: [
        BoardComponent
    ],
  templateUrl: './tik-tak.component.html',
  styleUrl: './tik-tak.component.css'
})
export class GamesComponent {

}
