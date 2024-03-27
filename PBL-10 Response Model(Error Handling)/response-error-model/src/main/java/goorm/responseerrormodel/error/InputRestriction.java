package goorm.responseerrormodel.error;

import com.fasterxml.jackson.annotation.JsonInclude;

import goorm.responseerrormodel.domain.student.Student;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class InputRestriction {
	private Integer maxGrade;
	//여기에 maxGrade 넣으면 maxGrade 출력, noResult 넣으면 이거 출력되는 거 어떻게 구현하지? 예제에서는 maxGrade 넣으면 "6"까지 나왔는데...그렇게는 어떻게 하지?
	private Student noValue;

	public InputRestriction(int maxGrade) {
		this.maxGrade = maxGrade;
	}

	public InputRestriction(Student noValue) {
		this.noValue = noValue;
	}
}
