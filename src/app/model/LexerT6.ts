import { StatesT6 } from '../enums/StatesT6';
import { TextToToken } from '../enums/TextToToken';
import { FSMT6 } from './FSMT6';
import { TokenTypesT6 } from '../enums/TokenTypesT6';
import { Lexer, Token } from 'projects/k4ycer-lexer/src/public_api';

export class LexerT6 extends Lexer{    
    constructor(input: string){                
        super(input, new FSMT6(), TokenTypesT6.endOfFile, []);
    }
    
    recognizeToken(accepted: boolean, analyzedString: string, acceptingState: number): Token{
        let tokenType = TextToToken[analyzedString]; 
        let token;        

        //Integer literal
        if(acceptingState == StatesT6.IntegerLiteral || acceptingState == StatesT6.Zero){
            token = new Token(TokenTypesT6.num, TokenTypesT6[TokenTypesT6.num], analyzedString, this.line, this.column);            
            return token;
        }

        // Identifier or other token
        if(tokenType == null || tokenType == undefined){
            token = new Token(TokenTypesT6.id, TokenTypesT6[TokenTypesT6.id], analyzedString, this.line, this.column);                
        }else{
            token = new Token(tokenType, TokenTypesT6[tokenType], analyzedString, this.line, this.column);
        }

        return token;
    }

    increasePointers(token: Token){
        this.column += token.value.length;
        this.position += token.value.length;
    }
}