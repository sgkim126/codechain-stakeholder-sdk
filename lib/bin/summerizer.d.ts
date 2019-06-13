import { PlatformAddress, U64 } from "codechain-primitives/lib";
import { SDK } from "codechain-sdk";
import { Delegation } from "../src";
interface DelegationFrom {
    delegator: PlatformAddress;
    quantity: U64;
}
declare class QuantitySummerizableArray<T extends {
    quantity: U64;
}> {
    values: T[];
    private _sum?;
    readonly sum: U64;
}
export declare class AccountSummary {
    readonly balance: U64;
    undelegated: U64;
    delegationsTo: QuantitySummerizableArray<Delegation>;
    delegationsFrom: QuantitySummerizableArray<DelegationFrom>;
}
export declare function summarize(sdk: SDK, blockNumber: number): Promise<{
    totalCCS: U64;
    ccsHolders: PlatformAddress[];
    get(account: PlatformAddress): AccountSummary;
    delegations(delegator: PlatformAddress, delegatee: PlatformAddress): U64;
}>;
export declare function sumU64(values: U64[]): U64;
export {};
