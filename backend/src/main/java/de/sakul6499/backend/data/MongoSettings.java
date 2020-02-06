package de.sakul6499.backend.data;

import com.mongodb.DB;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import lombok.SneakyThrows;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;
import java.io.File;
import java.io.FileReader;
import java.util.Properties;

public class MongoSettings {

    private final static File CONFIG_LOCATION = new File("./mongo_settings.prop");

    @lombok.SneakyThrows
    public static MongoSettings AutoConfig() {
        if(!CONFIG_LOCATION.exists()) {
            if(!CONFIG_LOCATION.getParentFile().exists()) {
                if (!CONFIG_LOCATION.getParentFile().mkdirs()) {
                    System.err.println("Failed to create parent directory '" + CONFIG_LOCATION.getParentFile().getAbsolutePath() + "'!");
                }
            }

            if(!CONFIG_LOCATION.createNewFile()) {
                System.err.println("Failed to create config file at '" + CONFIG_LOCATION.getAbsolutePath() + "'!");
            }

            throw new RuntimeException("Config file did not exist! It got created but needs manual configuring. [" + CONFIG_LOCATION.getAbsolutePath() + "]");
        }

        // Read
        Properties properties = new Properties();
        properties.load(new FileReader(CONFIG_LOCATION));

        return PassAndCreate(properties);
    }

    private static MongoSettings PassAndCreate(Properties properties) {
        boolean gotAll = true;

        boolean srv;
        String hostname = "";
        String port = "";
        String database = "";
        String username = "";
        String password = "";

        String propSRV = properties.getProperty("srv");
        if (propSRV == null) {
            srv = false;
            System.err.println("Missing 'srv' value!");
        } else if(propSRV.equals("true")) {
            srv = true;
        } else if(propSRV.equals("false")) {
            srv = false;
        } else {
            srv = false;
            System.err.println("Unknown value for 'srv' [" + propSRV + "]!");
        }

        String propHostname = properties.getProperty("hostname");
        if(propHostname == null) {
            gotAll = false;
            System.err.println("Missing 'hostname' value!");
        } else {
            hostname = propHostname;
        }

        String propPort = properties.getProperty("port");
        if(propPort == null) {
            gotAll = false;
            System.err.println("Missing 'port' value!");
        } else {
            port = propPort;
        }

        String propDatabase = properties.getProperty("database");
        if(propDatabase == null) {
            System.err.println("Missing 'database' value!");
        } else {
            database = propDatabase;
        }

        String propUsername = properties.getProperty("username");
        if(propUsername == null) {
            System.err.println("Missing 'username' value!");
        } else {
            username = propUsername;
        }

        String propPassword = properties.getProperty("password");
        if(propPassword == null) {
            System.err.println("Missing 'password' value!");
        } else {
            password = propPassword;
        }

        if(gotAll) {
            return new MongoSettings(srv, hostname, port, database, username, password);
        } else {
            throw new RuntimeException("Config has missing values!");
        }
    }

    @NotNull private boolean srv = false;
    @NotNull  private final String hostname;
    @NotNull private final String port;
    @NotNull private final String database;
    @Null private final String username;
    @Null private final String password;

    public MongoSettings(@NotNull String hostname, @NotNull String port, @NotNull String database, @Null String username, @Null String password) {
        this.hostname = hostname;
        this.port = port;
        this.database = database;
        this.username = username;
        this.password = password;
    }

    public MongoSettings(@NotNull boolean srv, @NotNull String hostname, @NotNull String port, @NotNull String database, @Null String username, @Null String password) {
        this(hostname, port, database, username, password);
        this.srv = srv;
    }

    @SneakyThrows
    public MongoClient makeClient() {
        final MongoClientURI clientURI = new MongoClientURI(toString());
        return new MongoClient(clientURI);
    }

    public DB makeDatabase() {
        final MongoClient client = makeClient();
        return client.getDB(database);
    }

    public @NotNull boolean isSRV() {
        return srv;
    }

    public @NotNull String getHostname() {
        return hostname;
    }

    public @NotNull String getPort() {
        return port;
    }

    public @NotNull String getDatabase() {
        return database;
    }

    public @Null String getUsername() {
        return username;
    }

    public @Null String getPassword() {
        return password;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        MongoSettings mongoSettings = (MongoSettings) o;

        if (!getPort().equals(mongoSettings.getPort())) return false;
        if (!getHostname().equals(mongoSettings.getHostname())) return false;
        if (!getDatabase().equals(mongoSettings.getDatabase())) return false;
        if (getUsername() != null ? !getUsername().equals(mongoSettings.getUsername()) : mongoSettings.getUsername() != null)
            return false;
        return getPassword() != null ? getPassword().equals(mongoSettings.getPassword()) : mongoSettings.getPassword() == null;
    }

    @Override
    public int hashCode() {
        int result = getHostname().hashCode();
        result = 31 * result + (getPort() != null ? getPort().hashCode() : 0);
        result = 31 * result + (getDatabase() != null ? getDatabase().hashCode() : 0);
        result = 31 * result + (getUsername() != null ? getUsername().hashCode() : 0);
        result = 31 * result + (getPassword() != null ? getPassword().hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        String base = "mongodb" + ((isSRV()) ? "+srv" : "") + "://";
        boolean needsAt = false;

        if(getUsername() != null && !getUsername().isEmpty()) {
            needsAt = true;
            base += getUsername();
        }

        if(getPassword() != null && !getPassword().isEmpty()) {
            needsAt = true;
            base += getPassword();
        }

        if(needsAt) {
            base += "@";
        }

        return base + hostname + ":" + port + ((database != null && !database.isEmpty()) ? "/" + database : "");
    }
}
