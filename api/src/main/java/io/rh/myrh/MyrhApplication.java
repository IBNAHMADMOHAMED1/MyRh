package io.rh.myrh;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.PropertySource;

@SpringBootApplication
@PropertySource("classpath:application.properties")
public class MyrhApplication {

    @Value("${JWT_SECRET_KEY}")
    public static String SECRET_KEY;
    public static void main(String[] args) {
        System.out.println(SECRET_KEY);
//        SpringApplication.run(MyrhApplication.class, args);
    }

}
