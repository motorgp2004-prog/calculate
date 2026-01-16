import React, { useState, useCallback } from 'react';
import { Download, Eraser, FileText, Settings2 } from 'lucide-react';
import { ModbusRecord, InputField } from './types';
import { INITIAL_DATA, TABLE_HEADERS } from './constants';
import { downloadCSV } from './utils/csvHelper';
import { FluentButton } from './components/FluentButton';
import { FluentInput } from './components/FluentInput';

const App: React.FC = () => {
  const [data, setData] = useState<ModbusRecord[]>(INITIAL_DATA);
  const [isExporting, setIsExporting] = useState(false);

  // Handle input change for a specific cell
  const handleInputChange = useCallback((id: number, field: InputField, value: string) => {
    setData(prevData => prevData.map(record => 
      record.id === id ? { ...record, [field]: value } : record
    ));
  }, []);

  // Clear all data
  const handleClear = () => {
    if (window.confirm('您確定要重置所有暫存器設定嗎？')) {
      setData(INITIAL_DATA);
    }
  };

  // Export handler
  const handleExport = () => {
    setIsExporting(true);
    // Simulate a brief processing delay
    setTimeout(() => {
      downloadCSV(data, `ModbusConfig_${new Date().toISOString().slice(0, 10)}.csv`);
      setIsExporting(false);
    }, 600);
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-4 sm:p-8">
      
      {/* Main Glass Panel */}
      <div className="w-full max-w-6xl bg-[#202020]/70 backdrop-blur-xl border border-[#ffffff15] rounded-xl shadow-2xl overflow-hidden flex flex-col h-[85vh]">
        
        {/* Header / TitleBar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#ffffff10] bg-[#202020]/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-600 rounded-lg shadow-lg shadow-indigo-900/20">
              <Settings2 size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-white tracking-wide">Modbus 設定工具</h1>
              <p className="text-xs text-gray-400">暫存器配置 • CSV 產生器</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <FluentButton 
              onClick={handleClear} 
              variant="secondary"
              icon={<Eraser size={16} />}
              title="重置所有數值"
            >
              重置
            </FluentButton>
            <FluentButton 
              onClick={handleExport} 
              variant="primary"
              disabled={isExporting}
              icon={isExporting ? <div className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full" /> : <Download size={16} />}
            >
              {isExporting ? '處理中...' : '匯出設定'}
            </FluentButton>
          </div>
        </div>

        {/* Content Area - Data Grid */}
        <div className="flex-1 overflow-auto p-0 relative custom-scrollbar">
          <table className="w-full border-collapse text-left">
            <thead className="bg-[#1a1a1a]/80 sticky top-0 z-10 backdrop-blur-md">
              <tr>
                {TABLE_HEADERS.map((header) => (
                  <th 
                    key={header.key} 
                    className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-[#ffffff10]"
                    style={{ width: header.key === 'id' ? '60px' : 'auto' }}
                  >
                    {header.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ffffff0a]">
              {data.map((row) => (
                <tr key={row.id} className="group hover:bg-[#ffffff08] transition-colors">
                  {/* ID Column */}
                  <td className="px-4 py-2 text-sm text-gray-500 font-mono text-center">
                    {String(row.id).padStart(2, '0')}
                  </td>
                  
                  {/* Address */}
                  <td className="px-2 py-2">
                    <FluentInput 
                      placeholder="4xxxx"
                      value={row.address}
                      onChange={(e) => handleInputChange(row.id, 'address', e.target.value)}
                      className="font-mono text-cyan-400"
                    />
                  </td>

                  {/* Name */}
                  <td className="px-2 py-2">
                    <FluentInput 
                      placeholder="參數名稱..."
                      value={row.name}
                      onChange={(e) => handleInputChange(row.id, 'name', e.target.value)}
                    />
                  </td>

                  {/* Data Type */}
                  <td className="px-2 py-2">
                    <FluentInput 
                      placeholder="UINT16"
                      value={row.dataType}
                      onChange={(e) => handleInputChange(row.id, 'dataType', e.target.value)}
                      className="text-yellow-400"
                    />
                  </td>

                  {/* Value */}
                  <td className="px-2 py-2">
                    <FluentInput 
                      placeholder="0"
                      value={row.value}
                      onChange={(e) => handleInputChange(row.id, 'value', e.target.value)}
                      className="text-right font-mono"
                    />
                  </td>

                   {/* Comment */}
                   <td className="px-2 py-2">
                    <FluentInput 
                      placeholder="描述..."
                      value={row.comment}
                      onChange={(e) => handleInputChange(row.id, 'comment', e.target.value)}
                      className="text-gray-400 italic"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Status Bar */}
        <div className="px-6 py-2 bg-[#1a1a1a] border-t border-[#ffffff10] flex justify-between items-center text-xs text-gray-500">
          <div className="flex gap-4">
            <span>暫存器數量：{data.length}</span>
            <span className="text-green-500">系統就緒</span>
          </div>
          <div className="flex items-center gap-2">
            <FileText size={12} />
            <span>Modbus CSV 格式</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default App;