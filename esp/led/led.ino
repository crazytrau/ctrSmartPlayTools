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
// the setup function runs once when you press reset or power the board
void setup() {
   Serial.begin(57600);
  // initialize digital pin LED_BUILTIN as an output.
  for (int i=0;i<9;++i){pinMode(arrLed[i], OUTPUT);}
}
int curLed = 0;
// the loop function runs over and over again forever
void loop() {
  curLed = ++curLed>=9?0:curLed;
  Serial.println(curLed);
  digitalWrite(arrLed[curLed], HIGH);   // turn the LED on (HIGH is the voltage level)
  delay(200);                       // wait for a second
  digitalWrite(arrLed[curLed], LOW);   // turn the LED on (HIGH is the voltage level)
  delay(200);                       // wait for a second
}
//the loop function runs over and over again forever
//void loop() {
//  for (int i=0;i<9;++i){digitalWrite(arrLed[i], HIGH);}   // turn the LED on (HIGH is the voltage level)
//  delay(1000);                       // wait for a second
//  for (int i=0;i<9;++i){digitalWrite(arrLed[i], LOW);}   // turn the LED on (HIGH is the voltage level)
//  delay(1000);                       // wait for a second
//}
