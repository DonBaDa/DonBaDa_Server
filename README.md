# DonBaDa_Server

##### host: "soylatte.kr" port: 2233

### User Schema
> _id: String <br>
> id: String  <br>
> fb_token: String<br>      // 페이스북 토큰
> name: String<br>          // 이름
> birth: String<br>         // 생일
> phone: String<br>         // 전화번호
> picture: String<br>       // 사진(페이스북)
> debt_rooms: [Room]<br>    // 채무자 룸 (나에게 돈을 줘야하는 사람)
> credit_rooms: [Room]<br>  // 채권자 룸 (내가 돈을 줘야하는 사람)

### Room Schema
> creditor: User,  //채권자 (돈을 받아야하는 사람)
> debtor: User,    //채무자 (돈을 갚아야하는 사람)
> D_day: String,   //디데이
> amount: String,  //돈 양
> title: String,   //제목 
> isEnd: Boolean   //돈을 갚았냐 안갚았냐


### Query
##### [GET] /users/?id={id}
유저 정보 가져오기
> params -<br>
> - id: user id

> return - 200<br>
> - User Schema

> return - 400<br>
> - user not found


##### [GET] /users/fb
페이스북에서 정보가져오기
> params -<br>
> - token: facebook access token<br>

> return - 200 <br>
> - id: facebook id <br>
> - name: facebook name<br>
> - birth: facebook birthday<br>
> - picture: facebook picture url<br>
> - email: facebook email<br>

> return - 400 <br>
> - user exist

##### [POST] /users/reg
회원가입 
> body -<br>
> - id: user id <br>
> - name: facebook name<br>
> - birth: facebook birthday<br>
> - email: facebook email<br>
> - phone: phone number<br>

> return -<br>
> - User Schema

##### [POST] /users/card
카드등록
> body -<br>
> - id: user id <br>
> - card_number: card number<br>
> - expiry: 유효기간<br>
> - birth: 생년월일<br>
> - pw: 비밃번호r<br>

> return - 200<br>
> - User Schema

> return - 400<br>
> - Error

##### [GET] /room/?id={id}
룸 정보 찾기
> params -<br>
> - id: room _id

> return - 200<br>
> - User Schema

> return - 400<br>
> - user not found

##### [POST] /room/
룸 생성
> params -<br>
> - creditor: creditor user id <br>
> - debtor: debtor user id <br>
> - title: title <br>
> - D_day: D-day <br>
> - amount: money amount <br>


> return - 200<br>
> - Room Schema

> return - 400<br>
> - user not found or room not found

##### [POST] /pay
결제
> body - <br>
> - id: Room _id

> return - 200<br>
> - okay

##### [POST] /facebook
페이스북 페널티
> body - <br>
> - id: Room _id <br>
> - message: 게시글 content

> return - 200<br>
> - okay

> return - 500 <br>
> - error

##### [POST] /gps
GPS 페널티
> body - <br>
> - id: Room _id <br>

> return - 200<br>
> - okay

> return - 400 <br>
> - room not found

##### [POST] /lock
Lock 페널티
> body - <br>
> - id: Room _id <br>

> return - 200<br>
> - okay

> return - 400 <br>
> - room not found

##### [POST] /sound
Sound 페널티
> body - <br>
> - id: Room _id <br>

> return - 200<br>
> - okay

> return - 400 <br>
> - room not found

##### [POST] /flash
Flash 페널티
> body - <br>
> - id: Room _id <br>

> return - 200<br>
> - okay

> return - 400 <br>
> - room not found

### Socket
host: "soylatte.kr" port: 3344

##### [WRITE] 
> '{"id": "${user-id}", "type": "set"} 유저정보 저장

##### [ON]
> 'gps' GPS 페널티 <br>
> 'lock' Lock 페널티 <br>
> 'sound' sound 페널티 <br>
> 'flash' flash 페널티 <br>
