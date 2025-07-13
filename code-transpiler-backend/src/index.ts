import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { commentRemover } from "./CompilerPhases/lexicalAnaysis/CommentRemover";
import { lexemeGenerator } from "./CompilerPhases/lexicalAnaysis/LexemeGenerator";
import {
  lexicalOutputForFile,
  oneDStrArrayToMultilineStr,
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
    const lexemesPerCodeLine = lexemeGenerator(codeWithoutComments);
    if ("error" in lexemesPerCodeLine) {
      res.json({ error: lexemesPerCodeLine.error });
    } else {
      const lexicalOutputString = lexicalOutputForFile(lexemesPerCodeLine);
      const tokenList = tokenClassifier(lexemesPerCodeLine);
      const tokenListOutputString = tokenListOutputForFile(tokenList);
      const simplifiedTokenRep = simplifyTokensForSyntaxEvaluation(tokenList);
      const simplifiedTokenRepString =
        oneDStrArrayToMultilineStr(simplifiedTokenRep);
      const statementValidity = syntaxGrammarCheck(simplifiedTokenRep);
      const statementValidityString =
        oneDStrArrayToMultilineStr(statementValidity);
      console.log(statementValidity);
      const finalCode = codeGenerator(
        statementValidity,
        lexemesPerCodeLine,
        simplifiedTokenRep
      );
      if (typeof finalCode !== "string") {
        res.json({ error: finalCode.error });
        return;
      } else {
        res.json({
          files: [
            codeWithoutComments,
            lexicalOutputString,
            tokenListOutputString,
            simplifiedTokenRepString,
            statementValidityString,
            finalCode,
          ],
        });
      }
    }
  }
);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
