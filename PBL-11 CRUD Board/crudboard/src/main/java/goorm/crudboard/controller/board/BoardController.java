package goorm.crudboard.controller.board;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import goorm.crudboard.service.board.dto.BoardAddDto;
import goorm.crudboard.service.board.dto.BoardListDto;
import goorm.crudboard.service.board.dto.BoardResponseDto;
import goorm.crudboard.service.board.dto.BoardUpdateDto;
import goorm.crudboard.service.board.BoardService;
import goorm.crudboard.service.board.entity.BoardEntity;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Controller
@RequestMapping("/board") //ResponseBody 사용
public class BoardController {

	// 왜 static X ?
	private final BoardService boardService;

	// @GetMapping("/")
	// @ResponseBody
	// public List<BoardListDto> findAll() {
	// 	return boardService.findAll();
	// }

	@GetMapping("/")
	@ResponseBody
	public Page<BoardListDto> findAll(@PageableDefault(size=5, sort="createdDate", direction = Sort.Direction.DESC) Pageable pageable) {
		return boardService.findAll(pageable);
	}

	@GetMapping("/{boardId}")
	@ResponseBody
	public BoardResponseDto findOne(@PathVariable("boardId") Long boardId) {
		return boardService.findOne(boardId);
	}

	@PostMapping("/add")
	// @ResponseBody
	public String save(@RequestBody BoardAddDto boardAddDto) {
		log.info("==============================boardAddDto={}", boardAddDto);
		log.info("==============================boardAddDto={}", boardAddDto.getCreatedDate());
		BoardResponseDto boardResponseDto = boardService.save(boardAddDto);

		log.info("==============================boardResponseDto.getCreatedDate()={}", boardResponseDto.getCreatedDate());


		Long boardId = boardResponseDto.getId();
		// return boardResponseDto;
		// return "redirect:/board/{boardId}";
		return "redirect:/board/" + boardId;
	}

	@PatchMapping("/{boardId}/update")
	//@Put X
	// @ResponseBody
	public String update(@RequestBody BoardAddDto boardAddDto,
		@PathVariable("boardId") Long boardId) {

		BoardUpdateDto boardUpdateDto = new BoardUpdateDto(boardId, boardAddDto.getTitle(), boardAddDto.getContent(), boardAddDto.getCreatedDate());

		boardService.update(boardUpdateDto);
		// return boardService.update(boardUpdateDto);
		return "redirect:/board/{boardId}";
	}

	@PatchMapping("/{boardId}/delete")
	// @ResponseBody
	public String delete(@PathVariable("boardId") Long boardId) {

		BoardResponseDto boardResponseDto = boardService.delete(boardId);
		// return boardResponseDto;
		return "redirect:/board/";
	}

}
