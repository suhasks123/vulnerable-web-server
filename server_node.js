// Requiring modules
const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

// The following server hosts files present
// in the `public` folder. The vulnerability
// here arises from the fact that the files
// are accessed directly by their URIs.

// Creating server to accept request
http.createServer((req, res) => {

    // Parsing the URL
    var request = url.parse(req.url, true);
    var query = request.query;

    // Extracting the path of file
    var unsanitized_path = request.pathname;

    // Perform the path sanitation by removing `../`
    // This is the first round of sanitization
    var sanitized_path = path.normalize(unsanitized_path)

    // Point the user to the root HTML file
    if (unsanitized_path == "/") {
        unsanitized_path = "./public/index.html"

        // Check if there is a path in the query string
        if ("file" in query) {
            unsanitized_path = decodeURIComponent(query["file"])
        }
    }

    var is_double_sanitized = false

    // Point the user to the root HTML file when using
    // sanitized path
    if (sanitized_path == "/") {
        sanitized_path = "./public/index.html"

        // Check if there is a path in the query string
        if ("file" in query) {
            sanitized_path = decodeURIComponent(query["file"])
        }

        var double_sanitized_path = path.normalize(sanitized_path)
        is_double_sanitized = true
    }

    // Uncomment the path to be used
    final_path = unsanitized_path
    if (is_double_sanitized) {
        final_path = double_sanitized_path
    } else {
        final_path = sanitized_path
    }

    // Path refinements
    var filePath = path.join(__dirname,
        final_path).split("%20").join(" ");

    // Checking if the path exists
    fs.exists(filePath, function (exists) {

        if (!exists) {
            res.writeHead(404, {
                "Content-Type": "text/plain" });
            res.end("404 Not Found\n");
            return;
        }

        // Extracting file extension
        var ext = path.extname(unsanitized_path);

        // Setting default Content-Type
        var contentType = "text/plain";

        // If file is HTML
        if (filePath.endsWith(".html")) {
            contentType = "text/html";
        } else if (filePath.endsWith(".jpg")) {
            contentType = "image/jpeg";
        }

        // Checking if the extension of
        // image is '.png'
        if (ext === ".jpg") {
            contentType = "image/jpg";
        }

        // Setting the headers
        res.writeHead(200, {
            "Content-Type": contentType });

        // Reading the file
        fs.readFile(filePath,
            function (err, content) {
                // Serving the image
                res.end(content);
            });
    });
})

// Listening to the PORT: 3000
.listen(3000, "127.0.0.1");