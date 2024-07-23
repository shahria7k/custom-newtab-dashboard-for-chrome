chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension installed.");
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message === 'getSystemInfo') {
        chrome.system.cpu.getInfo((cpuInfo) => {
            chrome.system.memory.getInfo((memoryInfo) => {
                chrome.system.storage.getInfo((storageInfo) => {
                    chrome.system.display.getInfo((displayInfo) => {
                        sendResponse({
                            cpuInfo: cpuInfo,
                            memoryInfo: memoryInfo,
                            storageInfo: storageInfo,
                            displayInfo: displayInfo,

                        });
                    }
                    );


                });
            });
        });
        return true; // Keep the message channel open for sendResponse
    }
});
