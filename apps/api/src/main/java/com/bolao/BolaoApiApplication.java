package com.bolao;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BolaoApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(BolaoApiApplication.class, args);
        System.out.println("🚀 Bolao API running at http://localhost:3001");
    }
}
