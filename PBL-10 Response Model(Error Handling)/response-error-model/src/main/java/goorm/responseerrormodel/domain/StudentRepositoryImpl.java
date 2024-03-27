package goorm.responseerrormodel.domain;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.stereotype.Repository;

import goorm.responseerrormodel.domain.student.Student;

@Repository
// @RequiredArgsConstructor
public class StudentRepositoryImpl {

	//repository가 생성 안 됐다고 했는데.. 왜일까? .. .바꾼 것도 없는데...
	private final static Map<Integer, Student> store = new HashMap<>();

	public Student save(Student student) {
		store.put(student.getGrade(), student);
		return student;
	}

	public List<Student> findAll() {
		return new ArrayList<>(store.values());
	}

	public Optional<Student> findByGrade(Integer grade) {

		// List<Student> allStudent = findAll();
		// Optional<Student> findStudent = allStudent.stream().filter(one -> one.getGrade().equals(grade)).findAny();

		return Optional.ofNullable(store.get(grade));
	}
	public int size(){
		return store.size();
	}
}
