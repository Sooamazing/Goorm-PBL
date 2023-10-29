package goorm.crudboard.controller.board;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import goorm.crudboard.service.board.dto.BoardAddDto;
import goorm.crudboard.service.board.dto.BoardListDto;
import goorm.crudboard.service.board.dto.BoardResponseDto;
import goorm.crudboard.service.board.dto.BoardUpdateDto;
import goorm.crudboard.service.board.BoardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Controller
@RequestMapping("/board") //ResponseBody 사용
public class BoardController {

	// 왜 static X ?
	private final BoardService boardService;

	@GetMapping("/")
	@ResponseBody
	public List<BoardListDto> findAll() {
		return boardService.findAll();
	}

	@GetMapping("/{boardId}")
	@ResponseBody
	public BoardResponseDto findOne(@PathVariable("boardId") Long boardId) {
		return boardService.findOne(boardId);
	}

	@PostMapping("/add")
	// @ResponseBody
	public String save(@RequestBody BoardAddDto boardAddDto) {
		BoardResponseDto boardResponseDto = boardService.save(boardAddDto);
		Long boardId = boardResponseDto.getId();
		// return boardResponseDto;
		return "redirect:/board/{boardId}";
	}

	@PutMapping("/{boardId}/update")
	// @ResponseBody
	public String update(@RequestBody BoardAddDto boardAddDto,
		@PathVariable("boardId") Long boardId) {

		BoardUpdateDto boardUpdateDto = new BoardUpdateDto(boardId, boardAddDto.getTitle(), boardAddDto.getContents());

		boardService.update(boardUpdateDto);
		// return boardService.update(boardUpdateDto);
		return "redirect:/board/{boardId}";
	}

	@PutMapping("/{boardId}/delete")
	// @ResponseBody
	public String delete(@PathVariable("boardId") Long boardId) {

		BoardResponseDto boardResponseDto = boardService.delete(boardId);
		// return boardResponseDto;
		return "redirect:/board/";
	}

}
