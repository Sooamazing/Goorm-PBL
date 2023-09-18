const ExpensesList = ({
  expenses,
  handleDeleteAllClick,
  handleDeleteClick,
  handleEditClick,
}) => {
  return (
    <>
      <div className="ListsAndBtn">
        <div className="deleteAllBtn">
          <button
            onClick={(e) => {
              handleDeleteAllClick(e);
            }}
          >
            목록 지우기
          </button>
        </div>
        <article className="BudgetLists">
          <ul>
            {expenses.map((it) => {
              return (
                <li key={it.id} id={it.id} className="BudgetList">
                  <span id={it.id + " " + it.category}>{it.category}</span>
                  <span id={it.id + " " + it.money}>{it.money}</span>
                  <div className="BudgetListBtn">
                    <button
                      onClick={(e) => {
                        handleEditClick(e);
                      }}
                    >
                      {" "}
                      <span className="material-icons">edit</span>{" "}
                    </button>
                    <button
                      onClick={(e) => {
                        handleDeleteClick(e);
                      }}
                    >
                      {" "}
                      X{" "}
                    </button>
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
