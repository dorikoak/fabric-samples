ㅊ
'use strict';
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
// var printerList = ['Epson cx-29','dori'];

// const { FileSystemWallet, Gateway } = require('fabric-network');
// const path = require('path');
//
// const ccpPath = path.resolve(__dirname, '..', '..', 'basic-network', 'connection.json');
// const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
// const ccp = JSON.parse(ccpJSON);

// async function query(func, name, ip) {
//     try {
//
//         // 지갑에서 신원 선택
//         const walletPath = path.join(process.cwd(), 'wallet');
//         const wallet = new FileSystemWallet(walletPath);
//         console.log(`Wallet path: ${walletPath}`);
//
//         // 등록된 사용자인지 확인
//         const userExists = await wallet.exists('user1');
//         if (!userExists) {
//             console.log('An identity for the user "user1" does not exist in the wallet');
//             console.log('Run the registerUser.js application before retrying');
//             return;
//         }
//
//         // 게이트웨이에 연결
//         const gateway = new Gateway();
//         await gateway.connect(ccp, { wallet, identity: 'user1', discovery: { enabled: false } });
//
//         // 네트워크에 접속
//         const network = await gateway.getNetwork('mychannel');
//
//         // 스마트 컨트랙트 요청
//         const contract = network.getContract('webcc');
//
//         // 트랜잭션 Submit
//         if (ip == null)
//           const result =await contract.evaluateTransaction(func, name);
//         else
//           const result =await contract.evaluateTransaction(func, name, ip);
//
//         //const result = await contract.evaluateTransaction('query','dori');
//
//         // 프로세스 응답
//         console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
//         return result;
//
//     } catch (error) {
//         console.error(`Failed to evaluate transaction: ${error}`);
//         process.exit(1);
//     }
// }

function templateHTML(list){
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <title>Capstone Design</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>
  </head>
  <body>

  <div class="jumbotron text-center" style="margin-bottom:0">
    <h1>복합기 관리 솔루션</h1>
  </div>

  <nav class="navbar navbar-expand-sm bg-secondary navbar-dark">
    <a class="navbar-brand" href="#">복합기</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="collapsibleNavbar">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" href="#">Link</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Link</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Link</a>
        </li>
      </ul>
    </div>
  </nav>

  <div class="container" style="margin-top:30px">
    <div class="row">
      <div class="col-sm-4">
        <ul class="nav nav-pills flex-column">
          <li class="nav-item">
            <a class="nav-link active" href="#">사용 복합기</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">서비스 내역</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">계정</a>
          </li>
        </ul>
        <hr class="d-sm-none">
      </div>
      <div class="col-sm-8">
       ${list}
      </div>
    </body>
  </html>
  `;
}
function templateList (queryObj) {
  var list = '';
  // var i = 0;
  // while(i < filelist.length) {
  list = list + `<tr>`;
  list = list + `<td>${queryObj.id}</td>`
  list = list + `<td>${queryObj.black}</td>`
  list = list + `<td>${queryObj.magenta}</td>`
  list = list + `<td>${queryObj.cyan}</td>`
  list = list + `<td>${queryObj.yellow}</td>`
  list = list + `<td>${queryObj.drum}</td>`
  list = list + `<td>${queryObj.Paper}</td>`
  list = list + `</tr>`;
  //   i = i+1;
  // }
  return list;
}

var app = http.createServer(async function(request,response){
    var _url = request.url;  //URL은 여기로 들어옴
    var queryData = url.parse(_url,true).query;
    var title = queryData.id
    if(_url == '/'){
      var list = `<table class="table table-hover">
        <thead>
        <tr>
          <th scope="col">PrinterID</th>
          <th scope="col">Black</th>
          <th scope="col">Magenta</th>
          <th scope="col">Cyan</th>
          <th scope="col">Yellow</th>
          <th scope="col">Drum</th>
          <th scope="col">UsingPaper</th>
        </tr>
        </thead>
        <tbody>`
      let obj = {
        id : 'Epson cx-29',
        black : 100,
        magenta : 20,
        cyan : 30,
        yellow : 40,
        drum : 20,
        Paper : 24884
      }
      list = list + templateList(obj);
      // for (let i = 0; i < printerList.length(); i++) {
      //   let queryjson = await query('updatePrint', printerList[i], null);
      //   console.log(queryjson);
      //   let obj = JSON.parse(queryjson);
      //   list = list + templateList(obj);
      //}
      // queryjson = await query('updatePrint', 'dori', null);
      // console.log(queryjson);
      // obj = JSON.parse(queryjson);
      // obj = {
      //   id : 'dori',
      //   black : 0,
      //   magenta : 20,
      //   cyan : 30,
      //   yellow : 40,
      //   drum : 20,
      //   Paper : 330
      // }
      //
      // list = list + templateList(obj);
      list = list + `  </tbody>
    </table>
   <button type="button" class="btn btn-primary" onClick="location.href='/enroll'">복합기 등록</button>
   <button type="button" class="btn">삭제</button>`

      var template = templateHTML(list);


      // const queryjson = query().then((result)=>{
      //   console.log(queryjson);
      //   const obj = JSON.parse(queryjson);
      // });

      response.writeHead(200);
      response.end(template);
    }else if(_url == '/enroll'){
      var template = templateHTML(`
                <form action="http://localhost:3000/enroll_process" method="post">
                  <p><input type="text" name="ID" placeholder="ID"></p>
                  <p>
                    <textarea name="IP" placeholder="IP"></textarea>
                  </p>
                  <p>
                    <input type="submit" class="btn btn-primary"/>
                    <button type="button" class="btn" onClick="location.href='/'">취소</button>
                  </p>
                </form>
              `);
      response.writeHead(200);
      response.end(template);
      return;
    }else if(_url == '/enroll_process') {
      var body = '';
      request.on('data', function(data){  //브라우저가 post 방식으로 데이터를 발생시킬때를 대비
        body = body + data;
        // if (body.length > 1e6)
        //   request.connection.destory();
      });
      request.on('end', function(){
        var post = qs.parse(body)
        var id = post.ID;
        var ip = post.IP;
        // printerList.push(id);
        console.log(post);
      });
      // queryjson = await query('enrollPrint', id, ip);
      // console.log(queryjson);
      response.writeHead(302, {location:'/'});
      response.end('success');
    }else {
      response.writeHead(404)
      response.end('Not Found')
    }
});
app.listen(3000);
