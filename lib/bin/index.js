#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var yargs = require("yargs");
var delegate_1 = require("./cmds/delegate");
var revoke_1 = require("./cmds/revoke");
var selfNominate_1 = require("./cmds/selfNominate");
var show_1 = require("./cmds/show");
var sign_1 = require("./cmds/sign");
var transfer_1 = require("./cmds/transfer");
var _argv = yargs
    .scriptName("ccstake")
    .locale("LC_ALL")
    .option("keys-path", {
    describe: "The path to storing the keys",
    string: true,
    normalize: true,
    default: "./keystore.db"
})
    .option("rpc-server", {
    describe: "The RPC server URL",
    string: true,
    default: "https://rpc.codechain.io/"
})
    .command(show_1.module)
    .command(transfer_1.module)
    .command(delegate_1.module)
    .command(revoke_1.module)
    .command(selfNominate_1.module)
    .command(sign_1.module)
    .demandCommand()
    .recommendCommands()
    .showHelpOnFail(true)
    .help()
    .strict().argv;
