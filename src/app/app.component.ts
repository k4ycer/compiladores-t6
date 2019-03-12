import { TokenTypesT6 } from './enums/TokenTypesT6';
import { SyntacticAnalyzerT6 } from './model/SyntacticAnalyzerT6';
import { LexerT6 } from './model/LexerT6';
import { Component } from '@angular/core';
import { Token } from 'projects/k4ycer-lexer/src/public_api';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'T6AnalizadorDescendente';

	lexer: LexerT6;
	syntacticAnalyzer: SyntacticAnalyzerT6;

	ngOnInit(){
		this.lexer = new LexerT6("");
		this.syntacticAnalyzer = new SyntacticAnalyzerT6([]);

		this.compile("2+2*4");
		console.log("------------");
		this.compile("(3+4)");
		console.log("------------");
		this.compile("9++5");
		console.log("------------");
		this.compile("*(6+7)");
		console.log("------------");
		this.compile("14+5/7*(8+9)");
		console.log("------------");
	}	

	compile(input: string){
		let tokens: Token[];

		this.lexer.setInput(input);
		tokens = this.lexer.tokenize();		

		// Add $ token at the end        
		tokens.push(new Token(TokenTypesT6.peso, TokenTypesT6[TokenTypesT6.peso], "$", null, null));
		
		console.log("Input: ", input);
		console.log("Tokens: ", tokens);

		this.syntacticAnalyzer.setTokens(tokens);

		try{
			this.syntacticAnalyzer.analyze();
			console.log("Sintacticamente valido");
		}catch(e){
			console.log("Error en analizador sintáctico: " + e.message );
		}	
	}
}
