import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import MockupData from "data/mockup.json";

export default function useFetchTransaction({ hash }: { hash?: string }) {
    const [loading, setLoading] = useState(false);
    const [transaction, setTransaction] = useState<any>();
    const [error, setError] = useState('');
    const fetchTransaction = useCallback(async (hash: string) => {
        setLoading(true);
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/usdc-transactions/${hash}`);
            setTransaction(data);
            setError('');
        } catch (error) {
            console.log(error);
            setError('Transaction Not Found');
            // @ts-ignore
            const transaction = MockupData.filter(tx => tx.hash === hash)[0];
            if (transaction) {
                setTransaction(transaction);
                setError('');
            }
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        if (!hash) return;
        fetchTransaction(hash);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hash]);

    return { transaction, error, loading };
}