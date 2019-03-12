import { Token } from './Token';

export abstract class SyntacticAnalyzer{

    protected tokens: Token[];
    protected currentToken: Token;
    protected currentTokenPos: number;
    protected initialRule: () => void;

    constructor(tokens: Token[]){
        this.tokens = tokens;                
    }

    public analyze(){
        this.currentTokenPos = 0;
        this.getToken();
        this.initialRule();
    }

    public setTokens(tokens: Token[]){
        this.tokens = tokens;
    }

    protected setInitialRule(initialRule: () => void){
        this.initialRule = initialRule;
    }    

    protected getToken(){
        this.currentToken = this.tokens[this.currentTokenPos];
    }

    protected move(){
        this.currentTokenPos++;
        this.getToken();
    }

    protected consume(tokenType: number){
        if(tokenType == this.currentToken.type){
            this.move();
        }else{
            throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
}