package goorm.crudboard.service.comment.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

import goorm.crudboard.service.board.entity.BoardEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table
@Getter
@NoArgsConstructor
public class CommentEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="COMMENT_ID")
	private Long id;

	private String content;
	private boolean isDeleted;

	// @JsonBackReference
	@ManyToOne(fetch = FetchType.LAZY)
	private BoardEntity board;

	public CommentEntity(String content) {
		this.content = content;
		this.isDeleted=false;
	}

	public void setBoard(BoardEntity board) {
		this.board = board;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public void setDeleted(boolean deleted) {
		isDeleted = deleted;
	}
}
