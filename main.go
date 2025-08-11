package main

import (
	"fmt"
	"log"
	"net/http"
)

func main() {
	fmt.Println("Forge Realm - Community Trading Card Game")
	
	http.HandleFunc("/", indexHandler)
	http.HandleFunc("/health", healthHandler)
	
	port := ":8080"
	fmt.Printf("Server starting on port %s\n", port)
	
	if err := http.ListenAndServe(port, nil); err != nil {
		log.Fatal("Server failed to start:", err)
	}
}

func indexHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/html")
	fmt.Fprintf(w, `<!DOCTYPE html>
<html>
<head>
    <title>Forge Realm</title>
</head>
<body>
    <h1>Welcome to Forge Realm</h1>
    <p>Open-source trading card game built by the community</p>
</body>
</html>`)
}

func healthHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	fmt.Fprintf(w, `{"status": "healthy", "service": "forge-realm"}`)
}