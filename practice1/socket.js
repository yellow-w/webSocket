const webSocket = require('ws')

let sockets = []
module.exports = (server) => {
    const wss = new webSocket.Server({ server })  //현재 사용중인 포트에 적용할 경우
    //const wss = new webSocket.Server({port:3001}) //포트번호 직접 작성할 경우


    wss.on('connection', (ws, req) => {
        ws.id = req.headers['sec-websocket-key']
        sockets.push(ws)
        console.log(ws.id)
        console.log(req.socket.remoteAddress)   //ip 주소 확인

        // code : 연결이 종료되는 이유를 가르키는 숫자??
        // 기본값은 1000??
        ws.send('web7722님 환영합니다.')
        // reason : 왜종료되는지 사람이 읽을수 있도록 나타내는 문자열??
        // UTF-8 포멧 123바이트를 넘을수없다.??

        ws.on('close', _ => {
            console.log('클라이언트 접속 종료')
            sockets = sockets.filter(v => {
                return ws.id !== v.id
            })  //필터 메서드 쓰기 전에는 새로고침하면 sockets.length의 길이가 +1 되었는데
        })      //메서드 쓰고나니 브라우저 켜진 수 만큼만 확인됨

        console.log(sockets.length)
        ws.on('message', (response) => {
            let obj = JSON.parse(response.toString())
            let { type, data } = obj

            switch (type) {
                case 'send_msg':
                    sockets.forEach(v => {
                        v.send(JSON.stringify(data))    //스트링으로 변환해서 전송
                    })
                    break;
            }
        })
    })
}