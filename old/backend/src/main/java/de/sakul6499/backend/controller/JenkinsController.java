package de.sakul6499.backend.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import de.sakul6499.backend.data.jenkins.MasterConfiguration;

@RestController
public class JenkinsController {

    private final String MASTER_CONFIG_URI = "https://gitlab.com/sakul6499.de/jenkins-configuration/-/raw/master/master.json";

    private String getJobsConfigs(MasterConfiguration configuration) {
        final StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append("jobs:\n");

        for(String jobConfig : configuration.getJobConfigs()) {
            RestTemplate restTemplate = new RestTemplate();
            String jobConfigResult = restTemplate.getForObject(jobConfig, String.class);
            stringBuilder.append("  ").append(jobConfigResult).append("\n");
        }
        
        return stringBuilder.toString();
    }

    private String getMainConfig(final MasterConfiguration configuration) {
        RestTemplate restTemplate = new RestTemplate();
        String result = restTemplate.getForObject(configuration.getMainConfig(), String.class);
        return result;
    }

    private MasterConfiguration getMasterConfig() {
        RestTemplate restTemplate = new RestTemplate();
        String result = restTemplate.getForObject(MASTER_CONFIG_URI, String.class);

        ObjectMapper objectMapper = new ObjectMapper();
        try {
            return objectMapper.readValue(result, MasterConfiguration.class);
        } catch (JsonProcessingException e) {
            System.err.println("Failed retrieving master configuration: " + e.getMessage());
            return null;
        }
    }

    @GetMapping(path = "/api/jenkins/configuration", produces = "application/x-yaml;charset=UTF-8")
    public String callback() {
        final StringBuilder output = new StringBuilder();
        final MasterConfiguration masterConfig = getMasterConfig();
        
        final String mainConfig = getMainConfig(masterConfig);
        output.append(mainConfig);

        final String jobsConfig = getJobsConfigs(masterConfig);
        output.append(jobsConfig);
        
        return output.toString();
    }
}
