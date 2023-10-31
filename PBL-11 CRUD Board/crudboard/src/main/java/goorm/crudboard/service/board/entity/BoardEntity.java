package goorm.crudboard.service.board.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.BatchSize;
import org.hibernate.annotations.Where;
import org.springframework.data.annotation.LastModifiedDate;

import goorm.crudboard.service.BaseEntity;
import goorm.crudboard.service.comment.entity.CommentEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table
@NoArgsConstructor
@Getter
// @Where(clause = "isDeleted=false")
public class BoardEntity extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String title;
	private String content;
	private boolean isDeleted;

	// @JsonManagedReference

	@BatchSize(size = 5)
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

	public BoardEntity(String title, String content, LocalDateTime createDate, LocalDateTime lastModifiedDate) {
		this.title = title;
		this.content = content;
		this.isDeleted = false;
		this.comments = null;

		//BaseEntity를 여기서 쓰는 게 맞나?
		this.setCreatedDate(createDate);
		this.setLastModifiedDate(lastModifiedDate);
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
