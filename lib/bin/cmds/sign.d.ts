import { PlatformAddress } from "codechain-primitives/lib";
import * as yargs from "yargs";
import { GlobalParams } from "..";
interface SignParams extends GlobalParams {
    account: PlatformAddress;
    message: string;
}
export declare const module: yargs.CommandModule<GlobalParams, SignParams>;
export {};
