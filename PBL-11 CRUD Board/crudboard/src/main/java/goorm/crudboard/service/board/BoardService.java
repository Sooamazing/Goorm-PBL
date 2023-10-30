package goorm.crudboard.service.board;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import goorm.crudboard.repository.board.BoardRepository;
import goorm.crudboard.service.board.dto.BoardAddDto;
import goorm.crudboard.service.board.dto.BoardListDto;
import goorm.crudboard.service.board.dto.BoardResponseDto;
import goorm.crudboard.service.board.dto.BoardUpdateDto;
import goorm.crudboard.service.board.entity.BoardEntity;
import goorm.crudboard.service.comment.dto.CommentResponseDto;
import goorm.crudboard.service.comment.entity.CommentEntity;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional // 어떤  타입 애노테이션이 맞는지? javax 였나?
public class BoardService {

	private final BoardRepository boardRepository;
	// private final CommentService commentService;
	// 아... 서로의 서비스를 바라보면 순환참조구나.

	public BoardResponseDto save(BoardAddDto boardAddDto) {

		BoardEntity boardEntity = new BoardEntity(
			boardAddDto.getTitle(), boardAddDto.getContents());
		boardRepository.save(boardEntity);
		//comments 추가해야 함!
		return new BoardResponseDto(boardEntity.getId(), boardEntity.getTitle(), boardEntity.getContent(), null);
	}

	public BoardResponseDto update(BoardUpdateDto boardUpdateDto) {
		Optional<BoardEntity> boardById = boardRepository.findById(boardUpdateDto.getId());

		// BoardEntity newboardEntity = new BoardEntity(boardUpdateDto.getId(), boardUpdateDto.getTitle(),
		// 	boardUpdateDto.getContents(), boardById.get().getComments());

		//옵셔널에서 get으로 바로 꺼내는 방법 말고 공부하기!
		boardById.ifPresent(t -> {

			//삭제된 거면 불가
			if (boardById.get().isDeleted()) {
				return;
			}

			if (boardUpdateDto.getTitle() != null) {
				t.setTitle(boardUpdateDto.getTitle());
			}
			if (boardUpdateDto.getContents() != null) {
				t.setContent(boardUpdateDto.getContents());
			}
			this.boardRepository.save(t);

		});

		//get으로 안 꺼내는 좋은 방법? ㅠㅠ
		return new BoardResponseDto(boardById.get());
	}

	public BoardResponseDto delete(Long id) {
		Optional<BoardEntity> boardEntity = boardRepository.findById(id);

		//orElseThrow로 처리해 보기.
		if (boardEntity.isPresent()) {
			boardEntity.get().setDeleted(true);
		}
		for(CommentEntity item:boardEntity.get().getComments() ){
			item.setDeleted(true);
		}

		//근데 board는 save 안 했는데 어떻게 저장이 되지..?
		// boardRepository.save(boardEntity.get());


		// 이건 왜 안 되지? ㅠㅠㅠ
		// boardEntity.get().getComments().stream()
		// 			.map(c->c.setDeleted(true));

		return new BoardResponseDto(boardEntity.get());
	}

	public List<BoardListDto> findAll() {

		//엔티티 -> BoardListDto List로 변환해야 함!
		List<BoardListDto> boardEntityList = boardRepository.findAll()
			.stream()
			.filter(board -> board.isDeleted() == false)
			.map(t -> new BoardListDto(t.getId(), t.getTitle()))
			.collect(
				Collectors.toList());

		return boardEntityList;
	}

	public BoardResponseDto findOne(Long id) {

		Optional<BoardEntity> boardEntity = boardRepository.findById(id);
		BoardResponseDto boardResponseDto = new BoardResponseDto();
		if(boardEntity.get().isDeleted()){
			return null;
		}
		// List<CommentResponseDto> commentResponseDtoList = commentService.findCommentResponseDto(
		// 	boardById.get().getId());

		//옵셔널 아닌 형태로 반환
		//CommentList에서 CommentEntity 아닌 Dto 들어가 있도록.
		boardEntity.ifPresent(t -> {
			boardResponseDto.setId(boardEntity.get().getId());
			boardResponseDto.setContent(boardEntity.get().getContent());
			boardResponseDto.setTitle(boardEntity.get().getTitle());

			List<CommentResponseDto> commentResponseDtoList = boardEntity.get()
				.getComments()
				.stream()
				.filter(c -> !c.isDeleted())
				.map(item -> new CommentResponseDto(item))
				.collect(Collectors.toList());

			boardResponseDto.setComments(commentResponseDtoList);

		});

		return boardResponseDto;
	}

	public Optional<BoardEntity> findEntity(Long boardId) {
		return boardRepository.findById(boardId);
	}
}