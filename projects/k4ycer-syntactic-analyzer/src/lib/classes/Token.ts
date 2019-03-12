export class Token{
    public type: number;
    public typeString: string;
    public value: string;
    public line: number;
    public column: number;

    constructor(type?: number, typeString?: string, value?: string, line?: number, column?: number){        
        this.type = type;
        this.typeString = typeString;
        this.value = value;
        this.line = line;
        this.column = column;
    }
}