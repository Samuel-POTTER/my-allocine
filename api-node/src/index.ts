import app from './app';
import http from 'http';

const banner = `     
 █████╗ ██████╗ ██╗      ███╗   ██╗ ██████╗ ██████╗ ███████╗
██╔══██╗██╔══██╗██║      ████╗  ██║██╔═══██╗██╔══██╗██╔════╝
███████║██████╔╝██║█████╗██╔██╗ ██║██║   ██║██║  ██║█████╗  
██╔══██║██╔═══╝ ██║╚════╝██║╚██╗██║██║   ██║██║  ██║██╔══╝  
██║  ██║██║     ██║      ██║ ╚████║╚██████╔╝██████╔╝███████╗
╚═╝  ╚═╝╚═╝     ╚═╝      ╚═╝  ╚═══╝ ╚═════╝ ╚═════╝ ╚══════╝

`;

const httpServer = http.createServer(app);

httpServer.listen(app.get('port'), () => {
    console.log(banner);
    console.log(`\n\n\t    🚀🚀🚀 http://localhost:${app.get('port')} in ${app.get('env')} mode`);
});
