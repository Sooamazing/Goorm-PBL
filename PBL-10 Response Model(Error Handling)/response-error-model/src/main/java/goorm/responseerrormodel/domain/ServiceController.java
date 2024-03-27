package goorm.responseerrormodel.domain;

import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import goorm.responseerrormodel.domain.student.Grade;
import goorm.responseerrormodel.domain.student.Student;
import goorm.responseerrormodel.error.CustomException;
import goorm.responseerrormodel.error.ErrorCode;
import goorm.responseerrormodel.error.NoSearchResult;
import goorm.responseerrormodel.responsetemplate.ApiResponse;
import goorm.responseerrormodel.responsetemplate.CorrectResponse;
import goorm.responseerrormodel.responsetemplate.field.Data;
import goorm.responseerrormodel.responsetemplate.ErrorResponse;
import goorm.responseerrormodel.error.InputRestriction;
import goorm.responseerrormodel.responsetemplate.field.Metadata;
import goorm.responseerrormodel.responsetemplate.field.Status;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
// @RequestMapping("/*")
@AllArgsConstructor
public class ServiceController<T> {

	private final StudentRepositoryImpl store;

	//CustomException.class일 때 에러 터지는 거 핸들러
	//class로 발생하는 거라서 메시지를 따로
	//Astract class로! 베이스 만들기! 베이스는 가급적 안 쓰려고 하는 ㄱ고 그냥 묶으려고 하는 거임.
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(CustomException.class)
	public ApiResponse customExceptionHandler(HttpServletResponse response, CustomException e){

		//CustomException 이것도 생성자 안 넣어서 오류났음.
		Status status = new Status(e.getErrorCode().getCode(), e.getErrorCode().getMessage());

		log.info("state={}", status);
		//response.setStatus //응답값 TODO
		return new ErrorResponse(status,e.getData());

	}

	@PostMapping("/add")
	// @ExceptionHandler(CustomException.class)
	public ApiResponse<Student> join(@RequestBody Student student) {

		// 원래는 컨트롤러보다 서비스 레벨에 있는 게 좋음.
		// 5 초과인 경우 MAX_ERROR
		if (student.getGrade() > 5) {
			throw new CustomException(ErrorCode.MAX_ERROR, ErrorCode.MAX_ERROR.getMessage(),new Data(new InputRestriction(6))  );
		}

		//grade 입력하지 않은 경우
		if(student.getGrade()==null || student.getGrade()<= 0){
			throw new CustomException(ErrorCode.VALIDATION_ERROR, ErrorCode.VALIDATION_ERROR.getMessage(),new Data(new InputRestriction(student))  );
		}

		//name 입력하지 않은 경우
		if(student.getName()==null){
			throw new CustomException(ErrorCode.VALIDATION_ERROR, ErrorCode.VALIDATION_ERROR.getMessage(),new Data(new InputRestriction(student))  );
		}
		// 6등 미만일 경우 정상 출력
		store.save(student);

		//status만 출력되는 오류 ㅠㅠ
		//return ApiResponse<Student>로 한 경우 status만 출력 X 이게 아니었음.
		//CorrectResponse에 @Data를 넣지 않아서... status만 출력됐음!!!!!!! 왱지??????
		return makeResponse(student);
	}

	@GetMapping("/students")
	public ApiResponse<List<Student>> findStudents() {
		return makeResponse(store.findAll());
	}


	//이걸 합칠 수는 없나? value={} 이거로?
	@GetMapping("/student")
	public ApiResponse<Student> findOne(@RequestBody Optional<Grade> grade) {
		//@RequestBody Integer grade -> 오류! 아무리 검색해도 한 개를 따로 받는 게 없어서 Grade 클래스 생성.
		// log.info("grade={}", grade);

		//grade를 입력하지 않았을 경우
		if(grade==null){
			throw new CustomException(ErrorCode.VALIDATION_ERROR, ErrorCode.VALIDATION_ERROR.getMessage(), new Data(new NoSearchResult(0)));
			//null이면 유효한 숫자 입력하라는 게 더 적절할 듯?
			//NoSearchResult에 NoArgsConductor 추가해서 오류 사라짐. 왜지?
		}
		Optional<Student> findStudent = store.findByGrade(grade.get().getGrade());
		//Optional 사용법 익히기..!
		// log.info("findStudent={}", findStudent);
		if(findStudent.isEmpty()){
			throw new CustomException(ErrorCode.VALIDATION_ERROR, ErrorCode.VALIDATION_ERROR.getMessage(), new Data(new NoSearchResult(grade.get().getGrade())));
		}
		return makeResponse(store.findByGrade(grade.get().getGrade()).get());
	}
	@GetMapping("/student/{grade}")
	public ApiResponse<Student> findOne(@PathVariable Integer grade) {
		//@RequestBody Integer grade -> 오류! 아무리 검색해도 한 개를 따로 받는 게 없어서 Grade 클래스 생성.

		Optional<Student> findStudent = store.findByGrade(grade);
		if(findStudent.isEmpty()){
			throw new CustomException(ErrorCode.VALIDATION_ERROR, ErrorCode.VALIDATION_ERROR.getMessage(), new Data(new NoSearchResult(grade)));
		}

		return makeResponse(store.findByGrade(grade).get());
	}

	//makeResponse 내부적으로 동작하는 거니까 private 권장.
	private ApiResponse<Student> makeResponse(Student result) {
		Status status = new Status(ErrorCode.OK.getCode(), ErrorCode.OK.getMessage());
		Metadata metadata = new Metadata(store.size());

		return new CorrectResponse<>(status, metadata, result);
	}

	public ApiResponse<List<Student>> makeResponse(List<Student> result) {
		//그냥 없애고 상기 Student 메서드를 T로 했더니 오류, T는... 메서드에서는 사용 못 하나 봐....
		Status status = new Status(ErrorCode.OK.getCode(), ErrorCode.OK.getMessage());
		Metadata metadata = new Metadata(store.size());

		return new CorrectResponse<>(status, metadata, result);
	}

}
