import { useEffect } from 'react';
import { Modal, Form, Input, Button, DatePicker } from 'antd';
import dayjs from 'dayjs';
import type { DataType } from '../table/types';

interface Props {
    open: boolean;
    editData: DataType | null;
    onCancel: () => void;
    onCreate: (item: DataType) => void;
    onUpdate: (item: DataType) => void;
}

export const ModalComponent = ({
                                   open,
                                   editData,
                                   onCancel,
                                   onCreate,
                                   onUpdate,
                               }: Props) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (editData) {
            form.setFieldsValue({
                ...editData,
                date: dayjs(editData.date, 'DD.MM.YYYY'),
            });
        } else {
            form.resetFields();
        }
    }, [editData, form]);

    const onFinish = (values: any) => {
        const result: DataType = {
            ...values,
            key: editData?.key ?? crypto.randomUUID(),
            date: values.date.format('DD.MM.YYYY'),
        };

        editData ? onUpdate(result) : onCreate(result);
        onCancel();
    };

    return (
        <Modal
            open={open}
            title={editData ? 'Редактировать' : 'Добавить'}
            footer={null}
            onCancel={onCancel}
        >
            <Form layout="vertical" form={form} onFinish={onFinish}>
                <Form.Item
                    label="Имя"
                    name="name"
                    rules={[{ required: true, min: 2 }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Дата"
                    name="date"
                    rules={[{ required: true }]}
                >
                    <DatePicker format="DD.MM.YYYY" style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                    label="Числовое значение"
                    name="age"
                    rules={[{ required: true }]}
                >
                    <Input type="number" />
                </Form.Item>

                <Button type="primary" htmlType="submit" block>
                    {editData ? 'Сохранить' : 'Добавить'}
                </Button>
            </Form>
        </Modal>
    );
};