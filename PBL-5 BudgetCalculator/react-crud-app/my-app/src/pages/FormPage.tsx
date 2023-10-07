import React, { useEffect, useState } from "react";
import AlertBanner from "../components/AlertBanner";
import ExpensesList from "../components/ExpensesList";
import Calculator from "../components/Calculator";
import { Expenses } from "../Types";

const initialExpenses = localStorage.getItem("Expenses")
  ? JSON.parse(localStorage.getItem("Expenses"))
  : [];

function FormPage() {
  const [expenses, setExpenses] = useState<Expenses[]>(initialExpenses);
  //왜 useState를 함수 내에서 선언하면 안 되지?
  const [key, setKey] = useState("");
  const [newEditValue, setNewEditValue] = useState<Expenses>();

  //제출하고 비워주는 걸 .. 어떻게 햐야 하나.
  //....첫 입력이 ... newExpenses 반영이 안 된다!!!! => 무조건 onChange 해야 하는 건가? ...어떻게 해야 할지 모르겠음.. 도대체 왜~
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    // setCategory(e.target["category"].value);
    // setMoney(parseInt(e.target["money"].value));

    const newExpenses: Expenses = {
      id: Date.now(),
      category: e.target["category"].value,
      //ㅋ.. 설마했는데.. 아놔 ㅋ parseInt 말고는 없나?
      money: parseInt(e.target["money"].value),
    };

    setExpenses([...expenses, newExpenses]);

    localStorage.setItem("Expenses", JSON.stringify(expenses));
    // localStorage.setItem(
    //   "Expenses",
    //   JSON.stringify([...expenses, newExpenses])
    // );
    setKey("CREATE");
    console.log(e.target["category"]);
    console.log(key);
    // e.target["category"].value = null,
    // e.target["money"].value = null;
  };

  //각 수정, 삭제 함수가 List 파일에 있어도 동작하나? 근데 그건.. 그럼 어떻게 만들어야 하는 거지?
  const handleEditClick = (e) => {
    const targetId = e.target.closest("li").id;

    setNewEditValue(expenses.find((it) => it.id == targetId));
    // const categorySpan;
    // const moneySpan;

    // if (newEditValue.id == targetId) {
    //   categorySpan.setAttribute("contenteditable", true);
    //   moneySpan.setAttribute("contenteditable", true);
    // }

    // setNewEditValue({
    //   id:newEditValue.id
    //   category: span.value,
    //   money: parseInt(span.value),
    // });

    // categorySpan.setAttribute("contenteditable", false);
    // moneySpan.setAttribute("contenteditable", false);

    setExpenses([...expenses.filter((it) => it.id != targetId), newEditValue]);
    setKey("EDIT");
  };

  const handleDeleteClick = (e) => {
    //...wow... type이 다르가 봐... !==하니까 안 되는데... 아니 왜?... 하..ㅋ 설마설마했는데 ㅠ... list에서 id 가져오는 건 왜 string이지..? id는 자동으로 string으로 저장되는 건가?
    //ㅋ... e.target.closest("li").id 이거 말고.. 좀 더... ㅠ 세련되게 표현 ㄴ? 하.. 어렵다 어려워....
    setExpenses(expenses.filter((it) => it.id != e.target.closest("li").id));

    localStorage.setItem("Expenses", JSON.stringify(expenses));

    //string
    console.log(typeof e.target.closest("li").id);
    //number
    console.log(typeof expenses[0].id);
    setKey("DELETE");
  };

  const handleDeleteAllClick = () => {
    setExpenses([]);
    localStorage.clear();
    setKey("DELETE");
  };

  // useEffect를 어떻게 써야 할지 모르겠다...
  useEffect(() => {
    // console.log(expenses);
  }, [expenses]);
  // form...event타입을 알아낸 건 정말 장하다.. onSubmit으로 form으로 지정하면 그 안 input에는 다 접근 가능한 거랑 target[].value 사용하는 거...
  return (
    <div>
      <div className="Container">
        <AlertBanner key={key} />
        <h2>예산 계산기</h2>
        <article className="BudgetCalculatorForm">
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
                type="number"
              />
            </div>
            <div className="expensesBtn">
              <span> </span>
              <button type="submit">제출</button>
            </div>
          </form>
          <ExpensesList
            expenses={expenses}
            handleDeleteAllClick={handleDeleteAllClick}
            handleDeleteClick={handleDeleteClick}
            handleEditClick={handleEditClick}
          />
        </article>
        <div className="BudgetTotal">
          총 지출: <Calculator expenses={expenses} /> 원
        </div>
      </div>
    </div>
  );
}

export default FormPage;
