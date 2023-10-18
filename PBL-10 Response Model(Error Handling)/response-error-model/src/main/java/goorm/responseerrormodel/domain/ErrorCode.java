package goorm.responseerrormodel.domain;

import lombok.Getter;

@Getter
public enum ErrorCode {
	MAX_ERROR(500, "6 미만이어야 합니다.");

	private int code;
	private String message;

	ErrorCode(int code, String message) {
		this.code = code;
		this.message = message;
	}

}
