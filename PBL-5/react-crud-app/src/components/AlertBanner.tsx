import { useEffect, useState } from "react";

const AlertBanner = ({ keyword, expenses, clickBtn, setClickBtn }) => {
  const [alert, setAlert] = useState(true);
  let keyKorean = "";
  // const tempClickBtn = clickBtn;

  // console.log(tempClickBtn);

  useEffect(() => {
    // ....왜 여기에... setClickBtn(false) 넣으면... 되는 거지...? 충격... 와.. 뭐임... 순서가 어떻게 되는 거지? ..... 아..... 맨 처음에 이걸 시행하는데 setTimeout이라 2초 후에 false되는 거지!?!?!?
    let timer = setTimeout(() => {
      setAlert(false);
      setClickBtn(false);
    }, 1000);
    return () => {
      clearTimeout(timer);
      setAlert(true);
    };
    //clickBtn 왜 경고 뜸?
    //useEffect에서 dependency 사용보다 그냥 그 버튼에 함수 넣어주는 걸로 구현하는 게 더 좋음. (버튼을 누를 때마다 이벤트 발생하고 싶다면)
  }, [clickBtn]);

  switch (keyword) {
    case "CREATE":
      keyKorean = "아이템이 생성되었습니다.";
      break;
    case "EDIT":
      keyKorean = "아이템이 수정되었습니다.";
      break;
    case "DELETE":
      keyKorean = "아이템이 삭제되었습니다.";
      break;
    case "RETRY":
      keyKorean = "다시 입력해 주세요.";
      break;
    default:
      break;
  }

  if (keyKorean === "") {
    return;
  }
  // setClickBtn(false);

  return alert === true && clickBtn ? (
    <div className={"alertMessage " + keyword}>{keyKorean}</div>
  ) : null;
};

export default AlertBanner;
