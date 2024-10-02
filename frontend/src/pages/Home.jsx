import { useEffect, useState } from 'react';
import Layouts from '../Components/Layouts';
import { UnorderedListOutlined, AreaChartOutlined } from '@ant-design/icons'
import { Form, Input, Modal, Select, DatePicker, message, Table } from 'antd';
import axios from 'axios';
import Analytics from '../Components/Analytics';

const { RangePicker } = DatePicker;

const Home = () => {
    const [showModal, setShowModal] = useState(false);
    const [allTransaction, setAllTransaction] = useState([]);
    const [frequency, setFrequency] = useState('7');
    const [selectedDate, setSelectedDate] = useState(['']);
    const [viewData, setViewData] = useState('table');

    const columns = [
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: (text) => new Date(text).toLocaleDateString(),
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Payment Method',
            dataIndex: 'paymentmethod',
            key: 'paymentmethod',
        },
    ];

    const getAllTransaction = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            if (!user || !user._id) {
                message.error('User not found. Please log in.');
                return;
            }

            const res = await axios.post('http://localhost:4000/api/get-transaction', { userID: user._id, frequency, selectedDate });
            if (res.status === 200) {
                setAllTransaction(res.data);
                console.log('Fetched transactions:', res.data);
            } else {
                throw new Error('Failed to fetch transactions.');
            }
        } catch (error) {
            console.error('Error fetching transactions:', error.message || error);
            message.error('Error fetching transactions. Please try again.');
        }
    };

    useEffect(() => {
        getAllTransaction();
    }, [frequency, selectedDate]);

    const handleSubmit = async (values) => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            if (!user) {
                message.error('User not found. Please log in.');
                return;
            }

            await axios.post('http://localhost:4000/api/add-transaction', { ...values, userID: user._id });
            message.success('Transaction added successfully!');
            setShowModal(false);
            getAllTransaction();
        } catch (error) {
            console.error('Error adding transaction:', error);
            message.error('Error adding transaction. Please try again.');
        }
    };

    return (
        <Layouts >
            <>
                <div className='filters d-flex p-3 align-items-center justify-content-between shadow'>
                    <div>
                        <h6>Select Frequency</h6>
                        <Select value={frequency} onChange={(value) => setFrequency(value)}>
                            <Select.Option value="7">Last 1 Week</Select.Option>
                            <Select.Option value="30">Last 1 Month</Select.Option>
                            <Select.Option value="365">Last 1 Year</Select.Option>
                            <Select.Option value="custom">Custom</Select.Option>
                        </Select>{frequency === 'custom' && <RangePicker value={selectedDate} onChange={(values) => setSelectedDate(values)} />}
                    </div>

                    <div className='mx-2' style={{ border: '1px solid grey', borderRadius: '5px', padding: '7px' }}>
                        <UnorderedListOutlined className='mx-2' style={{ fontSize: '20px' }} onClick={() => setViewData('table')} />
                        <AreaChartOutlined className='mx-2' style={{ fontSize: '20px' }} onClick={() => setViewData('analytics')} />
                    </div>

                    <div className='btn btn-success' onClick={() => setShowModal(true)}>
                        Add New
                    </div>
                </div>

                <div className='content mt-4' style={{ scrollBehavior: "-moz-initial" }}>
                    {viewData === 'table' ?
                        <Table columns={columns} dataSource={allTransaction} rowKey="_id" />
                        :
                        <Analytics allTransaction={allTransaction} />
                    }

                </div>

                <Modal
                    title="Add Transaction"
                    open={showModal}
                    onCancel={() => setShowModal(false)}
                    footer={false}
                >
                    <Form layout='vertical' onFinish={handleSubmit}>
                        <Form.Item
                            label="Amount"
                            name="amount"
                            rules={[{ required: true, message: 'Please enter the amount' }]}
                        >
                            <Input type='number' placeholder="Enter Amount" />
                        </Form.Item>

                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[{ required: true, message: 'Please enter a description' }]}
                        >
                            <Input type='text' placeholder="Enter Description" />
                        </Form.Item>

                        <Form.Item
                            label="Category"
                            name="category"
                            rules={[{ required: true, message: 'Please select a category' }]}
                        >
                            <Select placeholder="Select Category">
                                <Select.Option value="food">Food</Select.Option>
                                <Select.Option value="transport">Transport</Select.Option>
                                <Select.Option value="housing">Housing</Select.Option>
                                <Select.Option value="insurance">Insurance</Select.Option>
                                <Select.Option value="healthcare">Healthcare</Select.Option>
                                <Select.Option value="entertainment">Entertainment</Select.Option>
                                <Select.Option value="shopping">Shopping</Select.Option>
                                <Select.Option value="personal-care">Personal Care</Select.Option>
                                <Select.Option value="education">Education</Select.Option>
                                <Select.Option value="travel">Travel</Select.Option>
                                <Select.Option value="gifts-donations">Gifts & Donations</Select.Option>
                                <Select.Option value="other">Other</Select.Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Payment Method"
                            name="paymentmethod"
                            rules={[{ required: true, message: 'Please select a payment method' }]}
                        >
                            <Select placeholder="Select Payment Method">
                                <Select.Option value="cash">Cash</Select.Option>
                                <Select.Option value="credit card">Credit Card</Select.Option>
                                <Select.Option value="bank transfer">Bank Transfer</Select.Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Date"
                            name="date"
                            rules={[{ required: true, message: 'Please select a date' }]}
                        >
                            <DatePicker className='w-100' />
                        </Form.Item>

                        <button className="btn btn-primary" type="submit">
                            Submit
                        </button>
                    </Form>
                </Modal>
            </>
        </Layouts >
    );
};

export default Home;
