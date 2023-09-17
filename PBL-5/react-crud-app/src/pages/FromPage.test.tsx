import { render, screen } from "@testing-library/react";
import FormPage from "./FormPage";
import Calculator from "../components/Calculator";

// test("합계 계산", ()=>{
//   render(<Calculator />);
//   const calcul = screen.getByRole()
// })
// test("제출 후 알림, 목록 생성 및 총 지출 확인", () => {
//   render(<FormPage />);
//   const inputCategory = screen.getByRole("textbox", {
//     name: "지출 항목",
//   });
//   const inputMoney = screen.getByRole("textbox", {
//     name: "비용",
//   });
//   const submitBtn = screen.getByRole("button", {
//     name: "수정",
//   });
//   const deleteAllBtn = screen.getByRole("button", {
//     name: "목록 지우기",
//   });
//   const editBtn = screen.getByRole("button", {
//     name: "edit",
//   });
//   const deletBtn = screen.getByRole("button", {
//     name: "X",
//   });
// });

// test("수정 후 알림 및 목록에서 내용 수정됐는지 확인", () => {
//   render(<FormPage />);
//   const inputCategory = screen.getByRole("textbox", {
//     name: "지출 항목",
//   });
//   const inputMoney = screen.getByRole("textbox", {
//     name: "비용",
//   });
//   const submitBtn = screen.getByRole("button", {
//     name: "수정",
//   });
//   const deleteAllBtn = screen.getByRole("button", {
//     name: "목록 지우기",
//   });
//   const editBtn = screen.getByRole("button", {
//     name: "edit",
//   });
//   const deletBtn = screen.getByRole("button", {
//     name: "X",
//   });
// });

// test("All 포함 삭제 후 알림 및 삭제한 내용 반영됐는지 확인", () => {
//   render(<FormPage />);
//   const inputCategory = screen.getByRole("textbox", {
//     name: "지출 항목",
//   });
//   const inputMoney = screen.getByRole("textbox", {
//     name: "비용",
//   });
//   const submitBtn = screen.getByRole("button", {
//     name: "수정",
//   });
//   const deleteAllBtn = screen.getByRole("button", {
//     name: "목록 지우기",
//   });
//   const editBtn = screen.getByRole("button", {
//     name: "edit",
//   });
//   const deletBtn = screen.getByRole("button", {
//     name: "X",
//   });
// });
