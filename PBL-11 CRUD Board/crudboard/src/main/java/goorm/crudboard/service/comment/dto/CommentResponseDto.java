package goorm.crudboard.service.comment.dto;

import javax.persistence.ManyToOne;

import goorm.crudboard.service.board.dto.BoardResponseDto;
import goorm.crudboard.service.board.entity.BoardEntity;
import goorm.crudboard.service.comment.entity.CommentEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class CommentResponseDto {

	private Long id;
	private String content;
	// private BoardResponseDto board;

	public CommentResponseDto(CommentEntity commentEntity) {
		this.id = commentEntity.getId();
		this.content = commentEntity.getContent();
	}
}
