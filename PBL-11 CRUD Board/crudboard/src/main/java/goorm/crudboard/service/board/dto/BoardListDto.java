package goorm.crudboard.service.board.dto;

import goorm.crudboard.service.board.entity.BoardEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;



@NoArgsConstructor
@AllArgsConstructor
@Getter
public class BoardListDto {
	private Long id;
	private String title;

	//static........왜지...?.....setter...?........
	public static BoardListDto convert(BoardEntity boardEntity){
		return new BoardListDto(boardEntity.getId(), boardEntity.getTitle());
	}

}
