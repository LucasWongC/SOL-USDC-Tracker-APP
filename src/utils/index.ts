import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID, USDC_ADDRESS } from "constant";
import { PublicKey } from "@solana/web3.js";

function getAssociatedTokenAddress(owner: string) {
    const [address] = PublicKey.findProgramAddressSync(
        [
            new PublicKey(owner).toBuffer(), 
            new PublicKey(TOKEN_PROGRAM_ID).toBuffer(), 
            new PublicKey(USDC_ADDRESS).toBuffer()
        ],
        new PublicKey(ASSOCIATED_TOKEN_PROGRAM_ID)
    );
    return address;
}

export function truncateAddress(address: string, showLength: number) {
    return address.slice(0, showLength / 2) + "..." + address.slice(-showLength / 2);
}

function extractUSDCAddresses(transaction: any) {
    const owners = transaction.transaction.meta.postTokenBalances.filter((postTokenBalance: any) =>
        postTokenBalance.mint === USDC_ADDRESS
    ).map((postTokenBalance: any) => postTokenBalance.owner);
    return owners.concat(owners.map((owner: string) => 
        getAssociatedTokenAddress(owner).toString()
    ));
}

export function getAmount(parsed: any) {
    if (parsed.type === "transfer") return parsed.info.amount / 1e6;
    if (parsed.type === "transferChecked") return parsed.info.tokenAmount.uiAmount;
}

function isUSDCTransfer(instruction: any, usdcAddresses: Array<string>) {
    if (instruction.program === "spl-token" && instruction?.parsed?.info) {
        const { parsed } = instruction;
        if (parsed.type === "transferChecked") {
            if (parsed.info.mint === USDC_ADDRESS) {
                return true;
            }
        }
        if (parsed.type === "transfer") {
            if (usdcAddresses.includes(parsed.info.source) || usdcAddresses.includes(parsed.info.destination)) {
                return true;
            }
        }
    }
    return false;
}

export function extractUSDCTransfers(transaction: any) {
    const usdcAddresses: Array<string> = extractUSDCAddresses(transaction);
    let instructions: Array<any> = transaction.transaction.transaction.message.instructions;
    (transaction.transaction.meta?.innerInstructions || []).forEach((innerInstruction: any) => {
        instructions = instructions.concat(innerInstruction.instructions);
    });

    instructions = instructions.filter(instruction =>
        isUSDCTransfer(instruction, usdcAddresses)
    );
    return instructions;
}

export function getSolscanLink(linkType: string, address: string) {
    if (linkType === 'address') return `https://solscan.io/account/${address}`;
    if (linkType === 'block') return `https://solscan.io/block/${address}`;
    if (linkType === 'transaction') return `https://solscan.io/tx/${address}`;
}