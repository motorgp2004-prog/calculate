import { ModbusRecord } from './types';

// Generate 10 empty records with default addresses
export const INITIAL_DATA: ModbusRecord[] = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  address: (40001 + index).toString(),
  name: '',
  dataType: 'UINT16',
  value: '0',
  comment: ''
}));

export const TABLE_HEADERS = [
  { key: 'id', label: '序號' },
  { key: 'address', label: '位址 (Address)' },
  { key: 'name', label: '參數名稱 (Name)' },
  { key: 'dataType', label: '資料類型 (Type)' },
  { key: 'value', label: '數值 (Value)' },
  { key: 'comment', label: '備註 (Comment)' },
];