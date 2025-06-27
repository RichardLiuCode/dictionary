document.getElementById("SearchWordBTN").addEventListener("click", function () {
    getData(document.getElementById("wordInput").value)
})
window.onload = function () {
    var inputByURL = new URLSearchParams(window.location.search);
    if (inputByURL.get("q")) {
        getData(inputByURL.get("q"));
    }
}
function getData(input) {

    fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + input)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {  
            var resultDisplay = document.getElementById("resultDisplay");
            resultDisplay.innerHTML = "";
            var result = data[0]
            console.log(result);
            var displayTitle = document.createElement("h1");
            displayTitle.style = "text-align:center;color:blue"
            displayTitle.innerText = result.word;
            resultDisplay.appendChild(displayTitle);
            var enter = document.createElement("hr")
            enter.style = "border:none;height:2px;background-color:white"
            resultDisplay.appendChild(enter);
            for (var ia = 0; ia < result.meanings.length; ia++) {

                var WordType = document.createElement("h2");
                WordType.innerHTML = result.meanings[ia].partOfSpeech;
                resultDisplay.appendChild(WordType);
                var definitionsList = document.createElement("ol")
                for (var i = 0; i < result.meanings[ia].definitions.length; i++) {
                    var deItem = document.createElement("li")
                    deItem.innerHTML = result.meanings[ia].definitions[i].definition + "<br>" + "Example: " + ((result.meanings[ia].definitions[i].example) || "No Example") + "<br><br>";
                    definitionsList.appendChild(deItem);

                }
                var synonyms = document.createElement("p");
                synonyms.innerText = result.meanings[ia].synonyms.join(", ")
                resultDisplay.appendChild(definitionsList);
                resultDisplay.appendChild(synonyms);
                resultDisplay.style.display = "revert"
                document.getElementById("wordInput").value = result.word;
            }
        })
        .catch(function(error){
            document.getElementById("resultDisplay").innerHTML=
            "<h1 style='text-align:center;font-size:100px;'>404</h1>"+
            "<p style='text-align:center;'>Cannot find the word: "+input+" !</p>"
            document.getElementById("resultDisplay").style.display = "revert"
        })

}
