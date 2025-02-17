package core

import (
	"os"

	"github.com/sirupsen/logrus"
)

type CustomFormatter struct {
	logrus.TextFormatter
}

var Log *logrus.Logger

func init() {
	Log = logrus.New()

	// Set logger to use the custom text formatter
	Log.SetFormatter(&CustomFormatter{
		TextFormatter: logrus.TextFormatter{
			TimestampFormat: "14:03:01.998",
			FullTimestamp:   true,
			ForceColors:     true,
		},
	})

	Log.SetOutput(os.Stdout)
}
