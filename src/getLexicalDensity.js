const express =  require('express');
const fs =  require('fs');
const url =  require('url');
const app = express();
app.use(express.json());

//Route to get lexical density of given input which internally calls API.
app.get('/complexity', (req, res) => {
    const data = fs.readFileSync('./NonLexicalWords.txt', 'utf8');
    const nonLexicalWords = data.split(",");
    const result = getLexicalDensity(req.body.input, req.url,nonLexicalWords);
    res.send(result);
});

//API to calculate lexical density of  given input according to the route and non lexical words provided.
function getLexicalDensity (inputText, reqUrl, nonLexicalWords) {
    const totalWords = inputText.split(" "); 
    if(totalWords.length <= 100 && inputText.length <= 1000){
        let q = url.parse(reqUrl, true).query;
        let sentence_ld = [];        
        const lexicalWords = totalWords.filter(x => !nonLexicalWords.includes(x));
        const overall_ld = lexicalWords.length/totalWords.length;
        if(q.mode == "verbose"){
            let sentences = inputText.match(/[^.?!]+[.!?]+[\])'"`’”]*/g);
            if(sentences != null){
            sentences.forEach((sentence) => {
                const totalSentenceWords = sentence.split(" ");
                const sentenceLexicalWords = totalSentenceWords.filter(x => !nonLexicalWords.includes(x));
                sentence_ld.push(sentenceLexicalWords.length/totalSentenceWords.length);
            });
            }
            return ({data:{sentence_ld:sentence_ld, overall_ld:overall_ld}});
        }
        else{
            return ({data:{overall_ld:overall_ld}});
        }        
    }
    else{    
            return "Invalid input";
        }
}

app.listen(3000, () =>{
    console.log(`Listening on port 3000..`)
});

//Route to add new non lexical words to file NonLexicalWords.txt.
app.get('/addNonLexicalWord',(req, res) => {
    fs.appendFile('./NonLexicalWords.txt', ',newWord', function (err) {
        if (err) throw err;
        console.log('Updated!');
      });
});

//exporting API.
module.exports = function getLexicalDensityAPI(inputText, reqUrl, nonLexicalWords){    
    return result = getLexicalDensity(inputText, reqUrl, nonLexicalWords);
    console.log(result);
};
