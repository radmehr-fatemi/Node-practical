const http = require("http");
const multiparty = require("multiparty");
const fs = require("fs");
const fileName = "./streams";

http.createServer(async (req, res) => {
    const { url, method } = req;

    switch (method) {
        case "POST":
            if (url == "/") {
                const form = new multiparty.Form();
                form.parse(req)

                form.on("part", (part) => {
                    part.pipe(fs.createWriteStream(`${fileName}/${part.filename}`))
                        .on("close", () => {
                            res.writeHead(200, { "Content-type": "text/html" });
                            res.end(`
                            <h1>File uploaded : ${part.filename}</h1>
                    `)
                        })
                })
            }
            break

        default:
            res.writeHead(200, { "Content-type": "text/html" });
            res.end(`
                    <form enctype="multipart/form-data" method="POST" action="/">
                    <input type="file" name="upload-file">
                    <button>Upload file</button>
                    </form>
                    `)
    }

}).listen(3000, () => console.log("Server ran on http://localhost:3000"))