export interface ModbusRecord {
  id: number;
  address: string;    // e.g., 40001
  name: string;       // e.g., Voltage_Phase_A
  dataType: string;   // e.g., UINT16, FLOAT
  value: string;      // e.g., 0
  comment: string;    // e.g., Read only
}

export type InputField = keyof Omit<ModbusRecord, 'id'>;