import { PlatformAddress, U64 } from "codechain-primitives/lib";
import * as yargs from "yargs";
import { GlobalParams } from "..";
interface DelegateParams extends GlobalParams {
    from: PlatformAddress;
    to: PlatformAddress;
    quantity: U64;
    fee: number;
}
export declare const module: yargs.CommandModule<GlobalParams, DelegateParams>;
export {};
