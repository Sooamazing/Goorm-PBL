package goorm.responseerrormodel.error;

import java.util.HashMap;
import java.util.LinkedHashMap;

import org.springframework.http.HttpStatus;

import goorm.responseerrormodel.responsetemplate.field.Data;

@lombok.Data
public class CustomException extends RuntimeException{

	private Data data;
	private ErrorCode errorCode;

	public CustomException() {
	}

	public CustomException(String message) {
		super(message);
	}

	public CustomException(String message, Throwable cause) {
		super(message, cause);
	}

	public CustomException(Throwable cause) {
		super(cause);
	}

	public CustomException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
	}

	//이렇게 생성자를 만드는 게 맞나?
	public CustomException(ErrorCode errorCode, String message, Data data) {
		super(message);
		this.errorCode = errorCode;
		this.data = data;
	}

}
