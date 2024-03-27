package goorm.responseerrormodel.responsetemplate.field;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class Status {

	//응답 데이터에서 status
	private int code;
	private String message;
}
