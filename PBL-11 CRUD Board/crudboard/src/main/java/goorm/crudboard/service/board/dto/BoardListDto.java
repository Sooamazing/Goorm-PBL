package goorm.crudboard.service.board.dto;

import java.time.LocalDateTime;

import net.bytebuddy.asm.Advice;

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
	private LocalDateTime createdDate;
	private LocalDateTime lastModifiedDate;

	//static........왜지...?.....setter...?........
	public static BoardListDto convert(BoardEntity boardEntity){
		return new BoardListDto(boardEntity.getId(), boardEntity.getTitle(), boardEntity.getCreatedDate(), boardEntity.getLastModifiedDate());
	}

}
