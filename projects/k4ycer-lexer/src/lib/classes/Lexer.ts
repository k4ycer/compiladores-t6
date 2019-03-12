import { Token } from './Token';
import { LexerError } from './LexerError';
import { FSM } from './FSM';

export abstract class Lexer{    
    protected input: string;
    protected position: number;
    protected line: number;
    protected column: number;
    protected fsm: FSM;

    protected endOfFileToken: number
    protected ignoredTokens: number[];

    constructor(input: string, fsm: FSM, endOfFileToken: number, ignoredTokens: number[]){
        this.input = input;
        this.fsm = fsm;
        this.ignoredTokens = ignoredTokens;
        this.position = 0;
        this.line = 0;
        this.column = 0;        
    }

    public tokenize(): Token[]{
        this.position = 0;
        this.line = 0;
        this.column = 0;
        
        let tokens: Token[] = [];
        let token: Token = this.getNextToken();        

        while(token.type != this.endOfFileToken){
            if(this.ignoredTokens.indexOf(token.type) == -1){
                tokens.push(token);                
            }

            try{
                token = this.getNextToken();   
            }catch(e){
                throw new LexerError(e.message, this.line, this.column, tokens);
            }
        }

        return tokens;
    }

    public getNextToken(): Token{        
        if(this.position >= this.input.length){
            return new Token(this.endOfFileToken);
        }

        let input: string = this.input.substr(this.position);
        let { Accepted, AnalyzedString, AcceptingState } = this.fsm.Run(input);
        let token: Token;

        if(!Accepted){
            if(AnalyzedString.length == 0){
                throw new Error("Error: Invalid character " + this.input.charAt(this.position) + " on line " + this.line + ", column " + this.column);
            }  
        }else{ 
            // Reconocer token dependiendo del lexer especifico
            let token: Token = this.recognizeToken(Accepted, AnalyzedString, AcceptingState);

            // Incrementar posicion, linea, columna
            this.increasePointers(token);     
            
            return token;
        }
    }

    public setInput(input: string){
        this.input = input;
    }

    protected recognizeToken(accepted: boolean, analyzedString: string, acceptingState: number): Token{
        throw new Error("Method not implemented");
    }
    
    protected increasePointers(token: Token){
        throw new Error("Method not implemented");
    }
}