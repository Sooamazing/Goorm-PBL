package goorm.responseerrormodel.domain.student;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Student {

	private Integer grade; //null일 수도 있으니까?
	private String name;

}
