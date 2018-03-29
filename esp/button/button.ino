/*
  Blink

  Turns an LED on for one second, then off for one second, repeatedly.

  Most Arduinos have an on-board LED you can control. On the UNO, MEGA and ZERO
  it is attached to digital pin 13, on MKR1000 on pin 6. LED_BUILTIN is set to
  the correct LED pin independent of which board is used.
  If you want to know what pin the on-board LED is connected to on your Arduino
  model, check the Technical Specs of your board at:
  https://www.arduino.cc/en/Main/Products

  modified 8 May 2014
  by Scott Fitzgerald
  modified 2 Sep 2016
  by Arturo Guadalupi
  modified 8 Sep 2016
  by Colby Newman

  This example code is in the public domain.

  http://www.arduino.cc/en/Tutorial/Blink
*/
int arrLed[] = {D0, D1, D2, D3, D4, D5, D6, D7, D8};
void setup() {
  //start serial connection
  Serial.begin(57600);
  //configure pin 2 as an input and enable the internal pull-up resistor
  pinMode(D0, OUTPUT); /// 1->0 luon
  pinMode(D1, OUTPUT); // 1
  pinMode(D2, OUTPUT); // 1
  pinMode(D3, INPUT_PULLUP); // 1->0->1
  pinMode(D4, INPUT_PULLUP); // 1->0->1
  pinMode(D5, INPUT_PULLUP); // 1->0->1
  pinMode(D6, INPUT_PULLUP); // 1->0->1 
  pinMode(D7, INPUT_PULLUP); // 1->0->1
  pinMode(D8, OUTPUT); // 0->0

}
int count=0;
void loop() {
  digitalWrite(arrLed[0], HIGH);
  digitalWrite(arrLed[1], HIGH);
  digitalWrite(arrLed[2], HIGH);
  digitalWrite(arrLed[8], HIGH);
    int sensorVal = digitalRead(arrLed[6]);
    Serial.print(++count);
    Serial.print(" ");
    Serial.println(sensorVal);
}
