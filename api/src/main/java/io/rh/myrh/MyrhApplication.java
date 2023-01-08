package io.rh.myrh;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.PropertySource;

@SpringBootApplication
public class MyrhApplication {
    public static void main(String[] args) {
       SpringApplication.run(MyrhApplication.class, args);
    }

}
