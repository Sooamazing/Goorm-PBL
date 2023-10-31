package goorm.crudboard.repository.board;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import goorm.crudboard.service.board.entity.BoardEntity;

// @Repository
public interface BoardRepository extends JpaRepository<BoardEntity, Long> {


	@EntityGraph(attributePaths = "comments") // 콜렉션 타입을 EntityGraph를 이용 @Override Optional<Board> findById(Long id);
	@Override
	Optional<BoardEntity> findById(Long aLong);

	@Query("select b from BoardEntity b where b.isDeleted = false")
	@Override
	Page<BoardEntity> findAll(Pageable pageable);

	// 페이징
	// Page<BoardEntity> findByBoardEntityOrderByCreatedDateDesc(BoardEntity boardEntity, Pageable pageable);

}

