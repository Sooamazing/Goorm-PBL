package goorm.responseerrormodel.responsetemplate;

import goorm.responseerrormodel.responsetemplate.field.Metadata;
import goorm.responseerrormodel.responsetemplate.field.Status;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Data
public class CorrectResponse<T> extends ApiResponse<T> {
	private Metadata metadata; //resultCount
	// private List<T> results; //Students list
	// private T result;
	//제네릭을 다시 한번 생각하기 !
	// Student, List<Student> 로 제네릭에 됨 ㅇㅇ
	//에러인 경우 출력 ㄴㄴ
	private T results;

	public CorrectResponse(Status status, Metadata metadata, T results) {
		super(status);
		this.metadata = metadata;
		this.results = results;
	}
}
