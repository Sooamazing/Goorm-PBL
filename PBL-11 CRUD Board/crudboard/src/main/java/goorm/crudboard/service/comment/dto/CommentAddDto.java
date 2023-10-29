package goorm.crudboard.service.comment.dto;

import goorm.crudboard.service.board.dto.BoardResponseDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class CommentAddDto {

	private Long boardId;
	private String content;

}