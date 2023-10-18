package goorm.responseerrormodel.domain;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
// @RequestMapping("/*")
@AllArgsConstructor
public class ServiceController<T> {

	private final StudentRepositoryImpl store;

	@GetMapping("/add")
	@ExceptionHandler(CustomException.class)
	public ApiResponse<Student> join(@RequestBody Student student) {

		if (student.getGrade() > 5) {
			throw new CustomException();
		}
		// 6등 미만일 경우 정상 출력

		store.save(student);
		return makeResponse(student);
	}

	@GetMapping("/students")
	public ApiResponse<Student>  findStudents() {
		return makeResponse(store.findAll());
	}

	@GetMapping("/student")
	public ApiResponse<Student>  findOne(@RequestBody Grade grade) {
		//@RequestBody Integer grade -> 오류! 아무리 검색해도 한 개를 따로 받는 게 없어서 Grade 클래스 생성.
		return makeResponse(store.findByGrade(grade.getGrade()));
	}

	//makeResponse 내부적으로 동작하는 거니까 private 권장.
	private ApiResponse<Student> makeResponse(Student result) {
		int code = 2000;

		//status
		HashMap<String, String> statusList = new HashMap<>();
		statusList.put("code", String.valueOf(code));
		statusList.put("message", "grade는 6 이상을 입력할 수 없습니다.");

		//metadata
		Map<String, Integer> metadataMap = new HashMap<>();
		metadataMap.put("resultCount", store.size());

		return new ApiResponse<Student> (statusList,metadataMap,result);
	}

	public ApiResponse<Student> makeResponse(List<Student> result) {
		int code = 2000;

		return new ApiResponse<Student> (code,store.size(),result);
	}

}
