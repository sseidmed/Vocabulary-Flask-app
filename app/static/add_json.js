console.log("connected!")
function submit_message() {

    var wordName = document.getElementById("word-name")
    var wordType = document.getElementById("word-type")
    var wordDefinition = document.getElementById("word-definition")
    var a = document.getElementById("my_wordlist")
    var entry = {};

    if(document.body.contains(document.getElementById('example1'))){
      var example1 = document.getElementById("example1");
      entry = {
        name: wordName.innerHTML, 
        type: wordType.innerHTML,
        definition: wordDefinition.innerHTML,
        example1: example1.innerHTML,
        selected_wordlist: a.options[a.selectedIndex].value
    };
  } else{
          entry = {
            name: wordName.innerHTML, 
            type: wordType.innerHTML,
            definition: wordDefinition.innerHTML,
            selected_wordlist: a.options[a.selectedIndex].value
        };
  }


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