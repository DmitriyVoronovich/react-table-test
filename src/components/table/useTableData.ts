import {useMemo, useState} from 'react';
import type {DataType} from './types';
import {initialData} from './data';

export const useTableData = () => {
    const [data, setData] = useState<DataType[]>(initialData);
    const [search, setSearch] = useState('');

    const filteredData = useMemo(() => {
        if (!search) return data;

        return data.filter(item =>
            Object.values(item).some(value =>
                String(value).toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [data, search]);

    const create = (item: DataType) =>
        setData(prev => [...prev, item]);

    const update = (item: DataType) =>
        setData(prev =>
            prev.map(el => (el.key === item.key ? item : el))
        );

    const remove = (key: string) =>
        setData(prev => prev.filter(el => el.key !== key));

    return {
        data: filteredData,
        setSearch,
        create,
        update,
        remove,
    };
};