package goorm.responseerrormodel.domain;

import java.util.HashMap;
import java.util.LinkedHashMap;

import org.springframework.http.HttpStatus;

public class CustomException extends RuntimeException{

	// 6등 이상일 경우 오류
		if (student.getGrade() > 5) {
		HashMap<String, Object> errorList = new LinkedHashMap<>();

		//status
		HashMap<String, String> statusList = new HashMap<>();
		statusList.put("code", String.valueOf(HttpStatus.BAD_REQUEST));
		statusList.put("message", "grade는 6 이상을 입력할 수 없습니다.");

		//data
		HashMap<String, Object> dataList = new HashMap<>();
		HashMap<String, String> maxList = new HashMap<>();
		maxList.put("maxGrade", "6");
		dataList.put("inputRestriction", maxList);

		errorList.put("status", statusList);
		errorList.put("datas", dataList);
		return errorList;
	}
}
