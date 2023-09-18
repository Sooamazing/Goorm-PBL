import { useState } from "react";
import { Expenses } from "../Types";

function InputForm(expenses) {
  const [newExpense, setNewExpense] = useState<Expenses[]>(expenses);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const newExpenses: Expenses = {
      id: Date.now(),
      category: e.target["category"].value,
      money: e.target["money"].value,
    };

    // setNewExpense((prev) => [...prev, newExpense]);
    console.log(newExpense);
    console.log({ ...newExpense, newExpenses });
    // setNewExpense([...expenses, newExpenses]);
    console.log(newExpense);
  };

  return (
    <form onSubmit={handleSubmit} className="BudgetInput">
      <div className="expensesCategory">
        <label htmlFor="category">지출 항목</label>
        <input
          id="category"
          name="category"
          className="expensesCategoryValue"
          type="text"
        />
      </div>
      <div className="expensesMoney">
        <label htmlFor="money">비용</label>
        <input
          id="money"
          name="money"
          className="expensesMoneyValue"
          type="text"
        />
      </div>
      <div className="expensesBtn">
        <span> </span>
        <button type="submit">제출</button>
      </div>
    </form>
  );
}

export default InputForm;
