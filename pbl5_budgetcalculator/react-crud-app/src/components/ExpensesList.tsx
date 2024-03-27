import { Expenses } from "../Types";

const ExpensesList = ({
  expenses,
  setNewEditValue,
  setMode,
  setExpenses,
  setClickBtn,
  setKeyword,
  editValueId,
  setEditValueId,
  setDeleteValueId,
  deleteValueId,
}) => {
  // Edit 버튼 클릭 시 해당 내용이 input으로 가고 목록에서 사라짐.
  const handleEditClick = (e) => {
    const targetId = e.target.closest("li").id;
    const $categoryInput = document.getElementById(
      "category"
    ) as HTMLInputElement;
    const $moneyInput = document.getElementById("money") as HTMLInputElement;
    const $categorySpan = e.target.closest("li").firstChild;
    const $moneySpan = $categorySpan.nextSibling;

    setEditValueId(parseInt(targetId));
    $categoryInput.value = $categorySpan.innerText;
    $moneyInput.value = $moneySpan.innerText;

    setNewEditValue(expenses.find((it) => it.id === parseInt(targetId)));
    console.log(deleteValueId);

    setMode("EDIT");
  };

  //한 개 삭제
  const handleDeleteClick = (e) => {
    const targetId = e.target.closest("li").id;
    const DeleteExpenses: Expenses[] = expenses.filter(
      (it) => it.id !== parseInt(targetId)
    );
    setExpenses(DeleteExpenses);
    setDeleteValueId(parseInt(targetId));
    // console.log(DeleteExpenses);

    if (editValueId === parseInt(targetId)) {
      setMode("CREATE");
    }
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
    setDeleteValueId(editValueId);
    setClickBtn(true);
    setKeyword("DELETE");
    setMode("CREATE");
  };

  return (
    <>
      <div className="ListsAndBtn">
        <div className="deleteAllBtn">
          <button onClick={handleDeleteAllClick}>목록 지우기</button>
        </div>
        <article className="BudgetLists">
          <ul>
            {expenses.map((it) => {
              return (
                <li key={it.id} id={it.id} className="BudgetList">
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
    </>
  );
};

export default ExpensesList;
