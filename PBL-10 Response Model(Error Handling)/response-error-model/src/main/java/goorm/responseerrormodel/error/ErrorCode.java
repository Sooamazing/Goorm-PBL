package goorm.responseerrormodel.error;

import lombok.Getter;

@Getter
public enum ErrorCode {

	OK(200, "OK"),
	VALIDATION_ERROR(5010, "유효하지 않은 값입니다."),
	MAX_ERROR(5000, "6 이상으로 입력할 수 없습니다.");

	private int code;
	private String message;

	ErrorCode(int code, String message) {
		this.code = code;
		this.message = message;
	}

}
