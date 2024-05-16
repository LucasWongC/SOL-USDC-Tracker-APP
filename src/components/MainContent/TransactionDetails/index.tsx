import { ReactComponent as ClockIcon } from 'assets/icons/clock.svg';
import { ReactComponent as SuccessIcon } from 'assets/icons/success.svg';
import { ReactComponent as TransferIcon } from 'assets/icons/transfer.svg';
import USDCIcon from 'assets/icons/usdc.webp';
import SearchInput from "components/SearchInput";
import DetailItem from './DetailItem';
import AddressLink from 'components/AddressLink';
import { USDC_ADDRESS } from 'constant';
import useFetchTransaction from 'hooks/useFetchTransaction';
import NotFound from '../404';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { extractUSDCTransfers, getAmount } from 'utils';

export default function TransactionDetails() {
    const { hash } = useParams()
    const { transaction, error, loading } = useFetchTransaction({ hash });
    if (!loading && (!transaction || error)) {
        return <NotFound />;
    }
    return (
        <div className='w-full'>
            <div className="flex md:flex-row flex-col gap-5 justify-between items-center w-full mt-10">
                <h1 className="font-bold text-[30px]">Transaction Details</h1>
                <div className="max-w-[400px] w-full">
                    <SearchInput />
                </div>
            </div>

            <div className='p-5 bg-white rounded-md mt-10 flex flex-col gap-4 w-full'>
                <DetailItem
                    name={
                        <div className='text-neutral-700'>Signature</div>
                    }
                    content={
                        <AddressLink address={!loading && transaction.hash} linkType='transaction' />
                    }
                    loading={loading}
                />
                <DetailItem
                    name={
                        <div className='text-neutral-700'>Block</div>
                    }
                    content={
                        <AddressLink address={!loading && transaction.slot} linkType='block' />
                    }
                    loading={loading}
                />
                <DetailItem
                    name={
                        <div className='text-neutral-700'>Timestamp</div>
                    }
                    content={
                        <div className="flex gap-2 items-center flex-wrap">
                            <div className="">
                                {!loading && moment(transaction.timestamp * 1000).fromNow()}
                            </div>
                            <div className='h-[14px] border border-neutral-300' />
                            <div className="flex gap-2 flex-row items-center justify-start flex-wrap">
                                <ClockIcon className='w-5 h-5' />
                                <div>
                                    <div className="cursor-pointer text-neutral-900">
                                        {!loading && moment(transaction.timestamp * 1000).utc().format('MMMM DD, YYYY HH:mm:ss [UTC]')}
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    loading={loading}
                />
                <DetailItem
                    name={
                        <div className='text-neutral-700'>Result</div>
                    }
                    content={
                        <div className="flex gap-2 items-center text-primary flex-wrap">
                            <div className="flex gap-1 items-center">
                                <SuccessIcon className='w-5 h-5' />
                                Success
                            </div>
                            <div className='h-[14px] border border-neutral-300' />
                            <div>
                                Finalized (MAX Confirmations)
                            </div>
                        </div>
                    }
                    loading={loading}
                />
                <DetailItem
                    name={
                        <div className='text-neutral-700'>Signer</div>
                    }
                    content={
                        <AddressLink linkType='address' address={!loading && transaction?.transaction?.transaction?.message?.accountKeys[0].pubkey} />
                    }
                    loading={loading}
                />
                <DetailItem
                    name={
                        <div className='text-neutral-700'>Fee</div>
                    }
                    content={
                        <div className='text-neutral-900 inline break-all mr-1'>
                            {!loading && transaction?.transaction?.meta.fee / 1e9} SOL
                        </div>
                    }
                    loading={loading}
                />
                <DetailItem
                    name={
                        <div className='text-neutral-700'>Transaction Actions</div>
                    }
                    content={
                        <div className='flex flex-col gap-2 bg-neutral-200 rounded-md p-5'>
                            {!loading && extractUSDCTransfers(transaction).map((instruction: any, index) => (
                                <div key={`instruction-${index}`} className='flex gap-2 items-center flex-wrap'>
                                    <TransferIcon />
                                    <span>Transfer from</span>
                                    <AddressLink linkType='address' address={instruction.parsed.info.source} short />
                                    <span>to</span>
                                    <AddressLink linkType='address' address={instruction.parsed.info.destination} short />
                                    <span>for {getAmount(instruction.parsed).toLocaleString('en-us', { maximumFractionDigits: 6 })}</span>
                                    <img src={USDCIcon} alt='usdc icon' className='w-4 h-4' />
                                    <AddressLink linkType='address' address={USDC_ADDRESS} />
                                </div>
                            ))}
                        </div>
                    }
                    loading={loading}
                />
                <DetailItem
                    name={
                        <div className='text-neutral-700'>Transaction Version</div>
                    }
                    content={!loading && transaction?.transaction?.version}
                    loading={loading}
                />
                <DetailItem
                    name={
                        <div className='text-neutral-700'>Address Lookup Table Account(s)</div>
                    }
                    content={
                        <div className='sm:flex flex-col gap-1 items-start break-words inline-block w-full'>
                            {!loading && (transaction?.transaction?.transaction?.message?.addressTableLookups || [])
                                .map((address: { accountKey: string }) => (
                                    <AddressLink linkType='address' key={address.accountKey} address={address.accountKey} />
                                ))
                            }
                        </div>
                    }
                    loading={loading}
                />
                <DetailItem
                    name={
                        <div className='text-neutral-700'>Previous Block Hash</div>
                    }
                    content={
                        <div className='break-words inline-block w-full'>
                            {!loading && transaction?.transaction?.transaction?.message?.recentBlockhash}
                        </div>
                    }
                    loading={loading}
                />
            </div>
        </div>
    );
};