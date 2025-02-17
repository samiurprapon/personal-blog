package service

import (
	"apps/auth/config"
	"apps/auth/core"
	"errors"
	"runtime"

	"github.com/sirupsen/logrus"
)

type HealthCheckService interface {
	MemoryHeapCheck() error
}

type healthCheckService struct {
	Log *logrus.Logger
}

func NewHealthCheckService() HealthCheckService {
	return &healthCheckService{
		Log: core.Log,
	}
}

// MemoryHeapCheck checks if heap memory usage exceeds a threshold
func (s *healthCheckService) MemoryHeapCheck() error {
	var memStats runtime.MemStats

	// Collect memory statistics
	runtime.ReadMemStats(&memStats)

	// Heap memory currently allocated
	heapAlloc := memStats.HeapAlloc / 1024

	// Example threshold: 300 MB
	heapThreshold := uint64(300 * 1024)

	if config.IsProd {
		s.Log.Infof("Heap Memory Allocation: %v kilobytes", heapAlloc)
	}

	// If the heap allocation exceeds the threshold, return an error
	if heapAlloc > heapThreshold {
		s.Log.Errorf("Heap memory usage exceeds threshold: %v bytes", heapAlloc)
		return errors.New("heap memory usage too high")
	}

	return nil
}
