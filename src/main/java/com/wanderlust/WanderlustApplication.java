package com.wanderlust;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class WanderlustApplication {

	public static void main(String[] args) {
		SpringApplication.run(WanderlustApplication.class, args);
	}

	/**
	 * EXT: HELPER BEAN
	 * Creates a RestTemplate for making external calls (used in WeatherService).
	 */
	@org.springframework.context.annotation.Bean
	public org.springframework.web.client.RestTemplate restTemplate() {
		return new org.springframework.web.client.RestTemplate();
	}
}
