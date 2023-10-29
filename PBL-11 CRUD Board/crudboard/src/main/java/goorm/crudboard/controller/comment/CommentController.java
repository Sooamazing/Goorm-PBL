package goorm.crudboard.controller.comment;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import goorm.crudboard.service.comment.CommentService;
import goorm.crudboard.service.comment.dto.CommentAddDto;
import goorm.crudboard.service.comment.dto.CommentAddRequestDto;
import goorm.crudboard.service.comment.dto.CommentResponseDto;
import goorm.crudboard.service.comment.dto.CommentUpdateDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Controller
@RequestMapping("/board/{boardId}/comment")
public class CommentController {

	private final CommentService commentService;

	@PostMapping("/add")
	public String save(@PathVariable("boardId") Long boardId, @RequestBody CommentAddRequestDto commentAddRequestDto) {

		CommentAddDto commentAddDto = new CommentAddDto(boardId, commentAddRequestDto.getContent());

		CommentResponseDto save = commentService.save(commentAddDto);

		return "redirect:/board/{boardId}";
	}

	@PutMapping("/{commentId}/update")
	public String update(@PathVariable("boardId") Long boardId, @PathVariable("commentId") Long commentId,
		@RequestBody CommentAddRequestDto commentAddRequestDto) {

		CommentUpdateDto commentUpdateDto = new CommentUpdateDto(commentId, commentAddRequestDto.getContent(), boardId);

		CommentResponseDto update = commentService.update(commentUpdateDto);

		return "redirect:/board/{boardId}";
	}

	@PutMapping("/{commentId}/delete")
	public String delete(@PathVariable("boardId") Long boardId
		, @PathVariable("commentId") Long commentId) {

		commentService.delete(commentId);

		return "redirect:/board/{boardId}";
	}

}
