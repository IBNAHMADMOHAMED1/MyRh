package io.rh.myrh.exeptions;

import io.rh.myrh.dto.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

@ControllerAdvice
public class CustomExceptionHandler {
    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<ErrorResponse> handleMethodArgumentTypeMismatch(MethodArgumentTypeMismatchException ex) {
        ErrorResponse error = new ErrorResponse();
        error.setSuccess(false);
        error.setMessage("Invalid value passed for " + ex.getName() + ". Expected " + ex.getRequiredType().getSimpleName() + " but got " + ex.getValue());
        return new ResponseEntity<>(error, HttpStatus.OK);
    }
}
