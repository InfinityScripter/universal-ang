import {Component, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {map} from "rxjs";

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.css']
})
export class DataListComponent implements OnInit {

  data: any;
  id: any;
  count: any = 0;
  constructor(private dataService:DataService) { }

  showData() {
    this.dataService.getData().subscribe(data => {
      this.data = data;
    });
  }

  resetData() {
    this.data = null;
    this.id = null;
    this.count = 0;
  }

  checkId(id: any) {
    const numericId = Number(id);
    this.dataService.getData().pipe(
      map((data: any) => (data as any[]).filter(item => item.id === numericId))
    ).subscribe(filteredData => {
      this.data = filteredData;
    });
  }

  countPlus (){
    this.count++;
  }

  countMinus (){
    this.count--;
  }

  ngOnInit(): void {

  }

}
