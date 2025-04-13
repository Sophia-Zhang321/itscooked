#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include <inttypes.h>
#include <stdio.h>
#include <WiFiMulti.h>
#include <WiFi.h>
#include <HTTPClient.h>


// OLED display size
#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64

// I2C OLED address and pins
#define OLED_RESET    -1
#define SCREEN_ADDRESS 0x3C


Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);

WiFiMulti wifiMulti;


// TMP36 analog pin
const int TMP36_PIN = 6;


char ssid[] = "BitHacks";
char password[] = "BitHacks2025!";

const char* serverURL = "https://a116-169-234-65-184.ngrok-free.app/temp";


void setup() {
  Serial.begin(115200);
  Wire.begin(8, 9);

  // Initialize OLED
  if (!display.begin(SSD1306_SWITCHCAPVCC, SCREEN_ADDRESS)) {
    Serial.println("SSD1306 allocation failed");
    for (;;); // Loop forever
  }

  for(uint8_t t = 4; t > 0; t--) {
    Serial.printf("[SETUP] WAIT %d...\n", t);
    Serial.flush();
    delay(1000);
}


  display.clearDisplay();
  display.setTextSize(2);
  display.setTextColor(SSD1306_WHITE);
  display.setCursor(0, 0);
  display.println("Temp:");
  display.display();
  delay(1000);

 // WiFi.begin(ssid, password);

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
  Serial.print("MAC address: ");
  Serial.println(WiFi.macAddress());

  // Set timezone to your local zone, for example, GMT-7 for PST (without DST)
  configTime(0, 0, "pool.ntp.org", "time.nist.gov");

  // Wait for time to be set

  wifiMulti.addAP("angelinas phone (2)", "angelinacastro");
}

void loop() {
  // Read analog voltage from TMP36
  int analogValue = analogRead(TMP36_PIN);
  float voltage = analogValue * (3.3 / 4095.0); // Convert to voltage
  float temperatureC = (voltage - 0.5) * 100.0; // TMP36 conversion formula
  float temperatureF = (temperatureC * (9/5) + 32);

  Serial.println("WIFI:");
  Serial.println(wifiMulti.run());

  // Debug in Serial Monitor
  Serial.print("Temp: ");
  Serial.print(temperatureF);
  Serial.println(" °F");

  // Display on OLED
  display.clearDisplay();
  display.setTextSize(2);
  display.setCursor(0, 0);
  display.print("Temp:");
  display.setCursor(0, 30);
  display.print(temperatureF, 1);
  display.print(" F");
  display.display();

  delay(1000); // update every second

    // Send POST request to API
    if (wifiMulti.run() == WL_CONNECTED) {
      Serial.println("Uploading data...");
      HTTPClient http;
  
      // For HTTPS, set secure client (skip validation in dev)
      WiFiClientSecure client;
      client.setInsecure();  // Don't use in production unless you have to
  
      
      // http.begin(client, serverURL);  // Use secure client for HTTPS
      http.addHeader("Content-Type", "application/json");
      http.addHeader("ngrok-skip-browser-warning", "hello");
      
      int httpCode = http.GET();
      if (httpCode > 0) {
        Serial.printf("[HTTP] GET...code: %d\n", httpCode);
        if (httpCode == HTTP_CODE_OK) {
          String payload = http.getString();
          Serial.println(payload);
        }
      }
      else {
        Serial.printf("[HTTP] GET... failed, error: %s\n", http.errorToString(httpCode).c_str());
      }
      http.end();

     // delay (1000);

      Serial.print("[HTTP] POST begin...\n");

      HTTPClient postHTTP;

      http.begin(serverURL);

      String body = {"Temperature in F: %f\n", temperatureF};

      int postCode = postHTTP.POST(body);
      if (postCode > 0) {
        // HTTP header has been send and Server response header has been handled
        Serial.printf("[HTTP] POST... code: %d\n", postCode);

        // file found at server
        if(postCode == HTTP_CODE_OK) {
            String payload = postHTTP.getString();
            Serial.println(payload);
        } 
        
      } else {
          Serial.printf("[HTTP] POST... failed, error: %s\n", http.errorToString(httpCode).c_str());
      }

      postHTTP.end();
  } else {
      // print a message about the WiFi connection
      Serial.println("WiFi not connected!");
  }

  // request only once every 5 seconds to avoid data rates
//  delay(1000);
}