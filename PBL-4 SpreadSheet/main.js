const exportBtn = document.getElementById("exportBtn");
const cellNavigation = document.getElementById("cellNavigation");
const spreadSheetContainer = document.getElementById("spreadSheet");
const rows = 20;
const columns = 20;
const spreadSheet = [];
const alphabets = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

class Cell {
  // row, column 은 실제 i, j
  // rowName, columnName은 Header 이름!
  constructor(
    isHeader,
    disabled,
    data,
    row,
    rowName,
    column,
    columnName,
    active
  ) {
    this.isHeader = isHeader;
    this.disabled = disabled;

    this.row = row;
    this.rowName = rowName;

    this.column = column;
    this.columnName = columnName;

    this.active = active;
    this.data = data;
  }
}

// 객체 생성!
createCell();

function createCell() {
  // 배열 생성!
  // Cell[][] spreadSheet
  for (let i = 0; i <= rows; i++) {
    // Cell[] spreadSheetRow
    let spreadSheetRow = [];
    for (let j = 0; j <= columns; j++) {
      // 헤더 여부에 따라 달라짐
      let isHeader = false;
      let disabled = false;
      let data = "";

      if (i == 0) {
        isHeader = true;
        disabled = true;
        data = alphabets[j - 1];
      }
      if (j == 0) {
        isHeader = true;
        disabled = true;
        data = i;
      }
      if (j == 0 && i == 0) {
        isHeader = true;
        disabled = true;
        data = "";
      }
      // if(!data){
      //     data=""
      // }

      // 공통 내용
      const rowName = i;
      const columnName = alphabets[j - 1];
      const cell = new Cell(
        isHeader,
        disabled,
        data,
        i,
        rowName,
        j,
        columnName,
        false
      );
      spreadSheetRow.push(cell);
    }
    spreadSheet.push(spreadSheetRow);
  }
  console.log("spreadsheet", spreadSheet);
  drawSheet();
}

// 화면에 그리기 - element 추가만!
function drawSheet() {
  spreadSheetContainer.innerHTML = "";
  for (let i = 0; i < spreadSheet.length; i++) {
    //Cell[] 대응
    const rowContainerEl = document.createElement("div");
    rowContainerEl.className = "cell-row";

    for (let j = 0; j < spreadSheet[i].length; j++) {
      //Cell 대응 - Cell 객체 넘기면 element로 변환!
      const cell = spreadSheet[i][j];
      rowContainerEl.append(createCellEl(cell));
    }
    spreadSheetContainer.append(rowContainerEl);
  }
}

// Cell 객체 받아서 class 등 추가한 element 생성
// cell이라고만 넘겼는데, cell.row, cell.column을 쓸 수 있다니.. 이게 JS?
function createCellEl(cell) {
  const cellEl = document.createElement("input");
  cellEl.className = "cell";
  //column+row 중복 id 발생 -> columnName+rowName
  cellEl.id = "cell_" + cell.columnName + cell.rowName;
  cellEl.value = cell.data;
  cellEl.disabled = cell.disabled;
  // tab 으로 이동하기 추가 -> 원래 되는 거였음.
  //   cellEl.tabIndex = cell.row;

  // header인 경우 header class 추가
  if (cell.isHeader) {
    cellEl.classList.add("header");
  }

  // 함수 등록은 각 element에 등록해야 함!
  // cellEl에 focus하면 header Cell 객체의 정보가 바뀌는 함수(색상 강조) - 등록!
  cellEl.onfocus = () => handleCellFocus(cell);
  // cellEl 내용 바뀌면(입력하면) 해당 내용을 객체에 저장하는 함수 등록!
  cellEl.onchange = (e) => handleOnChange(e.target.value, cell);
  // 방향키로 이동
  // 인자 두 개 넘기는 방법 성공!
  // https://23life.tistory.com/158 참고!
  // keyup 은 누르고 있어도 반복이 안 됨 -> keydown은 가능!
  //   cellEl.addEventListener("keyup", keyEvent);
  cellEl.addEventListener("keydown", (e) => keyEvent(e, cell));
  return cellEl;
}

// cellEl에 focus하면 강조 위해 header Cell 객체의 정보가 바뀌는 함수 등록!
function handleCellFocus(cell) {
  // header 정보 초기화
  clearHeaderActiveStates();

  const columnHeader = spreadSheet[0][cell.column];
  const rowHeader = spreadSheet[cell.row][0];

  // Cell 객체의 row, col 정보로 headerEl 찾아오기
  const columnHeaderEl = getElFromRowCol(
    columnHeader.rowName,
    columnHeader.columnName
  );
  const rowHeaderEl = getElFromRowCol(rowHeader.rowName, rowHeader.columnName);

  columnHeaderEl.classList.add("active");
  rowHeaderEl.classList.add("active");

  // 활성화된 cell 위치 표시
  // ""은 문자열 더하기로 해 주기 위해?
  document.querySelector("#cell-status").innerHTML =
    cell.columnName + "" + cell.rowName;
}

// 요소를 전부 탐색해 header인 셀의 active 제거
function clearHeaderActiveStates() {
  for (let i = 0; i < spreadSheet.length; i++) {
    for (let j = 0; j < spreadSheet[i].length; j++) {
      // Cell 객체
      const cell = spreadSheet[i][j];

      // Cell 객체에서 isHeader인 경우 El 찾아 active class 제거.
      if (cell.isHeader) {
        let cellEl = getElFromRowCol(cell.rowName, cell.columnName);
        cellEl.classList.remove("active");
      }
    }
  }
}

// rowName, columnName 으로 El 반환 (각 id를 rowName, columnName 조합으로 설정해 querySelector로 반환 가능)
// getElementById("cell_" + columnName + rowName);도 가능!
function getElFromRowCol(rowName, columnName) {
  return document.querySelector("#cell_" + columnName + rowName);
}

// cellEl 내용 바뀌면(입력하면) 해당 내용을 객체에 저장.
function handleOnChange(data, cell) {
  cell.data = data;
}

//onClick 이라서 ... 오류....
exportBtn.onclick = function (e) {
  let csv = "";
  // header가 아닌 cell의 data를 전부 csv에 저장
  // 왜 \r\n 둘 다 사용하지?
  // join 사용 시 String 반환 ?
  for (let i = 0; i < spreadSheet.length; i++) {
    csv +=
      spreadSheet[i]
        .filter((item) => !item.isHeader)
        .map((item) => item.data)
        .join(",") + "\r\n";
  }

  // csv import
  // Blob 은 무슨 타입?
  const csvObj = new Blob([csv]);
  // [csvObj] -> 오류
  const csvUrl = URL.createObjectURL(csvObj);
  console.log("csv", csvUrl);

  // 해당 a는 어디에 생성되는 걸까? html에 추가되지 않고도 생명력을 지닌 것?
  const a = document.createElement("a");
  a.href = csvUrl;
  // .csv를 제거하면? -> txt 기본.
  a.download = "Exported Spreadsheet.csv";
  a.click();
};

// 키보드 방향키로 이동
// 참고: https://harui.tistory.com/171
function keyEvent(event, cell) {
  const keycode = event.keyCode;

  switch (keycode) {
    case 33: // PageUp
    case 34: // PageDown
      break;

    case 37: // Left
      if (cell.column == 1) {
        return false;
      } else {
        findCellEl(cell, -1, 0).focus();
      }
      break;
    case 38: // Up
      if (cell.row == 1) {
        return false;
      } else {
        findCellEl(cell, 0, -1).focus();
      }
      break;
    case 39: // Right
      if (cell.column == columns) {
        return false;
      } else {
        findCellEl(cell, 1, 0).focus();
      }
      break;

    case 13: // Down
    case 40:
      if (cell.row == rows) {
        return false;
      } else {
        findCellEl(cell, 0, 1).focus();
      }
      break;

    default:
      return false;
  }
}

function findCellEl(cell, column, row) {
  const columnName = alphabets[cell.column + column - 1];
  const rowName = cell.row + row;
  const El = getElFromRowCol(rowName, columnName);
  console.log(El);

  return El;
}
