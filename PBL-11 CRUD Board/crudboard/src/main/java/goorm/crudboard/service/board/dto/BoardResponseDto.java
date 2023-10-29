package goorm.crudboard.service.board.dto;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import goorm.crudboard.service.board.entity.BoardEntity;
import goorm.crudboard.service.comment.dto.CommentResponseDto;
import goorm.crudboard.service.comment.entity.CommentEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class BoardResponseDto {
	private Long id;
	private String title;
	private String content;
	//CommentResponseDto 반환하도록 정정해야 함. -> Entity로 했더니 무한 순환 경험 완료^_^!!!!!!!!
	private List<CommentResponseDto> comments = new ArrayList<>();

	public BoardResponseDto(BoardEntity boardEntity) {
		this.id = boardEntity.getId();
		this.title = boardEntity.getTitle();
		this.content = boardEntity.getContent();
		this.comments = boardEntity.getComments().stream().map(t -> new CommentResponseDto(t)).collect(Collectors.toList());
	}


}