const http = require("http");
const fs = require("fs");
const fileName = "./film.mp4";

http.createServer(async (req, res) => {
    const readScream = fs.createReadStream(fileName);
    const { size } = fs.statSync(fileName);
    const rang = req.headers.range;

    if (rang) {
        let [start, end] = rang.replace(/bytes=/, "").split("-")
        start = parseInt(start, 10)
        end = end ? parseInt(start, 10) : size - 1;

        res.writeHead(206,
            {
                "Content-range": `bytes ${start}-${end}/${size}`,
                "Accept-range": "bytes",
                "Content-length": (start - end) + 1,
                "Content-type": "video/mp4",
            }
        )
        fs.createReadStream(fileName).pipe(res)
        
    } else {
        res.writeHead(200, {
            "Content-length": size,
             "Content-type": "video/mp4"
            })
        readScream.pipe(res)
    }

}).listen(3000, () => console.log("Server ran on http://localhost:3000"))