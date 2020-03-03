package de.sakul6499.backend;

import de.sakul6499.backend.data.MongoSettings;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Collections;

@SpringBootApplication
public class Backend {

    public static MongoSettings MONGO_SETTINGS = MongoSettings.AutoConfig();

    public static void main(String[] args) {
        SpringApplication app = new SpringApplication(Backend.class);
        app.setDefaultProperties(Collections.singletonMap("server.port", "8081"));
        app.run(args);
    }
}
