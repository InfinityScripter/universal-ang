import {Component} from '@angular/core';

interface CalcGroup {
  operation: CalcOperations,
  first: CalcVar,
  second: CalcVar,
}

interface CalcVar {
  value: number,
  modification: CalcModifiers,
}

enum CalcOperations {
  plus = '+',
  minus = '-',
  multiply = '*',
  divide = '/',
}

enum CalcModifiers {
  none = 'none',
  sin = 'sin',
  cos = 'cos',
  square = 'square'
}


@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',

})
export class CalcComponent {
  public calcOperations = CalcOperations;
  public calcModifiers = CalcModifiers;
  public calcGroup: CalcGroup[] = [
    {
      first: {
        value: 0,
        modification: CalcModifiers.none
      },
      second: {
        value: 0,
        modification: CalcModifiers.none
      },
      operation: CalcOperations.plus
    }
  ];
  public history: string[] = [];

  public operationsForGroup: CalcOperations[] = [];

  public result?: number;


  public addGroup(): void {
    this.calcGroup.push({
      first: {
        value: 0,
        modification: CalcModifiers.none
      },
      second: {
        value: 0,
        modification: CalcModifiers.none
      },
      operation: CalcOperations.plus
    });
    this.operationsForGroup.push(CalcOperations.plus);
  }

  public removeGroup(index: number): void {
    this.calcGroup.splice(index, 1);
  }


  public calculateGroup() {
    let result = 0;
    let tempHistory: string[] = [];

    this.calcGroup.forEach((group, i) => {
      if (i === 0) {
        result = this.calculate(
          this.calculateValueWithModif(group.first),
          this.calculateValueWithModif(group.second),
          group.operation
        );
      } else {
        let tempResult = this.calculate(
          this.calculateValueWithModif(group.first),
          this.calculateValueWithModif(group.second),
          group.operation
        );
        result = this.calculate(result, tempResult, this.operationsForGroup[i - 1]);
      }

      // Добавляем запись в историю с учетом операции между группами
      let groupHistory = `
      (
      ${group.first.modification !== CalcModifiers.none ? group.first.modification + '(' : ''}${group.first.value}${group.first.modification !== CalcModifiers.none ? ')' : ''}
      ${group.operation}
      ${group.second.modification !== CalcModifiers.none ? group.second.modification + '(' : ''}${group.second.value}${group.second.modification !== CalcModifiers.none ? ')' : ''}
      )
    `;

      // Добавляем оператор между группами, кроме первой группы
      if (i > 0) {
        tempHistory.push(this.operationsForGroup[i - 1]);
      }

      tempHistory.push(groupHistory);
    });

    tempHistory.push(`= ${result}`);
    this.history.push(tempHistory.join(' '));
    this.result = result;
  }


  public calculateValueWithModif(value: CalcVar): number {
    switch (value.modification) {
      case CalcModifiers.none:
        return value.value;
      case CalcModifiers.sin:
        return Math.sin(value.value);
      case CalcModifiers.cos:
        return Math.cos(value.value);
      case CalcModifiers.square:
        return Math.pow(value.value, 2);
      default:
        return value.value;
    }
  }

  public calculate(first: number, second: number, operation: CalcOperations): number {
    switch (operation) {
      case CalcOperations.plus:
        return first + second;
      case CalcOperations.minus:
        return first - second;
      case CalcOperations.multiply:
        return first * second;
      case CalcOperations.divide:
        return first / second;
      default:
        return first + second

    }
  }
}
