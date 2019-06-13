import { HorizontalAlignment } from "cli-table3";
import { PlatformAddress, U64 } from "codechain-primitives";
import { SDK } from "codechain-sdk";
import { SignedTransaction } from "codechain-sdk/lib/core/classes";
import { KeyStoreType } from "codechain-sdk/lib/key";
export declare function newSDK(params: {
    server: string;
    keyStoreType?: KeyStoreType;
    options?: {
        transactionSigner?: string;
        fallbackServers?: string[];
    };
}): Promise<SDK>;
export declare function prologue(argv: {
    "rpc-server": string;
    "keys-path": string;
}): Promise<{
    sdk: SDK;
    networkId: string;
    date: Date;
    blockNumber: number;
    blockHash: import("codechain-sdk/lib/core/classes").H256;
}>;
export declare function askPasspharaseFor(account: PlatformAddress): Promise<string>;
export declare function waitForTx(sdk: SDK, signed: SignedTransaction): Promise<number>;
export declare function createTable(head: string[], colAligns?: HorizontalAlignment[]): any[][];
export declare function percent(a: U64, b: U64): string;
export declare function plusChangeArgs(a: U64, b: U64): string[];
export declare function minusChangeArgs(a: U64, b: U64): string[];
export declare function humanizeTimstamp(ts: number, options?: {
    current?: number;
    precision?: number;
    limit?: number;
}): string | null;
export declare function formatTimestamp(ts: number, options?: {
    current?: number;
    precision?: number;
    limit?: number;
}): string;
export declare function asyncHandler<T>(handler: (argv: T) => Promise<void>): (argv: T) => Promise<void>;
export declare function coerce<T>(name: string, func: (arg: any) => T): (arg: any) => T;
