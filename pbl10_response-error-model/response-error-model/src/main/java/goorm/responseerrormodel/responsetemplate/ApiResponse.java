package goorm.responseerrormodel.responsetemplate;

import goorm.responseerrormodel.responsetemplate.field.Status;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
// @Component //singleton으로 관리하는 거 아니고 게속 객체로 사용할 거라서 빈 등록 X
public abstract class ApiResponse<T> {

	//응답 상태는 보통 코드, 메시지로 관리
	private Status status; //모두 포함 //code, message

	public ApiResponse(Status status) {
		this.status = status;
	}
}
