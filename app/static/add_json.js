function submit_message() {

    var wordName = document.getElementById("search-value")
    var wordType = document.getElementById("word-type")
    var wordDefinition = document.getElementById("word-definition")
    var a = document.getElementById("my_wordlist")

    var entry = {
        name: wordName.value, 
        type: wordType.innerHTML,
        definition: wordDefinition.innerHTML,
        selected_wordlist: a.options[a.selectedIndex].value
    };

fetch(`${window.origin}/search`, {
method: "POST",
credentials: "include",
body: JSON.stringify(entry),
cache: "no-cache",
headers: new Headers({
  "content-type": "application/json"
    })
})
.then(function(response) {
if (response.status !== 200) {
  console.log(`Looks like there was a problem. Status code: ${response.status}`);
  return;
}
response.json().then(function(data) {
  console.log(data);
});
})
.catch(function(error) {
console.log("Fetch error: " + error);
});
}