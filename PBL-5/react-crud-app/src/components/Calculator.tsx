import { Expenses } from "../Types";
import { useEffect, useState } from "react";

//... 객체 디스트럭처링에서 쓰는 Ts!!!!!
const Calculator = ({ expenses }: { expenses: Expenses[] }) => {
  let sum: number = 0;
  for (let i = 0; i < expenses.length; i++) {
    sum += expenses[i].money;
    // console.log(expenses[i].money);
    // console.log(sum);
    // console.log(expenses.length);
  }

  useEffect(() => {
    sum = 0;
    //뭘 적어?
  }, [expenses]);

  return <span>{sum}</span>;
};

export default Calculator;
