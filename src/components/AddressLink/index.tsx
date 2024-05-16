import CopyItem from "components/CopyItem";
import { USDC_ADDRESS } from "constant";
import { getSolscanLink, truncateAddress } from "utils";

export default function AddressLink({ address, short, linkType }: { address: string, short?: boolean, linkType: string }) {
    return (
        <div className="text-blue-400 cursor-pointer items-center">
            <div className="break-words inline-block w-full">
                <a className="mr-1" href={getSolscanLink(linkType, address)} target="_blank" rel="noreferrer">
                    {linkType === 'block' && '#'}{address === USDC_ADDRESS ? "USDC" : (short ? truncateAddress(address, 12) : address)}
                </a>
                <CopyItem content={address} />
            </div>
        </div>
    );
};