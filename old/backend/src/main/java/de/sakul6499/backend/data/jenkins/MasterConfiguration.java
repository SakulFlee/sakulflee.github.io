package de.sakul6499.backend.data.jenkins;

import java.util.List;

/**
 * Configuration
 */
public class MasterConfiguration {

    private String mainConfig;
    private List<String> jobConfigs;

    public MasterConfiguration(String mainConfig, List<String> jobConfigs) {
        this.mainConfig = mainConfig;
        this.jobConfigs = jobConfigs;
    }

    public MasterConfiguration() {}

    /**
     * @return the mainConfig
     */
    public String getMainConfig() {
        return mainConfig;
    }

    /**
     * @return the jobConfigs
     */
    public List<String> getJobConfigs() {
        return jobConfigs;
    }

    @Override
    public String toString() {
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append("{");
        stringBuilder.append("\"mainConfig\": \"").append(mainConfig).append("\", ");
        stringBuilder.append("\"jobsConfigs\": [");
        for(String jobConfig : getJobConfigs()) {
            stringBuilder.append("\"").append(jobConfig).append("\"").append(",");
        }
        stringBuilder.replace(stringBuilder.length() - 2, stringBuilder.length() - 1, "");
        stringBuilder.append("]");
        stringBuilder.append("}");
        return stringBuilder.toString();
    }
}