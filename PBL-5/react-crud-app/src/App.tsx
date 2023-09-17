import "./App.css";
import FormPage from "./pages/FormPage";

function App() {
  return (
    <div>
      <FormPage />
    </div>
  );
}

export default App;

//초반 구상
// <div className="Container">
//   <div className="alertMessage">
//     생성 ㅇㅋㅇㅋ
//     {/* {alertMessage(key)} */}
//   </div>
//   <h2>예산 계산기</h2>
//   <article className="BudgetCalculatorForm">
//     <form className="BudgetInput">
//       {/* <article className="BudgetInput" style={{ display: flex }}> */}
//       <div className="expensesCategory">
//         <span>지출 항목</span>
//         <input type="text" />
//       </div>
//       <div className="expensesMoney">
//         <span>비용</span>
//         <input type="text" />
//       </div>
//       <div className="expensesBtn">
//         <span> </span>
//         <button type="submit">제출</button>
//       </div>
//     </form>
//     <div className="ListsAndBtn">
//       <div className="deleteAllBtn">
//         <button>목록 지우기</button>
//       </div>
//       <article className="BudgetLists">
//         <ul>
//           <li className="BudgetList">
//             <span>식비</span>
//             <span>10000</span>
//             <div className="BudgetListBtn">
//               <button> img </button>
//               <button> img </button>
//             </div>
//           </li>

//           <li className="BudgetList">
//             <span>식비</span>
//             <span>10000</span>
//             <div className="BudgetListBtn">
//               <button> img </button>
//               <button> img </button>
//             </div>
//           </li>
//         </ul>
//       </article>
//     </div>
//   </article>
//   <div className="BudgetTotal">총 지출: 000원</div>
// </div>;
