const fs = require("fs");
const { exec } = require("child_process");

const logFilePath =
  "/Users/jangjunseok/Desktop/playground/open-in-safari/native-messaging/debug.log";

function log(message) {
  fs.appendFileSync(logFilePath, message + "\n");
}

process.stdin.on("data", (data) => {
  // 메시지의 길이를 나타내는 4바이트를 읽어옵니다.
  const messageLength = data.readUInt32LE(0);

  // 메시지 길이에 따라 나머지 메시지를 읽어옵니다.
  const message = data.slice(4, 4 + messageLength).toString("utf8");
  log("Received message: " + message);

  let parsedMessage;
  try {
    parsedMessage = JSON.parse(message);
  } catch (e) {
    log("Failed to parse JSON message: " + e.message);
    return;
  }

  const url = parsedMessage.url || "";
  log("Extracted URL: " + url);

  exec(
    `osascript -e 'tell application "Safari" to activate' -e 'tell application "Safari" to open location "${url}"'`,
    (err, stdout, stderr) => {
      if (err) {
        log("AppleScript command failed: " + stderr);
        return;
      }
      log("Script executed successfully: " + stdout);
      process.stdout.write(JSON.stringify({ status: "success" }));
    }
  );
});
