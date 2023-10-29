package goorm.crudboard.service.board.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import goorm.crudboard.service.comment.entity.CommentEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table
@NoArgsConstructor
@Getter
public class BoardEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String title;
	private String content;
	private boolean isDeleted;

	// @JsonManagedReference
	@OneToMany(mappedBy="board", cascade = CascadeType.REMOVE)
	private List<CommentEntity> comments = new ArrayList<>();

	public void saveComment(CommentEntity comment){
		this.getComments().add(comment); // get으로 저장해야 하는 점 조심! 피드 직접 이용 X!
		comment.setBoard(this);
	}
	public void updateComment(CommentEntity comment){
		int index = this.getComments().indexOf(comment);
		this.getComments().set(index, comment); // get으로 저장해야 하는 점 조심! 피드 직접 이용 X!
		comment.setBoard(this);
	}

	public void deleteComment(CommentEntity comment){
		this.getComments().remove(comment); // get으로 저장해야 하는 점 조심! 피드 직접 이용 X!
		comment.setBoard(this);
	}

	public BoardEntity(String title, String content) {
		this.title = title;
		this.content = content;
		this.isDeleted = false;
		this.comments = null;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public void setDeleted(boolean deleted) {
		isDeleted = deleted;
	}

	public void setComments(List<CommentEntity> comments) {
		this.comments = comments;
	}
}
