#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include <WiFiMulti.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <WiFiClientSecure.h>

// OLED display size
#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
#define OLED_RESET -1
#define SCREEN_ADDRESS 0x3C

Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);
WiFiMulti wifiMulti;

const int TMP36_PIN = 6;
const char* ssid = "angelinas phone (2)";
const char* password = "angelinacastro";
const char* serverURL = "http://c6ee-169-234-65-184.ngrok-free.app/temp"; // Fixed double slash

void setup() {
  Serial.begin(115200);
  Wire.begin(8, 9);

    // Reset WiFi settings
    WiFi.disconnect(true);
    delay(1000);
    WiFi.mode(WIFI_STA);

  // Initialize OLED
  if(!display.begin(SSD1306_SWITCHCAPVCC, SCREEN_ADDRESS)) {
    Serial.println("SSD1306 allocation failed");
    while(1);
  }

  display.clearDisplay();
  display.setTextSize(2);
  display.setTextColor(SSD1306_WHITE);
  display.setCursor(0, 0);
  display.println("Temp:");
  display.display();

  // WiFi setup
  WiFi.mode(WIFI_STA); // Set as station mode
  wifiMulti.addAP(ssid, password);
  
  Serial.println("Connecting to WiFi...");
  
  // Wait for connection with timeout
  unsigned long startTime = millis();
  while(wifiMulti.run() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
    
    if(millis() - startTime > 20000) { // 20-second timeout
      Serial.println("\nFailed to connect to WiFi!");
      display.clearDisplay();
      display.setCursor(0, 0);
      display.println("WiFi Fail");
      display.display();
      while(1); // Halt on failure
    }
  }

  Serial.println("\nWiFi connected");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
}

void loop() {
  // Read temperature
  int analogValue = analogRead(TMP36_PIN);
  float voltage = analogValue * (3.3 / 4095.0);
  float temperatureC = (voltage - 0.5) * 100.0;
  float temperatureF = (temperatureC * 9/5) + 32;

  // Display on OLED
  display.clearDisplay();
  display.setTextSize(2);
  display.setCursor(0, 0);
  display.print("Temp:");
  display.setCursor(0, 30);
  display.print(temperatureF, 1);
  display.print(" F");
  display.display();

  // Send data if connected
  if(wifiMulti.run() == WL_CONNECTED) {
    printf("Wifi connected\n");
    WiFiClient client;
   // client.setInsecure(); // Only for development
    
    HTTPClient http;
    if(http.begin(client, serverURL)) {
      http.addHeader("Content-Type", "application/json");
      http.addHeader("ngrok-skip-browser-warning", "true");
      
      String payload = "{\"temperatureF\":" + String(temperatureF, 2) + "}";
      int httpCode = http.POST(payload);
      printf("first loop\n");
      
      if(httpCode > 0) {
        printf("inner loop\n");
        Serial.printf("[HTTP] POST code: %d\n", httpCode);
        if(httpCode == HTTP_CODE_OK) {
          printf("httpcode ok\n");
          String response = http.getString();
          Serial.println(response);
        }
      } else {
        Serial.printf("[HTTP] POST failed: %s\n", http.errorToString(httpCode).c_str());
      }
      http.end();
    } else {
      Serial.println("[HTTP] Unable to connect");
    }
  } else {
    Serial.println("WiFi not connected!");
  }

  delay(1000); // Wait 1 second1 between readings
}