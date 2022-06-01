function getArray(length_){
    a_ = [];
    for(let i = 0; i < length_; i++){
        a_.push(0);
    }
    return a_;
}

function checkWord(letters_list, word, hidden_i, fake_i){
    let spots = getArray(word.length);
    for(let i = 0, j = 0; i < letters_list.length; i++, j++){
        if(j >= word.length){
            break;
        }

        if(word[j].charCodeAt() == letters_list[i].charCodeAt()){
            spots[j] = 1;
        }else{
            if(word[j].charCodeAt() < letters_list[i].charCodeAt()){
                i--;
            }else{
                j--;
            }
        }
    }

    let result = spots.reduce((acc, a) => acc + a, 0);
    if((result + hidden_i >= word.length) || ((result <= letters_list.length - fake_i) && (result == word.length))){
        return true;
    }else{
        return false;
    }
}

function organizeWords(word_list){
    let new_word_list = [[word_list[0]]];

    let c = 0;
    for(let i = 1; i < word_list.length; i++){
        if(word_list[i].length == word_list[i-1].length){
            new_word_list[c].push(word_list[i]);
        }else{
            c++;
            new_word_list.push([word_list[i]]);
        }
    }
    return new_word_list;
}

function showWords(){
    let letters_input = document.getElementById("letters").value.split("").sort();
    let words_list_hash = document.getElementById("words_list_hash").innerText.split("\n");
    let words_list = document.getElementById("words_list").innerText.split("\n");

    let fletters_i = parseInt(document.getElementById("fake").value, 10);
    let hletters_i = parseInt(document.getElementById("hidden").value, 10);

    if(isNaN(fletters_i)){
        fletters_i = 0;
    }
    if(isNaN(hletters_i)){
        hletters_i = 0;
    }

    let words_found = []

    for(let i = 0; i < words_list_hash.length; i++){
        let word = words_list_hash[i].trim().split("");

        if (word.length > (letters_input.length + hletters_i - fletters_i)){
            continue;
        }else{
            if(checkWord(letters_input, word, hletters_i, fletters_i) == true){
                words_found.push(words_list[i]);
            }
        }
    }
    words_found.sort((a,b) => b.length - a.length);

    document.getElementById("words_found").replaceChild(setWordSection(organizeWords(words_found)), document.getElementById("words_found").firstChild);
    //return organizeWords(words_found);
}

function setWordSection(word_list){
    //console.log(word_list);
    let new_table = document.createElement("table");
    //new_table.setAttribute("class","word_table");
    new_table.className = "word_table";

    for(let i = -1; i < word_list.length; i++){
        let new_table_row = document.createElement("tr");
        let children = [];

        if(i == -1){
            children = [document.createElement("th"), document.createElement("th")];
            children[0].appendChild(document.createTextNode("Size"));
            children[1].appendChild(document.createTextNode("List"));
        }else{
            children = [document.createElement("td"), document.createElement("td")];
            children[0].appendChild(document.createTextNode(word_list[i][0].length));
            children[1].appendChild(document.createTextNode(word_list[i].join(", ")));
        }
        children[0].className = "word_table";
        children[1].className = "word_table";
        new_table_row.appendChild(children[0]);
        new_table_row.appendChild(children[1]);

        new_table.appendChild(new_table_row);
    }

    return new_table;
}

document.getElementById("submit").addEventListener("click", showWords, false);