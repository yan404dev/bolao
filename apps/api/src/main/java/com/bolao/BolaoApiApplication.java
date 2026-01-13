package com.bolao;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableAsync
@EnableScheduling
@SpringBootApplication
public class BolaoApiApplication {

    public static void main(String[] args) {
        String[] possiblePaths = { ".", "../../" };

        for (String path : possiblePaths) {
            try {
                io.github.cdimascio.dotenv.Dotenv dotenv = io.github.cdimascio.dotenv.Dotenv.configure()
                        .directory(path)
                        .ignoreIfMissing()
                        .load();

                dotenv.entries().forEach(entry -> {
                    if (System.getProperty(entry.getKey()) == null && System.getenv(entry.getKey()) == null) {
                        System.setProperty(entry.getKey(), entry.getValue());
                    }
                });
            } catch (Exception ignored) {
            }
        }

        SpringApplication.run(BolaoApiApplication.class, args);
    }
}
