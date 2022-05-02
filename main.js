document.getElementById("save-button").addEventListener("click", () => {

    var inputValue = document.getElementById("textarea").value;

    chrome.storage.local.set({ "key": inputValue }, function() {});
    window.close();

});

chrome.storage.local.get("key", function(result) {
    if (result.key != undefined) {
        document.getElementById("textarea").value = result.key;
    }
});