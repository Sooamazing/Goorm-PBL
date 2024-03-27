import { Expenses } from "../Types";

function InputForm({
  setClickBtn,
  mode,
  setMode,
  setKeyword,
  keyword,
  expenses,
  setExpenses,
  newEditValue,
  editValueId,
  deleteValueId,
}) {
  //입력 버튼 클릭 시 생성/수정 모드에 따라 다름
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    let tempNode = mode;

    if (
      e.target["category"].value === "" ||
      e.target["money"].value === "" ||
      parseInt(e.target["money"].value) < 0
    ) {
      setClickBtn(true);
      setKeyword("RETRY");
      return;
    }

    //수정하려고 올려놓은 걸 저장 안 누르고 삭제하면(DELETE 후) CREATE로 만들기
    //여기서 왜... newEditValue.id랑 같이 비교하면 안 되지?
    if (keyword === "DELETE" && deleteValueId === editValueId) {
      //모두 지우기 한 후에 제출 누르면 이게 에러남.. 왜지 와우.
      // console.log(typeof newEditValue.id + "  " + newEditValue.id);
      // console.log(typeof editValueId + "  " + editValueId);
      // console.log(typeof deleteValueId + "  " + deleteValueId);
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

  return (
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
        <span />
        <button type="submit">{mode === "EDIT" ? "수정" : "제출"}</button>
      </div>
    </form>
  );
}

export default InputForm;
