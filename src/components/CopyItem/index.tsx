import { ReactComponent as CopyIcon } from 'assets/icons/copy.svg';
import { useState } from 'react';

export default function CopyItem({ content }: { content: string }) {
    const [copySuccess, setCopySuccess] = useState('');
    const [tooltipVisible, setTooltipVisible] = useState(false);
    const copyToClipboard = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        try {
            e.stopPropagation();
            await navigator.clipboard.writeText(content);
            setCopySuccess('Copied!');            
        } catch (err) {
            setCopySuccess('Failed to copy!');
        }
    }

    const handleMouseEnter = () => {
        setTooltipVisible(true);
    };

    const handleMouseLeave = () => {
        setTooltipVisible(false);
        setCopySuccess(''); // Reset the copySuccess message when mouse leaves
    };

    return (
        <div
            className="inline-flex align-middle relative"
            data-state="closed"
            onClick={copyToClipboard}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <CopyIcon />
            {tooltipVisible && (
                <div className={`hover:visible absolute -top-1 left-1/2 -translate-x-1/2 -translate-y-full bg-black/60 text-white rounded-md px-2 py-1 text-[10px] whitespace-nowrap`}>
                    {copySuccess || "Copy to Clipboard"}
                </div>
            )}
        </div>
    )
}