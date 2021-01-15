// Based on the work of Daniel Shiffman, http://codingtra.in, https://youtu.be/CKeyIbT3vXI
import p5 from "p5";

export enum Direction { HorizontalToTheRight, VerticalUp, DiagonalUp, DiagonalDown };

export interface IFoundFour {
  row: number;
  col: number;
  direction: Direction;
}

export class Board {
  public columns: number;
  public rows: number;

  private fields: number[][];

  constructor(columns: number, rows: number) {
    this.columns = columns;
    this.rows = rows;

    this.fields = new Array(this.columns);
    for (let col = 0; col < this.columns; col++) {
      this.fields[col] = new Array(this.rows);
      this.fields[col].fill(0);
    }
  }

  public getFreeRow(column: number): number {
    let freeRow = -1;

    for (let row = this.rows - 1; row >= 0 && freeRow == -1; row--) {
      if (this.fields[column][row] == 0) {
        freeRow = row;
      }
    }

    return freeRow;
  }

  public addDisc(player: number, column: number) {
    let row = this.getFreeRow(column);
    if (row > -1) {
      this.fields[column][row] = player;
    }
  }

  public getStatus(column: number, row: number) {
    return this.fields[column][row];
  }
  
  public findConnectedFour(): IFoundFour {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.columns; col++) {
        const current = this.getStatus(col, row);
        if (current === 0) continue;

        if (col <= this.columns - 4
          && this.getStatus(col + 1, row) == current
          && this.getStatus(col + 2, row) == current
          && this.getStatus(col + 3, row) == current) {
          return { row, col, direction: Direction.HorizontalToTheRight };
        }

        if (row >= 3
          && this.getStatus(col, row - 1) == current
          && this.getStatus(col, row - 2) == current
          && this.getStatus(col, row - 3) == current) {
          return { row, col, direction: Direction.VerticalUp };
        }

        if (row >= 3 && col <= this.columns - 4
          && this.getStatus(col + 1, row - 1) == current
          && this.getStatus(col + 2, row - 2) == current
          && this.getStatus(col + 3, row - 3) == current) {
          return { row, col, direction: Direction.DiagonalUp };
        }

        if (row <= this.rows - 4 && col <= this.columns - 4
          && this.getStatus(col + 1, row + 1) == current
          && this.getStatus(col + 2, row + 2) == current
          && this.getStatus(col + 3, row + 3) == current) {
          return { row, col, direction: Direction.DiagonalDown };
        }
      }
    }

    return null;
  }

}
