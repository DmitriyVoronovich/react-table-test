import { useState, useMemo } from 'react';
import { Table, Button, Input, Space } from 'antd';
import type { DataType } from './types';
import { createColumns } from './columns';
import { ModalComponent } from '../modal/ModalComponent';
import { useTableData } from './useTableData';

export const TableComponent = () => {
    const { data, setSearch, create, update, remove } = useTableData();
    const [modalOpen, setModalOpen] = useState(false);
    const [editData, setEditData] = useState<DataType | null>(null);

    const columns = useMemo(
        () =>
            createColumns({
                onEdit: item => {
                    setEditData(item);
                    setModalOpen(true);
                },
                onDelete: remove,
            }),
        [remove]
    );

    return (
        <>
            <Space style={{ marginBottom: 16 }}>
                <Input
                    placeholder="Поиск по таблице"
                    onChange={e => setSearch(e.target.value)}
                />
                <Button
                    type="primary"
                    onClick={() => {
                        setEditData(null);
                        setModalOpen(true);
                    }}
                >
                    Добавить
                </Button>
            </Space>

            <Table<DataType>
                rowKey="key"
                dataSource={data}
                columns={columns}
            />

            <ModalComponent
                open={modalOpen}
                editData={editData}
                onCancel={() => setModalOpen(false)}
                onCreate={create}
                onUpdate={update}
            />
        </>
    );
};