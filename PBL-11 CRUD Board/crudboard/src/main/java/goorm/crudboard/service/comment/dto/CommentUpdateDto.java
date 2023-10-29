package goorm.crudboard.service.comment.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class CommentUpdateDto {

	private Long id;
	private String content;
	private Long boardId;

}