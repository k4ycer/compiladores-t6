import { FSMResult } from '../interfaces/FSMResult';

export abstract class FSM{    
    protected alphabet: string[];
    protected states: number[];
    protected acceptingStates: number[];
    protected notAcceptingStates: number[];
    protected initialState: number;
    protected transitionTable: number[][];    

    private alphabetCharcodes: number[];

    constructor(alphabet: string[], states: number[], initialState: number, acceptingStates: number[], notAcceptingStates?: number[], transitionTable?: number[][]){
        this.alphabet = alphabet;
        this.states = states;
        this.acceptingStates = acceptingStates;
        this.notAcceptingStates = notAcceptingStates;
        this.initialState = initialState;
        this.transitionTable = transitionTable;

        this.alphabetCharcodes = this.alphabetToCharcodes(alphabet);

        if(!transitionTable){
            this.initializeTransitionTable();
            this.buildTransitionTable();
        }
    }

    protected addTransition(sourceState: number, destinationState: number, input: string) {
        let column = this.inputToColumn(input);
        this.transitionTable[sourceState][column] = destinationState;
    }

    protected buildTransitionTable(){
        throw new Error("Method not implemented");      
    }

    private initializeTransitionTable(){
        this.transitionTable = [];
        for(let i = 0; i < this.states.length; i++){
            this.transitionTable[i] = [];
            for(let j = 0; j < this.alphabet.length; j++){
                this.transitionTable[i][j] = -1;
            }
        }
    }

    public Run(input: string): FSMResult{
        let currentState: number = this.initialState,
            nextState: number = 0,
            position: number = 0,
            analyzedString: string = "";

        while(nextState != -1 && position < input.length){
            nextState = this.GetNextState(currentState, input.charAt(position));
            if(nextState != -1){                                
                analyzedString += input.charAt(position);
                currentState = nextState;
                position++;
            }
        }

        return <FSMResult>{
            Accepted: this.acceptingStates.indexOf(currentState) != -1,
            AnalyzedString: analyzedString,
            AcceptingState: currentState
        };
    }

    public GetNextState(currentState: number, input: string): number{
        let column = this.inputToColumn(input);

        // Input is not in the alphabet
        if(column == -1){
            return -1;
        }

        return this.transitionTable[currentState][column];
    }    

    public static EnumToArray(enumerator: any){
        let arr = [];
        let counter = 0;
        for(let item in enumerator){
            if(isNaN(Number(item))){
                arr.push(counter);
                counter++;
            }            
        }
        return arr;
    }

    private inputToColumn(input: string): number{
        let counter = 0;
        let inputCharcode = input.charCodeAt(0);
        for(let alphabetCharcode of this.alphabetCharcodes){
            if(alphabetCharcode == inputCharcode){
                return counter;
            }
            counter++;   
        }

        return -1;
    }

    protected addTransitionMultipleInputs(sourceState: number, destinationState: number, inputs: string[]){
        for(let input of inputs){
            this.addTransition(sourceState, destinationState, input);
        }
    }

    protected addTransitionAllInputs(sourceState: number, destinationState: number){
        this.alphabet.forEach(alphabetChar => {
            this.addTransition(sourceState, destinationState, alphabetChar);
        });
    }

    private alphabetToCharcodes(alphabet: string[]): number[]{
        return alphabet.map(a => a.charCodeAt(0));
    }
}