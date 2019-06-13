import { PlatformAddress, U64 } from "codechain-primitives/lib";
import * as yargs from "yargs";
import { GlobalParams } from "..";
interface RevokeParams extends GlobalParams {
    delegator: PlatformAddress;
    delegatee: PlatformAddress;
    quantity: U64;
    fee: number;
}
export declare const module: yargs.CommandModule<GlobalParams, RevokeParams>;
export {};
