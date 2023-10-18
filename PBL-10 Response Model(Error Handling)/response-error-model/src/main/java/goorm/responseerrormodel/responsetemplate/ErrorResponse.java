package goorm.responseerrormodel.responsetemplate;

import goorm.responseerrormodel.responsetemplate.field.Data;
import goorm.responseerrormodel.responsetemplate.field.Status;

@lombok.Data
public class ErrorResponse extends ApiResponse {

	private Data data; //에러일 때만 포함 //inputRestriction - maxGrade

	public ErrorResponse(Status status, Data data) {
		super(status);
		this.data = data;
	}
}
