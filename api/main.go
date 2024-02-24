package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"context"
	"log"
	"os"
	"github.com/kr/pretty"
	"googlemaps.github.io/maps"
	"github.com/joho/godotenv"
)

func getApiKey()(string, error){
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	apiKey := os.Getenv("API_KEY")

	return apiKey, err
}

func getDirection(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	startAddress := r.URL.Query().Get("start")
	endAddress := r.URL.Query().Get("end")

	if startAddress == "" || endAddress == "" {
		errorMsg := "Start and end addresses are required."
		log.Println(errorMsg)
		http.Error(w, errorMsg, http.StatusBadRequest)
		return
	}

	log.Printf("Received GET request for /directions?start=%s&end=%s\n", startAddress, endAddress)

	//directions := fmt.Sprintf("Getting directions from %s to %s", startAddress, endAddress)

	apiKey, err := getApiKey()
	if err != nil {
		log.Printf("Error getting API key: %s", err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}
	c, err := maps.NewClient(maps.WithAPIKey(apiKey))
	if err != nil {
		log.Printf("Error with map: %s", err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}
	req := &maps.DirectionsRequest{
		Origin:      startAddress,
		Destination: endAddress,
	}

	route, _, err := c.Directions(context.Background(), req)
	if err != nil {
		log.Printf("Error with directions: %s", err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	pretty.Println(route)

	// Return the result as JSON
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(route)
}


func main() {
	log.SetFlags(log.LstdFlags | log.Lmicroseconds)

	http.HandleFunc("/directions", getDirection)
	//http.HandleFunc("/directionsWithThirdParam/{thirdParam}", getDirectionWithThirdParam)

	fmt.Println("Server started on :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}

// package main

// import (
// 	"context"
// 	"log"
// 	"os"
// 	"github.com/kr/pretty"
// 	"googlemaps.github.io/maps"
// 	"github.com/joho/godotenv"
// )
// func getApiKey()(string, error){
// 	err := godotenv.Load()
// 	if err != nil {
// 		log.Fatal("Error loading .env file")
// 	}

// 	apiKey := os.Getenv("API_KEY")

// 	return apiKey, err
// }
// func main() {
// 	apiKey, err := getApiKey()
// 	if err != nil {
// 		log.Fatalf("fatal error: %s", err)
// 	}
// 	c, err := maps.NewClient(maps.WithAPIKey(apiKey))
// 	if err != nil {
// 		log.Fatalf("fatal error: %s", err)
// 	}
// 	r := &maps.DirectionsRequest{
// 		Origin:      "Houston",
// 		Destination: "College Station",
// 	}
// 	route, _, err := c.Directions(context.Background(), r)
// 	if err != nil {
// 		log.Fatalf("fatal error: %s", err)
// 	}

// 	pretty.Println(route)
// }