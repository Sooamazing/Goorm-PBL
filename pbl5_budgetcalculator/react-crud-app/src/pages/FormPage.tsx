import React, { useEffect, useState } from "react";
import AlertBanner from "../components/AlertBanner";
import ExpensesList from "../components/ExpensesList";
import Calculator from "../components/Calculator";
import { Expenses } from "../Types";
import InputForm from "../components/InputForm";

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
 * 
 *
 * ...key라는 변수 이름은... 고유값인 거임? 근데 왜... 아무 ... 경고도 안 띄워주냐~~~..하. .ㅋ.. key 변수 설정했다가 어쩐지.. 알림이 안 되더라... ㅠㅠ....내 시간.....엉엉....  keyword라고 진짜 혹시나.. 마지막에 고쳐서야....
 *===> 안 된다고 콘솔에 뭔가 오류가 뜨긴.. 뜹니다 하하.. VSC에서는 안 잡는데 다르 곳에서 충돌이 있나봐여.
 *
 * localstorage 초기값 불러오는 걸 컴포넌트 바깥에 선언한 이유?
 *
 * 
 * - 정확히.. useState가 바뀔 때 어떤 게 렌더링되는 건지? State를 가지고 있는 모든 컴포넌트? (컴포넌트 기준은 맞는 건지?)
- useEffect 안 실행 내용 안 쓰고 디펜던시만 주는 건 그냥 죽은 코드 맞는지?
 *
 *JSX에서 div로 감싸야 하는데 싫으면 <REACT.FRAGMENT> / <></> 사용 가능
 * 
 * 
 * component로 prop 내려준 함수는 onClick={(e => {handleClick(e);}) 이런식으로 사용 ㅇ 근데 생성한 걸 쓰면 {handleClick} ... 이 차이는 JSX 문법 차이인 거 같은데... 으음.. 정확히 뭘 검색해서 공부하면 나오나?
 * }
 * (props) / ({구조 분해 할당}) => <Component (aa={aa}, bb={bb})/> 이렇게 쓰고 props.aa로 써도 되는 거임?????? 
 * 
 * 구조 분해 할당 시 변수와 이름값 같으면 그냥 변수만 써도 됨.
 * 
 * editValueId, deleteValueId 둘을 그냥 let 변수로 만들었더니 잘 반영이 안 됐는데, 컴포넌트 간에 값을 전달하려면 useState를 무조건 이용해야 하는 거? 그니까 let 일반 변수로 만들면 안 되는 거?
 * 
 *e.target["category"].value 같은 식으로 말고! 뭔가 좀 더 동적으로..?
 *
 *제가 느끼기엔 똑같은 동작을 하는데, 어느 땐 오류가 나고 어느 땐 오류가 나지 않습니다.. ㅠ 수정 부분에서! 아마 삭제 후 수정하는 부분 ... 근데 어떤 걸 삭제할 때인지 모르겠음..... 
 *
 * google icon 이용
 * onChange 및 defaultValue 활용
 *
 * input id와 label의 htmlFor을 같게!
 *
 */

function FormPage() {
  const [expenses, setExpenses] = useState<Expenses[]>(initialExpenses);
  const [keyword, setKeyword] = useState("");
  const [newEditValue, setNewEditValue] = useState<Expenses>();
  const [mode, setMode] = useState("CREATE");
  const [clickBtn, setClickBtn] = useState(false);
  const [editValueId, setEditValueId] = useState(0);
  const [deleteValueId, setDeleteValueId] = useState(0);

  //배열인 경우...똑같은 배열이라도 다른 값으로 인식할 수 있음. -> 추가 공부하기
  useEffect(() => {}, [expenses]);

  return (
    <div>
      <main className="Container">
        <AlertBanner
          keyword={keyword}
          clickBtn={clickBtn}
          setClickBtn={setClickBtn}
        />
        <h2>예산 계산기</h2>
        <article className="BudgetCalculatorForm">
          <InputForm
            setClickBtn={setClickBtn}
            mode={mode}
            setMode={setMode}
            setKeyword={setKeyword}
            keyword={keyword}
            expenses={expenses}
            setExpenses={setExpenses}
            newEditValue={newEditValue}
            editValueId={editValueId}
            deleteValueId={deleteValueId}
          />
          <ExpensesList
            expenses={expenses}
            setNewEditValue={setNewEditValue}
            setMode={setMode}
            setExpenses={setExpenses}
            setClickBtn={setClickBtn}
            setKeyword={setKeyword}
            editValueId={editValueId}
            setEditValueId={setEditValueId}
            setDeleteValueId={setDeleteValueId}
            deleteValueId={deleteValueId}
          />
        </article>
        <Calculator expenses={expenses} />
      </main>
    </div>
  );
}

export default FormPage;
