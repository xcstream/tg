var net = require('net');
const chalk = require('chalk');

var PORT = 3000;
var HOST = '127.0.0.1';

console.log('telnet '+HOST+' '+ PORT)
const clear = '\x1B\x5B\x48\x1B\x5B\x4A'
// tcp服务端
var server = net.createServer(function(socket){
    var welcome=
        `${chalk.green('======== 欢迎 ========')}
[1] 开始1
[2] 开始2
[3] 开始3
[4] 开始4
[0] 再见
${chalk.blue.bgWhite('请选择功能按回车键确认:')}`
    socket.write(clear)
    socket.write(welcome)
    var buffer = ''
    function run(){
        var cmd = buffer.replace('\n','').trim()
        if(cmd =='') {
            buffer = ''
            socket.write(clear+welcome)
            return
        }
        if(cmd == '0' ){
            socket.write(clear+chalk.green('再见\n'))
            socket.write('= = = = = = = = = = = = = = = = = = = = = =\n')
            socket.end();
        }
        if(cmd == '1'){
            socket.write(clear)
            var w1=
`${chalk.green('======== w1 ========')}
[1] 开始1
[2] 开始2
[3] 开始3
[4] 开始4
[0] 再见`
            socket.write(w1)
        }

        buffer = ''
    }
    socket.on('data', function(data){
        buffer+=data.toString();
        if(buffer[buffer.length-1]=='\n'){
            run()
        }
    });

    socket.on('close', function(){
    });

    socket.on('error', function(){
    });

});
server.listen(PORT, HOST, function(){
});