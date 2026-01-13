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

        // Debug: Log database connection info
        System.out.println("========== DATABASE CONNECTION DEBUG ==========");
        System.out.println("PGHOST: " + maskValue(System.getenv("PGHOST")));
        System.out.println("PGPORT: " + System.getenv("PGPORT"));
        System.out.println("PGDATABASE: " + System.getenv("PGDATABASE"));
        System.out.println("PGUSER: " + maskValue(System.getenv("PGUSER")));
        System.out.println("DATABASE_URL set: " + (System.getenv("DATABASE_URL") != null ? "YES" : "NO"));
        System.out.println("===============================================");

        SpringApplication.run(BolaoApiApplication.class, args);
        System.out.println("🚀 Bolao API running at http://localhost:3001");
    }

    private static String maskValue(String value) {
        if (value == null)
            return "null";
        if (value.length() <= 4)
            return "****";
        return value.substring(0, 4) + "****";
    }
}
