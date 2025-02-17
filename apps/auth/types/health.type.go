package types

type HealthCheck struct {
	Name    string  `json:"name"`
	Status  string  `json:"status"`
	IsUp    bool    `json:"isUp"`
	Message *string `json:"message,omitempty"`
}

type HealthCheckResponse struct {
	Code      int           `json:"code"`
	Status    string        `json:"status"`
	Message   string        `json:"message"`
	IsHealthy bool          `json:"isHealthy"`
	Result    []HealthCheck `json:"result"`
}
