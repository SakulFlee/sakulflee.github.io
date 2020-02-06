package de.sakul6499.backend;

import com.mongodb.MongoClient;
import de.sakul6499.backend.data.MongoSettings;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Backend {

	public static MongoSettings MONGO_SETTINGS = MongoSettings.AutoConfig();

	public static void main(String[] args) {
		System.out.println("Settings:\r\n" + MONGO_SETTINGS.toString());
		SpringApplication.run(Backend.class, args);
	}
}
