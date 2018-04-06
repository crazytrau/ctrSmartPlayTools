#include <SoftwareSerial.h>
#include <ESP8266WiFi.h>
#include <SocketIOClient.h>
#define codeEsp "user1"

const int esp1[9] = {OUTPUT,INPUT_PULLUP,INPUT_PULLUP,INPUT_PULLUP,INPUT_PULLUP,INPUT_PULLUP,INPUT_PULLUP,INPUT_PULLUP,OUTPUT};
const int realBut1[9] = {NULL, 0,1,3,4,6,7,NULL,NULL};

const int esp2[9] = {OUTPUT,OUTPUT,OUTPUT,OUTPUT,OUTPUT,INPUT_PULLUP,INPUT_PULLUP,INPUT_PULLUP,OUTPUT};
const int realBut2[9] = {NULL, NULL,NULL,NULL,NULL,8,5,2,NULL};

const int arrIO[] = {D0, D1, D2, D3, D4, D5, D6, D7, D8};

//include thư viện để kiểm tra free RAM trên con esp8266
extern "C" {
  #include "user_interface.h"
}
 
SocketIOClient client;
const char* ssid = "Tai Loc";
const char* password = "00495698";

// Server Ip
char host[] = "192.168.1.75";
// Server port
int port = 3000;

//từ khóa extern: dùng để #include các biến toàn cục ở một số thư viện khác. Trong thư viện SocketIOClient có hai biến toàn cục
// mà chúng ta cần quan tâm đó là 
// RID: Tên hàm (tên sự kiện
// Rfull: Danh sách biến (được đóng gói lại là chuối JSON)
extern String RID;
extern String Rfull;

void setup()
{
    //Bật baudrate ở mức 57600 để giao tiếp với máy tính qua Serial
    Serial.begin(57600);
    
    for (int i=0;i<9;++i){
      pinMode(arrIO[i], esp1[i]);  
    }
 
    //Việc đầu tiên cần làm là kết nối vào mạng Wifi
    Serial.print("Ket noi vao mang ");
    Serial.println(ssid);
 
    //Kết nối vào mạng Wifi
    WiFi.begin(ssid, password);
 
    //Chờ đến khi đã được kết nối
    while (WiFi.status() != WL_CONNECTED) { //Thoát ra khỏi vòng 
        delay(500);
        Serial.print('.');
    }
 
    Serial.println();
    Serial.println(F("Da ket noi WiFi"));
    Serial.println(F("Di chi IP cua ESP8266 (Socket Client ESP8266): "));
    Serial.println(WiFi.localIP());
 
    if (!client.connect(host, port)) {
        Serial.println(F("Ket noi den socket server that bai!"));
        return;
    }
    else{
        Serial.println("Da san sang nhan lenh");
    }
}
int preBut = NULL;
void loop()
{
    for(int i=0;i<9;++i){
      if (preBut != i && esp1[i] == INPUT_PULLUP && digitalRead(arrIO[i]) == 0){
        Serial.println(realBut1[i]);
        preBut = i;
        String command = "button_in";
        client.send(command, (String)realBut1[i]);
      }
    }
    //Khi bắt được bất kỳ sự kiện nào thì chúng ta có hai tham số:
    //  +RID: Tên sự kiện
    //  +RFull: Danh sách tham số được nén thành chuỗi JSON!
    if (client.monitor()) {

        Serial.print(RID);
        Serial.print(' ');
        Serial.println(Rfull);
        
        if (RID == "esp"){
          Serial.println(Rfull[0]);
        }
        
        //Kiểm tra xem còn dư bao nhiêu RAM, để debug
        uint32_t free = system_get_free_heap_size();
        Serial.println(free);
    }
 
    //Kết nối lại!
    if (!client.connected()) {
      client.reconnect(host, port);
    }
 

}
 
