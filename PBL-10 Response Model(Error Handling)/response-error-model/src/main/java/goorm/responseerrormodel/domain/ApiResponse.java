package goorm.responseerrormodel.domain;
import java.util.HashMap;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Component
public class ApiResponse<T> {

	private List<Object> status; //모두 포함 //code, message
	private List<Object> metadata; //resultCount
	private List<T> results; //Students list
	private T result;
	private List<Object> data; //에러일 때만 포함 //inputRestriction - maxGrade

	public ApiResponse(List<Object> status, List<Object> metadata, List<T> results) {
		this.status = status;
		this.metadata = metadata;
		this.results = results;
	}

	public ApiResponse(List<Object> status, List<Object> metadata, T result) {
		this.status = status;
		this.metadata = metadata;
		this.result = result;
	}

	public ApiResponse(List<Object> status, List<Object> data) {
		this.status = status;
		this.data = data;
	}

}
