chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    id: "openInSafari",
    title: "사파리에서 열기",
    contexts: ["page"],
  });
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
  if (info.menuItemId == "openInSafari") {
    const url = tab.url;
    openInSafari(url);
  }
});

function openInSafari(url) {
  chrome.runtime
    .sendNativeMessage("com.junseok.openinsafari", { url: url })
    .then((response) => {
      if (chrome.runtime.lastError) {
        console.error(JSON.stringify(chrome.runtime.lastError));
      } else {
        console.log("Message sent to native app:", JSON.stringify(response));
      }
    })
    .catch((error) => {
      console.error("Failed to send message to native app:", error);
    });
}
