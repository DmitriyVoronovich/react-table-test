import { Space, Popconfirm } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import type { DataType } from './types';

interface ColumnActions {
    onEdit: (record: DataType) => void;
    onDelete: (key: string) => void;
}

export const createColumns = ({
                                  onEdit,
                                  onDelete,
                              }: ColumnActions): ColumnsType<DataType> => [
    {
        title: 'Имя',
        dataIndex: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
        title: 'Дата',
        dataIndex: 'date',
        sorter: (a, b) =>
            dayjs(a.date, 'DD.MM.YYYY').unix() -
            dayjs(b.date, 'DD.MM.YYYY').unix(),
    },
    {
        title: 'Числовое значение',
        dataIndex: 'age',
        sorter: (a, b) => a.age - b.age,
    },
    {
        title: 'Действия',
        render: (_, record) => (
            <Space>
                <EditOutlined
                    onClick={() => onEdit(record)}
                    style={{ color: '#1890ff', cursor: 'pointer' }}
                />
                <Popconfirm
                    title="Удалить запись?"
                    onConfirm={() => onDelete(record.key)}
                >
                    <DeleteOutlined
                        style={{ color: '#ff4d4f', cursor: 'pointer' }}
                    />
                </Popconfirm>
            </Space>
        ),
    },
];