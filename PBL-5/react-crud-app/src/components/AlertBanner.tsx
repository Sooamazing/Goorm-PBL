import { useEffect, useState } from "react";

//key가 안 받아와 지는 상태 ㅠㅠ - ㅋ.. 해결......key XX...
//key, keyKorean 초기화도 하고, 알람 없으면 아예 없애는 것도.. 어떻게..?
const AlertBanner = ({ keyword, expenses }) => {
  // const [keyKorean, setKeyKorean] = useState("");
  const [alert, setAlert] = useState(true);
  let keyKorean = "";
  // console.log(1, keyKorean);

  useEffect(() => {
    let timer = setTimeout(() => {
      setAlert(false);
    }, 1000);
    return () => {
      clearTimeout(timer);
      setAlert(true);
    };
  }, [expenses, keyword]);

  //fall through: break ^^....
  //^^.... 수정, 삭제를.... 단어를 다르게 넣었네 어쩐지.. ^^.. 왜 오류나나 했네.....^^

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

  // console.log(keyKorean);
  if (keyKorean === "") {
    return;
  }
  //keyword 글자...를 넣고 싶은데 ㅠㅠ [object object]로 들어감.. ㅠㅠ 어째야 하지...?
  //..^^.. keyword는.. 이미 . "" 니까 그냥 넣으면 되는 거였음... {} 이렇게 감싸지 말고.. 어쩐지...
  return alert === true ? (
    <div className={"alertMessage" + " " + keyword}>{keyKorean}</div>
  ) : null;
};

export default AlertBanner;
