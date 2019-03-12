import { Token } from 'projects/k4ycer-lexer/src/public_api';
import { SyntacticAnalyzer } from 'projects/k4ycer-syntactic-analyzer/src/public_api';
import { TokenTypesT6 } from '../enums/TokenTypesT6';


export class SyntacticAnalyzerT6 extends SyntacticAnalyzer{
    constructor(tokens: Token[]){        
        super(tokens);

        this.setInitialRule(this.E);
    }

    private E(){
        switch(this.currentToken.type){
            case TokenTypesT6.pizq:
            case TokenTypesT6.num:
            case TokenTypesT6.id:
                this.T();
                this.Ep();
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private Ep(){
        switch(this.currentToken.type){
            case TokenTypesT6.mas:
                this.move()
                this.T();
                this.Ep();
                break;
            case TokenTypesT6.menos:
                this.move();
                this.T();
                this.Ep();
                break;
            case TokenTypesT6.pder:
            case TokenTypesT6.peso:
                return;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private T(){
        switch(this.currentToken.type){
            case TokenTypesT6.pizq:
            case TokenTypesT6.num:
            case TokenTypesT6.id:
                this.F();
                this.Tp();
                break;      
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private Tp(){
        switch(this.currentToken.type){
            case TokenTypesT6.por:                                
                this.move();
                this.F();
                this.Tp();
                break;
            case TokenTypesT6.div:                                
                this.move();
                this.F();
                this.Tp();
                break;
            case TokenTypesT6.mas:
            case TokenTypesT6.menos:
            case TokenTypesT6.pder:
            case TokenTypesT6.peso:
                return;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private F(){
        switch(this.currentToken.type){
            case TokenTypesT6.pizq:
                this.move();
                this.E();
                this.move();
                break;
            case TokenTypesT6.num:
                this.move();
                break;
            case TokenTypesT6.id:
                this.move();
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
}