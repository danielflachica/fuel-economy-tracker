interface Kilometer {
  start: number;
  end: number;
}

export interface Expense {
  id: number;
  date: Date;
  kilometers: Kilometer;
  liters: number;
  gasPrice: number;
}
