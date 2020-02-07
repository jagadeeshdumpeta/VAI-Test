const getLexicalDensityAPI = require('../src/getLexicalDensity.js');
const expect = require('chai').expect;
var request = require('request');

describe("getLexicalDensity Tests", () => {
    it("test 1 - By providing valid Input, Gets overall LexicalDensity ", () => {
      var result = getLexicalDensityAPI("Kim loves going ​to the ​cinema", 'http://localhost:3000/complexity', ['the']);
      expect(result.data.overall_ld).to.equal(0.8333333333333334);     
    });

    it("test 2 - By providing In valid Input with 120 words, Gets error message", () => {
      var error = getLexicalDensityAPI("Kim loves going ​to the ​cinema Kim loves going ​to the ​cinema Kim loves going ​to the ​cinema Kim loves going ​to the ​cinema Kim loves going ​to the ​cinema Kim loves going ​to the ​cinema Kim loves going ​to the ​cinema Kim loves going ​to the ​cinema Kim loves going ​to the ​cinema Kim loves going ​to the ​cinema Kim loves going ​to the ​cinema Kim loves going ​to the ​cinema Kim loves going ​to the ​cinema Kim loves going ​to the ​cinema Kim loves going ​to the ​cinema Kim loves going ​to the ​cinema Kim loves going ​to the ​cinema Kim loves going ​to the ​cinema Kim loves going ​to the ​cinema Kim loves going ​to the ​cinema", 'http://localhost:3000/complexity', ['the']);
      expect(error).to.equal("Invalid input");
    });

    it("test 3 - By providing In valid Input with 50 words but morethan 1000 characters, Gets error message", () => {
      var error = getLexicalDensityAPI("dfdsfdfsdfsdfdfdfdds dfdsfdfsdfsdfdfdfdds dfdsfdfsdfsdfdfdfdds dfdsfdfsdfsdfdfdfdds dfdsfdfsdfsdfdfdfdds dfdsfdfsdfsdfdfdfdds dfdsfdfsdfsdfdfdfdds dfdsfdfsdfsdfdfdfdds dfdsfdfsdfsdfdfdfdds dfdsfdfsdfsdfdfdfdds dfdsfdfsdfsdfdfdfdds dfdsfdfsdfsdfdfdfdds dfdsfdfsdfsdfdfdfdds dfdsfdfsdfsdfdfdfdds dfdsfdfsdfsdfdfdfdds dfdsfdfsdfsdfdfdfdds dfdsfdfsdfsdfdfdfdds dfdsfdfsdfsdfdfdfdds dfdsfdfsdfsdfdfdfdds dfdsfdfsdfsdfdfdfdds dfdsfdfsdfsdfdfdfdds dfdsfdfsdfsdfdfdfdds dfdsfdfsdfsdfdfdfdds dfdsfdfsdfsdfdfdfdds dfdsfdfsdfsdfdfdfdds dfdsfdfsdfsdfdfdfdds dfdsfdfsdfsdfdfdfdds dfdsfdfsdfsdfdfdfdds dfdsfdfsdfsdfdfdfdds dfdsfdfsdfsdfdfdfdds dfdsfdfsdfsdfdfdfdds dfdsfdfsdfsdfdfdfdds dfdsfdfsdfsdfdfdfdds dfdsfdfsdfsdfdfdfdds dfdsfdfsdfsdfdfdfdds dfdsfdfsdfsdfdfdfdds dfdsfdfsdfsdfdfdfdds dfdsfdfsdfsdfdfdfdds dfdsfdfsdfsdfdfdfdds dfdsfdfsdfsdfdfdfdds dfdsfdfsdfsdfdfdfdds dfdsfdfsdfsdfdfdfdds dfdsfdfsdfsdfdfdfdds dfdsfdfsdfsdfdfdfdds dfdsfdfsdfsdfdfdfdds dfdsfdfsdfsdfdfdfdds dfdsfdfsdfsdfdfdfdds dfdsfdfsdfsdfdfdfdds dfdsfdfsdfsdfdfdfdds dfdsfdfsdfsdfdfdfdds dfdsfdfsdfsdfdfdfdds dfdsfdfsdfsdfdfdfdds dfdsfdfsdfsdfdfdfdds dfdsfdfsdfsdfdfdfdds dfdsfdfsdfsdfdfdfdds", ['the']);
      expect(error).to.equal("Invalid input");
    });

    it("test 4 - By providing valid Input with mode in route, Gets each senetence LD and Overall LD ", () => {
      var result3 = getLexicalDensityAPI("Kim loves playing the chess. He likes music.", 'http://localhost:3000/complexity?mode=verbose', ['the']);
      expect(result.data.sentence_ld[0]).to.equal(0.8);  
      expect(result.data.sentence_ld[1]).to.equal(1); 
      expect(result.data.overall_ld).to.equal(0.875);     
    });

  });
