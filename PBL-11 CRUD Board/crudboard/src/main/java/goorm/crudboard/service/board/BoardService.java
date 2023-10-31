package goorm.crudboard.service.board;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import goorm.crudboard.repository.board.BoardRepository;
import goorm.crudboard.repository.comment.CommentRepository;
import goorm.crudboard.service.board.dto.BoardAddDto;
import goorm.crudboard.service.board.dto.BoardListDto;
import goorm.crudboard.service.board.dto.BoardResponseDto;
import goorm.crudboard.service.board.dto.BoardUpdateDto;
import goorm.crudboard.service.board.entity.BoardEntity;
import goorm.crudboard.service.comment.dto.CommentResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional // 어떤  타입 애노테이션이 맞는지? javax 였나?
public class BoardService {

	private final BoardRepository boardRepository;
	private final CommentRepository commentRepository;
	// private final CommentService commentService;
	// 아... 서로의 서비스를 바라보면 순환참조구나.

	public BoardResponseDto save(BoardAddDto boardAddDto) {

		BoardEntity boardEntity = new BoardEntity(
			boardAddDto.getTitle(), boardAddDto.getContent(), boardAddDto.getCreatedDate(), null);

		log.info("=========boardEntity.getCreatedDate()={}", boardEntity.getCreatedDate());
		boardRepository.save(boardEntity);
		BoardResponseDto boardResponseDto = new BoardResponseDto(boardEntity.getId(), boardEntity.getTitle(),
			boardEntity.getContent(), boardEntity.getCreatedDate(), null, null);
		log.info("boardResponseDto.getCreatedDate() ={}", boardResponseDto.getCreatedDate());
		return boardResponseDto;
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
			t.setLastModifiedDate(boardUpdateDto.getLastModifiedDate());
			this.boardRepository.save(t);

		});

		//get으로 안 꺼내는 좋은 방법? ㅠㅠ
		return new BoardResponseDto(boardById.get());
	}

	public BoardResponseDto delete(Long id) {
		BoardEntity boardEntity = boardRepository.findById(id).orElseThrow();

		boardEntity.setDeleted(true);

		// 하기 리스트를 대체
		commentRepository.isDeleteCommentTrue(id);
		// for(CommentEntity item:boardEntity.get().getComments() ){
		// 	item.setDeleted(true);
		// }

		//근데 board는 save 안 했는데 어떻게 저장이 되지..?
		// boardRepository.save(boardEntity.get());

		// 이건 왜 안 되지? ㅠㅠㅠ
		// boardEntity.get().getComments().stream()
		// 			.map(c->c.setDeleted(true));

		return new BoardResponseDto(boardEntity);
	}

	// public List<BoardListDto> findAll() {
	//
	// 	//엔티티 -> BoardListDto List로 변환해야 함!
	// 	List<BoardListDto> boardEntityList = boardRepository.findAll()
	// 		.stream()
	// 		.filter(board -> board.isDeleted() == false)
	// 		.map(t -> new BoardListDto(t.getId(), t.getTitle(), t.getCreatedDate(), t.getLastModifiedDate()))
	// 		.collect(
	// 			Collectors.toList());
	//
	// 	return boardEntityList;
	// }

	public Page<BoardListDto> findAll(Pageable pageable) {

		Page<BoardEntity> boardEntityPage = boardRepository.findAll(pageable);
		Page<BoardListDto> map = boardEntityPage
			.map(
			(t -> new BoardListDto(t.getId(), t.getTitle(), t.getCreatedDate(), t.getLastModifiedDate())));

		return map;
	}

	public BoardResponseDto findOne(Long id) {

		Optional<BoardEntity> boardEntity = boardRepository.findById(id);
		BoardResponseDto boardResponseDto = new BoardResponseDto();
		if (boardEntity.get().isDeleted()) {
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
			boardResponseDto.setCreatedDate(boardEntity.get().getCreatedDate());
			boardResponseDto.setLastModifiedDate(boardEntity.get().getLastModifiedDate());

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
