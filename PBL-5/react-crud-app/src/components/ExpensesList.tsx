import { useState } from "react";
import { Expenses } from "../Types";

// expenses = [{
//   id: 00,
//   category : "00",
//   money : "00"
// }]

const ExpensesList = ({
  expenses,
  handleDeleteAllClick,
  handleDeleteClick,
  handleEditClick,
}) => {
  return (
    <div className="ListsAndBtn">
      <div className="deleteAllBtn">
        <button onClick={handleDeleteAllClick}>목록 지우기</button>
      </div>
      <article className="BudgetLists">
        <ul>
          {expenses.map((it) => {
            return (
              <li id={it.id} className="BudgetList">
                <span id={it.id + " " + it.category}>{it.category}</span>
                <span id={it.id + " " + it.money}>{it.money}</span>
                <div className="BudgetListBtn">
                  <button onClick={handleEditClick}>
                    {" "}
                    <span className="material-icons">edit</span>{" "}
                  </button>
                  <button onClick={handleDeleteClick}> X </button>
                </div>
              </li>
            );
          })}{" "}
        </ul>
      </article>
    </div>
  );
};

export default ExpensesList;
