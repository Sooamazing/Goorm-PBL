package goorm.crudboard.service.comment;

import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.stereotype.Service;

import goorm.crudboard.repository.comment.CommentRepository;
import goorm.crudboard.service.board.BoardService;
import goorm.crudboard.service.board.entity.BoardEntity;
import goorm.crudboard.service.comment.dto.CommentAddDto;
import goorm.crudboard.service.comment.dto.CommentResponseDto;
import goorm.crudboard.service.comment.dto.CommentUpdateDto;
import goorm.crudboard.service.comment.entity.CommentEntity;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
// @NoArgsConstructor // 왜 이게 있으면 안 될까? 빈 주입 관련일 거 같은데. 아 ... final?
@RequiredArgsConstructor
public class CommentService {

	private final BoardService boardService;
	private final CommentRepository commentRepository;


	public CommentResponseDto save(CommentAddDto commentAddDto) {

		Long boardId = commentAddDto.getBoardId();

		BoardEntity boardEntity = boardService.findEntity(boardId).orElseThrow(() -> new NoSuchElementException());

		CommentEntity commentEntity = new CommentEntity(commentAddDto.getContent());
		boardEntity.saveComment(commentEntity);

		commentRepository.save(commentEntity);

		CommentResponseDto commentResponseDto = new CommentResponseDto(
			commentEntity);

		return commentResponseDto;
	}

	public CommentResponseDto update(CommentUpdateDto commentUpdateDto) {

		Long commentId = commentUpdateDto.getId();
		Optional<BoardEntity> boardEntity = boardService.findEntity(commentUpdateDto.getBoardId());
		//boardId 관계없이 유일한 걸 보장하는 거겠찌? ... 신기하네...
		Optional<CommentEntity> commentEntity = commentRepository.findById(commentId);

		commentEntity.ifPresent(t -> {

			//삭제된 거면 불가
			if (commentEntity.get().isDeleted()) {
				return;
			}

			if (commentUpdateDto.getContent() != null) {
				t.setContent(commentUpdateDto.getContent());
			}

			this.commentRepository.save(t);
			boardEntity.get().updateComment(t);

		});

		return new CommentResponseDto(commentEntity.get());

	}



	public CommentResponseDto delete(Long commentId) {

		CommentEntity entity = findEntity(commentId);
		entity.setDeleted(true);
		entity.getBoard().deleteComment(entity);

		//...삭제가 안 되던 게... save를 안 해줘라니..!... 왜지? 변경 감지는 .. 아닌 건가?
		//아... db에 날려야... 영속성 컨텍스트에 올라가나? ...
		//엔티티에 날리는 건 안 되는??
		commentRepository.save(entity);

		return new CommentResponseDto(entity);
	}

	public CommentEntity findEntity(Long commentId) {
		return commentRepository.findById(commentId).get();
	}
}
