// package main

// import (
// 	"encoding/json"
// 	"fmt"
// 	"log"
// 	"net/http"
// )

// func getDirection(w http.ResponseWriter, r *http.Request) {
// 	startAddress := r.URL.Query().Get("start")
// 	endAddress := r.URL.Query().Get("end")

// 	log.Printf("Received GET request for /directions?start=%s&end=%s\n", startAddress, endAddress)

// 	directions := fmt.Sprintf("Getting directions from %s to %s", startAddress, endAddress)

// 	// Return the result as JSON
// 	w.Header().Set("Content-Type", "application/json")
// 	json.NewEncoder(w).Encode(map[string]string{"directions": directions})
// }

// // func getDirectionWithThirdParam(w http.ResponseWriter, r *http.Request) {
// // 	startAddress := r.URL.Query().Get("start")
// // 	endAddress := r.URL.Query().Get("end")
// // 	thirdParam := r.URL.Query().Get(":thirdParam")

// // 	log.Printf("Received GET request for /directionsWithThirdParam/%s?start=%s&end=%s\n", thirdParam, startAddress, endAddress)

// // 	directions := fmt.Sprintf("Getting directions from %s to %s with third parameter: %s", startAddress, endAddress, thirdParam)

// // 	w.Header().Set("Content-Type", "application/json")
// // 	json.NewEncoder(w).Encode(map[string]string{"directions": directions})
// // }

// func main() {
// 	log.SetFlags(log.LstdFlags | log.Lmicroseconds)

// 	http.HandleFunc("/directions", getDirection)
// 	//http.HandleFunc("/directionsWithThirdParam/{thirdParam}", getDirectionWithThirdParam)

// 	fmt.Println("Server started on :8080")
// 	log.Fatal(http.ListenAndServe(":8080", nil))
// }

package main

import (
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
func main() {
	apiKey, err := getApiKey()
	if err != nil {
		log.Fatalf("fatal error: %s", err)
	}
	c, err := maps.NewClient(maps.WithAPIKey(apiKey))
	if err != nil {
		log.Fatalf("fatal error: %s", err)
	}
	r := &maps.DirectionsRequest{
		Origin:      "Houston",
		Destination: "College Station",
	}
	route, _, err := c.Directions(context.Background(), r)
	if err != nil {
		log.Fatalf("fatal error: %s", err)
	}

	pretty.Println(route)
}