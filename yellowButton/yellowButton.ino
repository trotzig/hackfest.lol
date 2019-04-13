// digital pin 2 has a pushbutton attached to it. Give it a name:
int pushButton = 2;
int buttonState = 0;

// the setup routine runs once when you press reset:
void setup() {
  Serial.begin(9600);
  pinMode(pushButton, INPUT);
 
  digitalWrite(pushButton, HIGH);
  
}

// the loop routine runs over and over again forever:
void loop() {
  // read the input pin:
  int newButtonState = digitalRead(pushButton);
  if (newButtonState == 1 && buttonState == 0) {
    Serial.println("snap");
  }
  buttonState = newButtonState;
  delay(10);        // delay in between reads for stability
}
