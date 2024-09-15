import testParseHttpScript from "./parceHttpScript.test.js";
import testHttpScript from "./httpScript.test.js";

function testAll() {
  testParseHttpScript()
  testHttpScript()

  console.log('All tests OK')
}

testAll()
