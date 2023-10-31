package goorm.crudboard.service.board.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter //이게 있어야 파람에서 받는 게 맞지.. 그치...
public class BoardUpdateDto {
	private Long id;
	private String title;
	private String contents;
	private LocalDateTime lastModifiedDate = LocalDateTime.now();

}