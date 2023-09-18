import React, { useEffect, useState } from "react";
import AlertBanner from "../components/AlertBanner";
import ExpensesList from "../components/ExpensesList";
import Calculator from "../components/Calculator";
import { Expenses } from "../Types";

//로컬스토리지 이용, 저장된 값 불러오기
const initialExpenses = JSON.parse(localStorage.getItem("Expenses")) || [];

//... ㅠㅠ shop 파일은 왜 안 될가요 ㅠㅠ 엉엉... ㅠㅠ 이걸 보면서 해야 뭘.... 가늠을 하고 공부를 할 텐데 눈물...
//JSX? 얘는 왜 꼭 return에서 뭘로 감싸줘야 한다는 걸까? provider도 .. 진짜.... 뭔 소린지 잘 모름...
//SummaryPage에서 optionRender는 왜 초기화해 주는 부분은 없는 거지? .. 어렵다 어려워.. render... 에 따르 거겠지? ... 으음.... 근데 여긴 useEffect가 없는데.. 오.. 뭐지...

/**
 * 구현할 때 TDD로 보여주시나요? 해 보고 싶었는데... 구현하는 것도 어려워서 실패.... 보통 구현을 어떻게 할지 생각하고 TDD를 같이 짜는 거죠? ..으음.. 안 짜봐서 뭐가 먼저고 어쩌구인지 상상이 어렵.
 *
 *
 * 알람 배너 확인.. 왜 저기에.. 저게 들어가면..? ...
 * // ....왜 여기에... setClickBtn(false) 넣으면... 되는 거지...? 충격... 와.. 뭐임... 순서가 어떻게 되는 거지? ..... 아..... 맨 처음에 이걸 시행하는데 setTimeout이라 2초 후에 false되는 거지!?!?!?
 * //clickBtn 왜 경고 뜸?
 *
 * ...key라는 변수 이름은... 고유값인 거임? 근데 왜... 아무 ... 경고도 안 띄워주냐~~~..하. .ㅋ.. key 변수 설정했다가 어쩐지.. 알림이 안 되더라... ㅠㅠ....내 시간.....엉엉....  keyword라고 진짜 혹시나.. 마지막에 고쳐서야....
 *===> 다시 확인해 보자. 콘솔로그에.. 알림이 뜨네요.. 이거때문일 줄은 몰랐는데..... 핳ㅎㅎㅎ
 *
 * localstorage 초기값 불러오는 걸 컴포넌트 바깥에 선언한 이유?
 *
 *
 *e.target["category"].value 같은 식으로 말고! 뭔가 좀 더 동적으로..?
 *
 * - 현재 수정 버튼 누르기만 하면 수정이라고 뜸! => 실제로 수정 버튼 누르고 제출했을 때 알람이 나오게 하려면 어떻게.. 그냥 입력과 수정 입력과 차이를 주지? (+수정할 때는 blur돼도 저장)
 *- 버튼 클릭 시마다 알람이 나오게 하려면.. 함수를 어떻게 짜야 하지..?
 *...ㅠㅠㅠ... 두 개... onClick 함수 주는 거 어떻게 하지..? ㅠㅠ
 *
 * google icon 이용
 * onChange 및 defaultValue 활용
 *
 */

function FormPage() {
  const [expenses, setExpenses] = useState<Expenses[]>(initialExpenses);
  const [keyword, setKeyword] = useState("");
  const [newEditValue, setNewEditValue] = useState<Expenses>();
  const [mode, setMode] = useState("CREATE");
  const [clickBtn, setClickBtn] = useState(false);

  //입력 버튼 클릭 시 생성/수정 모드에 따라 다름
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    let tempNode = mode;

    if (e.target["category"].value === "" || e.target["money"].value === "") {
      setClickBtn(true);
      setKeyword("RETRY");
      return;
    }

    //수정하려고 올려놓은 걸 저장 안 누르고 삭제하면(DELETE 후) CREATE로 만들기
    if (keyword === "DELETE") {
      tempNode = "CREATE";
    }

    //생성 시
    if (tempNode === "CREATE") {
      const newExpenses: Expenses = {
        id: Date.now(),
        category: e.target["category"].value,
        money: parseInt(e.target["money"].value),
      };

      const temp = [...expenses, newExpenses];
      setExpenses(temp);

      localStorage.setItem("Expenses", JSON.stringify(temp));
      setClickBtn(true);
      setKeyword("CREATE");
    } else if (tempNode === "EDIT") {
      //이때 버튼 누르면 리스트 내역에서 바뀌게.

      const newSetEditValue: Expenses = expenses.find(
        (it) => it.id === newEditValue.id
      );
      // console.log("edit" + newSetEditValue);
      // console.log("edit" + tempNode);
      newSetEditValue.category = e.target["category"].value;
      newSetEditValue.money = parseInt(e.target["money"].value);

      localStorage.setItem("Expenses", JSON.stringify(expenses));
      setClickBtn(true);
      setKeyword("EDIT");
      setMode("CREATE");
    }

    e.target["category"].value = " ";
    e.target["money"].value = null;
    e.target["category"].focus();
  };

  // Edit 버튼 클릭 시 해당 내용이 input으로 가고 목록에서 사라짐.
  const handleEditClick = (e) => {
    const targetId = e.target.closest("li").id;
    const $categoryInput = document.getElementById(
      "category"
    ) as HTMLInputElement;
    const $moneyInput = document.getElementById("money") as HTMLInputElement;
    const $categorySpan = e.target.closest("li").firstChild;
    const $moneySpan = $categorySpan.nextSibling;

    $categoryInput.value = $categorySpan.innerText;
    $moneyInput.value = $moneySpan.innerText;

    setNewEditValue(expenses.find((it) => it.id === parseInt(targetId)));

    setMode("EDIT");
  };

  //한 개 삭제
  const handleDeleteClick = (e) => {
    const targetId = e.target.closest("li").id;
    const DeleteExpenses: Expenses[] = expenses.filter(
      (it) => it.id !== parseInt(targetId)
    );
    setExpenses(DeleteExpenses);
    console.log(DeleteExpenses);

    localStorage.setItem("Expenses", JSON.stringify(DeleteExpenses));

    //string
    // console.log(typeof e.target.closest("li").id);
    //number
    // console.log(typeof expenses[0].id);
    setClickBtn(true);
    setKeyword("DELETE");
  };

  // 전체 삭제
  const handleDeleteAllClick = () => {
    setExpenses([]);
    localStorage.clear();
    setClickBtn(true);
    setKeyword("DELETE");
  };

  //alert true-false
  // const handleAlertBoolean = () => {
  //   setClickBtn(true);
  //   setClickBtn(false);
  // };

  //배열인 경우...똑같은 배열이라도 다른 값으로 인식할 수 있음. -> 추가 공부하기
  useEffect(() => {}, [expenses]);

  return (
    <div>
      <div className="Container">
        <AlertBanner
          keyword={keyword}
          expenses={expenses}
          clickBtn={clickBtn}
          setClickBtn={setClickBtn}
        />
        <h2>예산 계산기</h2>
        <article className="BudgetCalculatorForm">
          <form
            onSubmit={(e) => {
              handleSubmit(e);
              setClickBtn(true);
            }}
            className="BudgetInput"
          >
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
