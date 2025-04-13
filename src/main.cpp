#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

// OLED display size
#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64

// I2C OLED address and pins
#define OLED_RESET    -1
#define SCREEN_ADDRESS 0x3C
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);

// TMP36 analog pin
const int TMP36_PIN = 6;

void setup() {
  Serial.begin(115200);
  Wire.begin(8, 9);

  // Initialize OLED
  if (!display.begin(SSD1306_SWITCHCAPVCC, SCREEN_ADDRESS)) {
    Serial.println("SSD1306 allocation failed");
    for (;;); // Loop forever
  }

  display.clearDisplay();
  display.setTextSize(2);
  display.setTextColor(SSD1306_WHITE);
  display.setCursor(0, 0);
  display.println("Temp:");
  display.display();
  delay(1000);
}

void loop() {
  // Read analog voltage from TMP36
  int analogValue = analogRead(TMP36_PIN);
  float voltage = analogValue * (3.3 / 4095.0); // Convert to voltage
  float temperatureC = (voltage - 0.5) * 100.0; // TMP36 conversion formula

  // Debug in Serial Monitor
  Serial.print("Temp: ");
  Serial.print(temperatureC);
  Serial.println(" °C");

  // Display on OLED
  display.clearDisplay();
  display.setTextSize(2);
  display.setCursor(0, 0);
  display.print("Temp:");
  display.setCursor(0, 30);
  display.print(temperatureC, 1);
  display.print(" C");
  display.display();

  delay(1000); // update every second
}