import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { commentRemover } from "./CompilerPhases/lexicalAnaysis/CommentRemover";
import { lexemeGenerator } from "./CompilerPhases/lexicalAnaysis/LexemeGenerator";
import {
  lexicalOutputForFile,
  oneDStrArrayToMultilineStr,
  symbolTableForFile,
  tokenListOutputForFile,
} from "./OutputFilesGenerator";
import { tokenClassifier } from "./CompilerPhases/lexicalAnaysis/tokenClassifier";
import { simplifyTokensForSyntaxEvaluation } from "./CompilerPhases/simplifyTokensForSyntaxEvaluation";
import { syntaxGrammarCheck } from "./CompilerPhases/syntaxGrammerChecker";
import { codeGenerator } from "./CompilerPhases/codeGenerator";

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

interface TranspileRequest {
  sourceCode: string;
  sourceLang: string;
  targetLang: string;
}

// Sample endpoint
app.post(
  "/api/transpile",
  (req: Request<{}, {}, TranspileRequest>, res: Response) => {
    const { sourceCode, sourceLang, targetLang } = req.body;
    const codeWithoutComments = commentRemover(sourceCode);
    if(typeof codeWithoutComments!== 'string') {
      res.json ({error: codeWithoutComments.error});
    }
    else{
    const lexemesPerCodeLine = lexemeGenerator(codeWithoutComments);
    if ("error" in lexemesPerCodeLine) {
      res.json({ error: lexemesPerCodeLine.error });
    } else {
      const lexicalOutputString = lexicalOutputForFile(lexemesPerCodeLine);
      const tokenList = tokenClassifier(lexemesPerCodeLine);
      const tokenListOutputString = tokenListOutputForFile(tokenList);
      const simplifiedTokenRep = simplifyTokensForSyntaxEvaluation(tokenList);
      const simplifiedTokenRepString =
        "Simplified Token Representation of the python source code\n----------------------------------------------------------\n"+oneDStrArrayToMultilineStr(simplifiedTokenRep);
      const statementValidity = syntaxGrammarCheck(simplifiedTokenRep);
      const statementValidityString ="Type of the statements in the source code\n-----------------------------------------\n\n"+
        oneDStrArrayToMultilineStr(statementValidity);
      console.log(statementValidity);
      const codeGenerationOutput = codeGenerator(
        statementValidity,
        lexemesPerCodeLine,
        simplifiedTokenRep
      );
      if ("error" in codeGenerationOutput) {
        res.json({ error: codeGenerationOutput.error });
        return;
      } else {
        const symbolTableString = symbolTableForFile(codeGenerationOutput.symbolTable);
        res.json({
            codeWithoutComments,
            lexicalOutputString,
            tokenListOutputString,
            simplifiedTokenRepString,
            statementValidityString,
            symbolTableString,
            finalCode: codeGenerationOutput.code,
        });
      }
    }
  }
}
);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
