package goorm.responseerrormodel.responsetemplate.field;

import com.fasterxml.jackson.annotation.JsonInclude;

import goorm.responseerrormodel.error.InputRestriction;
import goorm.responseerrormodel.error.NoSearchResult;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@lombok.Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Data {
	private InputRestriction inputRestriction;
	private NoSearchResult noSearchResult;

	public Data(NoSearchResult noSearchResult) {
		this.noSearchResult = noSearchResult;
	}

	public Data(InputRestriction inputRestriction) {
		this.inputRestriction = inputRestriction;
	}
}
