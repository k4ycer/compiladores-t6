import { StatesT6 } from '../enums/StatesT6';
import { AlphabetT6 } from '../enums/AlphabetT6';
import { FSM } from 'projects/k4ycer-lexer/src/public_api';


export class FSMT6 extends FSM{
    constructor(){
        let alphabet: string[] = Object.keys(AlphabetT6).map(k => AlphabetT6[k as any]);
        let states: number[] = FSM.EnumToArray(StatesT6);
        let initialState: number = StatesT6.Initial;
        let acceptingStates: number[] = [StatesT6.IdentifierPart, StatesT6.Plus, StatesT6.Minus, StatesT6.Asterisk, StatesT6.Slash, StatesT6.Dollar, StatesT6.IntegerLiteral, StatesT6.OpenParen, StatesT6.CloseParen];        

        super(alphabet, states, initialState, acceptingStates);
    }

    buildTransitionTable(){
        // +
        this.addTransition(StatesT6.Initial, StatesT6.Plus, AlphabetT6.plus);

        // -
        this.addTransition(StatesT6.Initial, StatesT6.Minus, AlphabetT6.minus);

        // *
        this.addTransition(StatesT6.Initial, StatesT6.Asterisk, AlphabetT6.asterisk);

        // /
        this.addTransition(StatesT6.Initial, StatesT6.Slash, AlphabetT6.slash);

        // (
        this.addTransition(StatesT6.Initial, StatesT6.OpenParen, AlphabetT6.openParen);

        // )
        this.addTransition(StatesT6.Initial, StatesT6.CloseParen, AlphabetT6.closeParen);

        // $
        this.addTransition(StatesT6.Initial, StatesT6.Dollar, AlphabetT6.$);

        // Identifiers
        let identifierStarts = [AlphabetT6.$, AlphabetT6._, AlphabetT6.A, AlphabetT6.B, AlphabetT6.C, AlphabetT6.D, AlphabetT6.E, AlphabetT6.F, AlphabetT6.G, AlphabetT6.H, AlphabetT6.I, AlphabetT6.J, AlphabetT6.K, AlphabetT6.L, AlphabetT6.M, AlphabetT6.N, AlphabetT6.O, AlphabetT6.P, AlphabetT6.Q, AlphabetT6.R, AlphabetT6.S, AlphabetT6.T, AlphabetT6.U, AlphabetT6.V, AlphabetT6.W, AlphabetT6.X, AlphabetT6.Y, AlphabetT6.Z, AlphabetT6.a, AlphabetT6.b, AlphabetT6.c, AlphabetT6.d, AlphabetT6.e, AlphabetT6.f, AlphabetT6.g, AlphabetT6.h, AlphabetT6.i, AlphabetT6.j, AlphabetT6.k, AlphabetT6.l, AlphabetT6.m, AlphabetT6.n, AlphabetT6.o, AlphabetT6.p, AlphabetT6.q, AlphabetT6.r, AlphabetT6.s, AlphabetT6.t, AlphabetT6.u, AlphabetT6.v, AlphabetT6.w, AlphabetT6.x, AlphabetT6.y, AlphabetT6.z];
        let identifierParts = identifierStarts.concat([AlphabetT6._0, AlphabetT6._1, AlphabetT6._2, AlphabetT6._3, AlphabetT6._4, AlphabetT6._5, AlphabetT6._6, AlphabetT6._7, AlphabetT6._8, AlphabetT6._9]);
        this.addTransitionMultipleInputs(StatesT6.Initial, StatesT6.IdentifierStart, identifierStarts);
        this.addTransitionMultipleInputs(StatesT6.IdentifierStart, StatesT6.IdentifierPart, identifierParts);

        // Numeric literal
        let integerStarts = [AlphabetT6._1, AlphabetT6._2, AlphabetT6._3, AlphabetT6._4, AlphabetT6._5, AlphabetT6._6, AlphabetT6._7, AlphabetT6._8, AlphabetT6._9];
        let integerParts = [AlphabetT6._0, AlphabetT6._1, AlphabetT6._2, AlphabetT6._3, AlphabetT6._4, AlphabetT6._5, AlphabetT6._6, AlphabetT6._7, AlphabetT6._8, AlphabetT6._9];
        this.addTransitionMultipleInputs(StatesT6.Initial, StatesT6.IntegerLiteral, integerStarts);
        this.addTransitionMultipleInputs(StatesT6.IntegerLiteral, StatesT6.IntegerLiteral, integerParts);        

        // Zero
        this.addTransition(StatesT6.Initial, StatesT6.Zero, AlphabetT6._0);
    }
}