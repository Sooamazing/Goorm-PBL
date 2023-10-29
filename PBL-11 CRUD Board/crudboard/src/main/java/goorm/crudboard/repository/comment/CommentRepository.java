package goorm.crudboard.repository.comment;

import org.springframework.data.jpa.repository.JpaRepository;

import goorm.crudboard.service.board.dto.BoardResponseDto;
import goorm.crudboard.service.board.entity.BoardEntity;
import goorm.crudboard.service.comment.dto.CommentResponseDto;
import goorm.crudboard.service.comment.entity.CommentEntity;

public interface CommentRepository extends JpaRepository<CommentEntity, Long> {

}