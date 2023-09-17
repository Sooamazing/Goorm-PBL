import React, { useEffect, useState } from "react";
import AlertBanner from "../components/AlertBanner";
import ExpensesList from "../components/ExpensesList";
import Calculator from "../components/Calculator";
import { Expenses } from "../Types";

const initialExpenses = JSON.parse(localStorage.getItem("Expenses")) || [];

// 특히 수정할 때 에러!
//Cannot read properties of undefined (reading 'id')
//TypeError: Cannot read properties of undefined (reading 'id')
//첫 값이.. 잘 안 되는 건 진짜 왜일까.. 로컬스토리지 하면서 뭔가 바뀐 건가...
function FormPage() {
  const [expenses, setExpenses] = useState<Expenses[]>(initialExpenses);
  //왜 useState를 이 안의 함수 내에서 선언하면 안 되지?
  const [keyword, setKeyword] = useState("");
  //...key는... 고유값인 거임? ..하. .ㅋ.. key 변수 설정했다가 어쩐지.. 알림이 안 되더라... ㅠㅠ....내 시간.....엉엉....  keyword라고 진짜 혹시나.. 마지막에 고쳐서야....
  const [newEditValue, setNewEditValue] = useState<Expenses>();
  const [moneyValue, setMoneyValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("");

  //제출하고 비워주는 걸 .. 어떻게 햐야 하나.
  //....첫 입력이 ... newExpenses 반영이 안 된다!!!! => 무조건 onChange 해야 하는 건가? ...어떻게 해야 할지 모르겠음.. 도대체 왜~

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (e.target["category"].value === "" || e.target["money"].value === "") {
      //다시 입력해 달라고 할 때 keyword 말고 뭘 디펜ㄴ던시로 줘야.. 계속 눌러도 계속 알림 나오게 할 수 있나?
      setKeyword("RETRY");
      return;
    }

    // setCategory(e.target["category"].value);
    // setMoney(parseInt(e.target["money"].value));

    const newExpenses: Expenses = {
      id: Date.now(),
      category: e.target["category"].value,
      //ㅋ.. 설마했는데.. 아놔 ㅋ parseInt 말고는 없나?
      money: parseInt(e.target["money"].value),
    };

    console.log(1, expenses);
    console.log(1, newExpenses);

    //이게 대체 왜 안 될까? .... 처음에 딱 안 되는데 왜지....
    // setExpenses([...expenses, newExpenses]);
    //비동기 어쩌구 함수 주라길래... 함수로 만들었는데도 왜..... ㅠㅠ
    // setExpenses((prev) => {
    //   return [...prev, newExpenses];
    // });

    //... 이렇게 하는데.... 계속 제출 눌러보면.. 그래도... 한 개를... 저장을 못하네 temp에 2개 있어도 Expenses에서 1개만 저장함.. 왜임..?
    const temp = [...expenses, newExpenses];
    setExpenses(temp);
    console.log(2, temp);
    console.log(2, expenses);
    console.log(2, newExpenses);
    localStorage.setItem("Expenses", JSON.stringify(expenses));
    // localStorage.setItem(
    //   "Expenses",
    //   JSON.stringify([...expenses, newExpenses])
    // );
    setKeyword("CREATE");
    // console.log(e.target["category"]);
    // console.log(key);
    e.target["category"].value = " ";
    e.target["money"].value = null;
    e.target["category"].focus();
  };

  //각 수정, 삭제 함수가 List 파일에 있어도 동작하나? 근데 그건.. 그럼 어떻게 만들어야 하는 거지?
  //...아니.. 하.. ㅋ... 왜.......as HTMLInputElement 이거 해 줘야 함?(생각해 보니 타입 단언이네.. 왜지? null이 되기라도 하나?) 아니 그냥 찍으면 input이라는데 왜 .value가 안 되는 걸까?
  //edit -> 아무것도 안 변했으면 그냥 그대로 목록에 남아있게 만들고 싶음! 수정할 때 입력하는 거랑 그냥 입력하는 것의 차이를 어떻게 둬야 할지 모르겠음! 수정할 때는 blur돼도 저장하게 하고 싶은데!
  const handleEditClick = (e) => {
    const targetId = e.target.closest("li").id;
    const $categoryInput = document.getElementById(
      "category"
    ) as HTMLInputElement;
    const $moneyInput = document.getElementById("money") as HTMLInputElement;
    const $categorySpan = e.target.closest("li").firstChild;
    const $moneySpan = $categorySpan.nextSibling;

    // console.log($categoryInput.value);
    // $category.setAttribute("value", "");

    $categoryInput.value = $categorySpan.innerText;
    $moneyInput.value = $moneySpan.innerText;
    setNewEditValue(expenses.find((it) => it.id == targetId));

    editUpdate();

    function editUpdate() {
      setExpenses(expenses.filter((it) => it.id != newEditValue.id));

      localStorage.setItem("Expenses", JSON.stringify(expenses));
    }

    setKeyword("EDIT");
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
    setKeyword("DELETE");
  };

  const handleDeleteAllClick = () => {
    setExpenses([]);
    localStorage.clear();
    setKeyword("DELETE");
  };

  // const handleCategoryChange = (e) => {
  //   setCategoryValue(e.target.value);
  //   return e.target.value;
  // };
  // const handleMoneyChange = (e) => {
  //   setMoneyValue(e.target.value);
  //   return e.target.value;
  // };

  // useEffect를 어떻게 써야 할지 모르겠다...
  useEffect(() => {
    console.log(">>>>>>" + expenses);
  }, [expenses]);
  // form...event타입을 알아낸 건 정말 장하다.. onSubmit으로 form으로 지정하면 그 안 input에는 다 접근 가능한 거랑 target[].value 사용하는 거...
  return (
    <div>
      <div className="Container">
        <AlertBanner keyword={keyword} expenses={expenses} />
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
                // onChange... 대체 뭔 언제 어떻게 활용하는 거지...
                // onChange={handleCategoryChange}
                //...ㅋ... defaultValue도.. 의미없어...
                // defaultValue={categoryValue || ""}
              />
            </div>
            <div className="expensesMoney">
              <label htmlFor="money">비용</label>
              <input
                id="money"
                name="money"
                className="expensesMoneyValue"
                type="number"
                // onChange={handleMoneyChange}
                // defaultValue={moneyValue || ""}
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
