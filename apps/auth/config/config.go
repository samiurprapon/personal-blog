package config

import (
	"apps/auth/core"
	"os"

	"github.com/spf13/viper"
)

var (
	IsProd  bool
	AppHost string
	AppPort int
	AppTZ   string

	DBHost     string
	DBUser     string
	DBPassword string
	DBName     string
	DBPort     int

	JWTSecret           string
	JWTAccessExp        int
	JWTRefreshExp       int
	JWTResetPasswordExp int
	JWTVerifyEmailExp   int
)

func init() {
	loadConfig()

	// server configuration
	IsProd = viper.GetString("APP_ENV") == "production"
	AppHost = viper.GetString("APP_HOST")
	AppPort = viper.GetInt("APP_PORT")
	AppTZ = viper.GetString("APP_TZ")

	// database configuration
	DBHost = viper.GetString("DB_HOST")
	DBUser = viper.GetString("DB_USER")
	DBPassword = viper.GetString("DB_PASSWORD")
	DBName = viper.GetString("DB_NAME")
	DBPort = viper.GetInt("DB_PORT")

	// jwt configuration
	JWTSecret = viper.GetString("JWT_SECRET")
	JWTAccessExp = viper.GetInt("JWT_ACCESS_EXP_MINUTES")
	JWTRefreshExp = viper.GetInt("JWT_REFRESH_EXP_DAYS")
	JWTResetPasswordExp = viper.GetInt("JWT_RESET_PASSWORD_EXP_MINUTES")
	JWTVerifyEmailExp = viper.GetInt("JWT_VERIFY_EMAIL_EXP_MINUTES")
}

func loadConfig() {
	// Define possible paths where .env file might be located
	configPaths := []string{
		"./apps/auth/", // Path relative to project root
		"./",           // Path relative to project root
	}

	// Get current working directory to determine execution context
	dir, err := os.Getwd()
	if err != nil {
		core.Log.Error("Failed to get current working directory")
		return
	}
	core.Log.Infof("Current working directory: %s", dir)

	// Check if we're running from the auth directory
	if dir[len(dir)-9:] == "/apps/auth" {
		configPaths = append(configPaths, ".")
	}

	// Iterate through possible config paths
	for _, path := range configPaths {
		// Correctly join path with .env filename
		configFile := path + ".env"
		viper.SetConfigFile(configFile)

		// Try to read config file
		if err := viper.ReadInConfig(); err == nil {
			os.Setenv("TZ", AppTZ)

			core.Log.Infof("Config file loaded from %s", configFile)
			return
		} else {
			// Log the specific error for debugging
			core.Log.Warnf("Failed to load config from %s: %v", configFile, err)
		}
	}

	core.Log.Error("Failed to load any config file")
}
