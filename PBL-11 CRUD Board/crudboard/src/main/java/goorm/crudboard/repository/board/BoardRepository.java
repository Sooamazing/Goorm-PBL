package goorm.crudboard.repository.board;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import goorm.crudboard.service.board.entity.BoardEntity;

// @Repository
public interface BoardRepository extends JpaRepository<BoardEntity, Long> {

}

