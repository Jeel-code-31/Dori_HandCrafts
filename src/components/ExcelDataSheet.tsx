'use client';

import React, { useState, useEffect } from 'react';
import {
  ClickRecord,
  getClickHistory,
  getClickCount,
  getUserCount,
  updateClickRecord,
  deleteClickRecord,
  addCustomClickRecord,
  clearAllClickRecords,
  exportToCsv,
} from '@/lib/login';
import {
  FileSpreadsheet,
  Printer,
  Download,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  Search,
  RefreshCw,
  Table,
  Filter,
  Save,
} from 'lucide-react';

interface ExcelDataSheetProps {
  onClose?: () => void;
  isFullPage?: boolean;
}

export default function ExcelDataSheet({ onClose, isFullPage = false }: ExcelDataSheetProps) {
  const [history, setHistory] = useState<ClickRecord[]>([]);
  const [clickCount, setClickCount] = useState<number>(0);
  const [userCount, setUserCount] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  // Edit form state
  const [editForm, setEditForm] = useState<Partial<ClickRecord>>({});

  // New row form toggle
  const [showAddRow, setShowAddRow] = useState(false);
  const [newRowData, setNewRowData] = useState({
    productName: '',
    userName: '',
    userEmail: '',
    buttonId: 'MOQ Button',
  });

  const refreshData = () => {
    setHistory(getClickHistory());
    setClickCount(getClickCount());
    setUserCount(getUserCount());
  };

  useEffect(() => {
    refreshData();
    const handleUpdate = () => refreshData();
    window.addEventListener('dori_click_tracker_updated', handleUpdate);
    return () => window.removeEventListener('dori_click_tracker_updated', handleUpdate);
  }, []);

  // Filtered records
  const filteredRecords = history.filter((r) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      r.id.toLowerCase().includes(q) ||
      (r.productName || '').toLowerCase().includes(q) ||
      (r.userName || '').toLowerCase().includes(q) ||
      (r.userEmail || '').toLowerCase().includes(q) ||
      (r.timestamp || '').toLowerCase().includes(q)
    );
  });

  const handleStartEdit = (record: ClickRecord) => {
    setEditingId(record.id);
    setEditForm({ ...record });
  };

  const handleSaveEdit = (id: string) => {
    if (editForm) {
      updateClickRecord(id, editForm);
      setEditingId(null);
      setEditForm({});
      refreshData();
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleDelete = (id: string) => {
    if (confirm(`Are you sure you want to delete Click Record ${id}?`)) {
      deleteClickRecord(id);
      refreshData();
    }
  };

  const handleClearAll = () => {
    if (confirm('Are you sure you want to clear ALL click tracking records from the sheet? This cannot be undone.')) {
      clearAllClickRecords();
      refreshData();
    }
  };

  const handleAddRow = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRowData.productName.trim()) return;
    addCustomClickRecord({
      productName: newRowData.productName,
      userName: newRowData.userName || 'Website Visitor',
      userEmail: newRowData.userEmail || 'visitor@website.com',
      buttonId: newRowData.buttonId || 'MOQ Button',
    });
    setNewRowData({ productName: '', userName: '', userEmail: '', buttonId: 'MOQ Button' });
    setShowAddRow(false);
    refreshData();
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = () => {
    exportToCsv(history);
  };

  return (
    <div className={`excel-sheet-container bg-white rounded-xs shadow-2xl overflow-hidden border border-[#107C41] font-sans text-xs ${isFullPage ? 'min-h-[85vh] my-4' : 'w-full'}`}>
      {/* 1. MS EXCEL DARK GREEN TITLE BANNER */}
      <div className="bg-[#107C41] text-white p-3 flex flex-wrap items-center justify-between gap-3 print:hidden">
        <div className="flex items-center space-x-2.5">
          <div className="bg-white text-[#107C41] p-1.5 rounded-xs shadow-xs font-bold text-xs flex items-center justify-center">
            <FileSpreadsheet size={18} />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="font-bold text-sm tracking-wide text-white">
                Zizziq_MOQ_Data_Sheet.xlsx
              </h2>
              <span className="bg-[#0b582e] text-[#a1e8be] text-[10px] px-2 py-0.5 font-mono rounded-xs font-semibold">
                [LIVE SPREADSHEET]
              </span>
            </div>
            <p className="text-[10px] text-[#a1e8be]">
              Microsoft Excel • Data Auto-Sync Active • Changes saved locally
            </p>
          </div>
        </div>

        {/* Excel Action Toolbar */}
        <div className="flex items-center space-x-2">
          {/* Print Button */}
          <button
            onClick={handlePrint}
            className="bg-white hover:bg-slate-100 text-[#107C41] font-bold px-3 py-1.5 rounded-xs flex items-center space-x-1.5 shadow-xs text-xs transition-colors cursor-pointer"
            title="Print Data Sheet (Ctrl+P)"
          >
            <Printer size={14} />
            <span>Print Sheet</span>
          </button>

          {/* Export CSV Button */}
          <button
            onClick={handleExportCSV}
            className="bg-[#0b582e] hover:bg-[#084323] text-white font-bold px-3 py-1.5 rounded-xs flex items-center space-x-1.5 shadow-xs text-xs transition-colors border border-[#a1e8be]/30 cursor-pointer"
            title="Download CSV for MS Excel"
          >
            <Download size={14} />
            <span>Export Excel (.csv)</span>
          </button>

          {/* Add Row Button */}
          <button
            onClick={() => setShowAddRow(!showAddRow)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-2.5 py-1.5 rounded-xs flex items-center space-x-1 shadow-xs text-xs transition-colors cursor-pointer"
          >
            <Plus size={14} />
            <span>Add Row</span>
          </button>

          {/* Clear All */}
          {history.length > 0 && (
            <button
              onClick={handleClearAll}
              className="bg-red-700 hover:bg-red-800 text-white font-bold px-2.5 py-1.5 rounded-xs flex items-center space-x-1 shadow-xs text-xs transition-colors cursor-pointer"
              title="Clear all sheet records"
            >
              <Trash2 size={13} />
              <span>Clear</span>
            </button>
          )}

          {onClose && (
            <button
              onClick={onClose}
              className="bg-black/20 hover:bg-black/40 text-white p-1.5 rounded-xs"
              title="Close Excel View"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* 2. EXCEL MENU RIBBON (Simulated MS Excel Toolbar) */}
      <div className="bg-[#F3F3F3] border-b border-[#D4D4D4] px-3 py-1.5 flex items-center justify-between text-[11px] text-[#333] print:hidden">
        <div className="flex items-center space-x-4">
          <span className="font-bold text-[#107C41] border-b-2 border-[#107C41] pb-0.5 cursor-pointer">Home</span>
          <span className="text-gray-600 hover:text-black cursor-pointer">Insert</span>
          <span className="text-gray-600 hover:text-black cursor-pointer">Page Layout</span>
          <span className="text-gray-600 hover:text-black cursor-pointer">Formulas</span>
          <span className="text-gray-600 hover:text-black cursor-pointer font-semibold text-[#107C41]">Data Sheet</span>
          <span className="text-gray-600 hover:text-black cursor-pointer">Review</span>
          <span className="text-gray-600 hover:text-black cursor-pointer">View</span>
        </div>

        {/* Live Counters Banner */}
        <div className="flex items-center space-x-3 font-mono text-[10px] text-gray-700">
          <span className="bg-white px-2 py-0.5 border border-gray-300 rounded-xs">
            TOTAL CLICKS: <strong className="text-[#107C41] text-xs">{clickCount}</strong>
          </span>
          <span className="bg-white px-2 py-0.5 border border-gray-300 rounded-xs">
            UNIQUE VISITORS: <strong className="text-[#107C41] text-xs">{userCount}</strong>
          </span>
          <span className="bg-white px-2 py-0.5 border border-gray-300 rounded-xs">
            RECORDS: <strong>{history.length}</strong>
          </span>
        </div>
      </div>

      {/* 3. EXCEL FORMULA BAR & SEARCH */}
      <div className="bg-[#E6E6E6] border-b border-[#D4D4D4] px-3 py-1.5 flex items-center space-x-2 text-xs print:hidden">
        <div className="bg-white border border-[#B0B0B0] font-mono text-[11px] px-2 py-1 font-bold text-gray-700 w-16 text-center shadow-xs">
          {editingId ? editingId : `A1:${history.length + 1}`}
        </div>
        <div className="font-serif italic font-bold text-gray-500 text-sm px-1">fx</div>
        <div className="flex-1 relative">
          <input
            type="text"
            readOnly
            value={
              editingId
                ? `=EDIT_RECORD("${editingId}", productName="${editForm.productName || ''}")`
                : `=SUM_MOQ_LOGS(Total_Clicks=${clickCount}, Active_Users=${userCount})`
            }
            className="w-full bg-white border border-[#B0B0B0] px-2.5 py-1 text-[11px] font-mono text-gray-800 shadow-xs focus:outline-hidden"
          />
        </div>

        {/* Search / Filter Box inside Formula Bar */}
        <div className="relative w-56">
          <Search size={13} className="absolute left-2 top-2 text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Excel records..."
            className="w-full bg-white border border-[#B0B0B0] pl-7 pr-2 py-1 text-[11px] rounded-xs shadow-xs focus:outline-hidden focus:border-[#107C41]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-1.5 top-1.5 text-gray-400 hover:text-black"
            >
              <X size={12} />
            </button>
          )}
        </div>
      </div>

      {/* 4. PRINT HEADER (Visible only on print) */}
      <div className="hidden print:block p-6 mb-4 border-b-2 border-black">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold font-serif text-black uppercase tracking-wider">
              Zizziq • MOQ Data Spreadsheet Report
            </h1>
            <p className="text-xs text-gray-600 mt-1">
              Official Website MOQ Inquiries & Visitor Click Log
            </p>
          </div>
          <div className="text-right text-xs">
            <p><strong>Generated:</strong> {new Date().toLocaleString()}</p>
            <p><strong>Total MOQ Clicks:</strong> {clickCount} | <strong>Unique Visitors:</strong> {userCount}</p>
          </div>
        </div>
      </div>

      {/* 5. ADD ROW FORM COLLAPSIBLE */}
      {showAddRow && (
        <form
          onSubmit={handleAddRow}
          className="bg-emerald-50 border-b-2 border-[#107C41] p-3 flex flex-wrap items-center gap-2 text-xs print:hidden animate-fadeIn"
        >
          <div className="font-bold text-[#107C41] flex items-center space-x-1">
            <Plus size={14} />
            <span>New Record:</span>
          </div>

          <input
            type="text"
            placeholder="Product / Item Name (e.g. Malachite Ring)"
            required
            value={newRowData.productName}
            onChange={(e) => setNewRowData({ ...newRowData, productName: e.target.value })}
            className="bg-white border border-[#107C41]/50 px-2 py-1 text-xs rounded-xs flex-1 min-w-[180px]"
          />

          <input
            type="text"
            placeholder="Visitor Name"
            value={newRowData.userName}
            onChange={(e) => setNewRowData({ ...newRowData, userName: e.target.value })}
            className="bg-white border border-[#107C41]/50 px-2 py-1 text-xs rounded-xs w-36"
          />

          <input
            type="email"
            placeholder="Visitor Email"
            value={newRowData.userEmail}
            onChange={(e) => setNewRowData({ ...newRowData, userEmail: e.target.value })}
            className="bg-white border border-[#107C41]/50 px-2 py-1 text-xs rounded-xs w-48"
          />

          <button
            type="submit"
            className="bg-[#107C41] text-white font-bold px-3 py-1 rounded-xs hover:bg-[#0b582e]"
          >
            Insert Row
          </button>
          <button
            type="button"
            onClick={() => setShowAddRow(false)}
            className="border border-gray-400 px-2 py-1 rounded-xs hover:bg-gray-200"
          >
            Cancel
          </button>
        </form>
      )}

      {/* 6. MAIN EXCEL SPREADSHEET TABLE GRID */}
      <div className="overflow-x-auto min-h-[60vh] max-h-[75vh] bg-[#EAEAEA] w-full">
        <table className="w-full border-collapse text-left select-text print:w-full">
          {/* EXCEL COLUMN HEADERS (A, B, C, D, E, F, G) */}
          <thead className="sticky top-0 bg-[#E6E6E6] text-gray-700 text-[11px] font-bold select-none border-b border-[#B0B0B0] z-10 print:static print:bg-gray-200">
            <tr className="divide-x divide-[#D4D4D4]">
              <th className="w-10 p-1.5 text-center bg-[#D9D9D9] border-b border-gray-400 font-mono text-[10px] text-gray-600 print:w-8">
                #
              </th>
              <th className="p-2 bg-[#E6E6E6] border-b border-gray-400 font-mono text-center w-24">
                A <span className="font-sans font-normal text-[10px] text-gray-500">(Click ID)</span>
              </th>
              <th className="p-2 bg-[#E6E6E6] border-b border-gray-400 font-mono text-center w-20">
                B <span className="font-sans font-normal text-[10px] text-gray-500">(Click #)</span>
              </th>
              <th className="p-2 bg-[#E6E6E6] border-b border-gray-400 font-mono text-center w-24">
                C <span className="font-sans font-normal text-[10px] text-gray-500">(User Count)</span>
              </th>
              <th className="p-2 bg-[#E6E6E6] border-b border-gray-400 font-mono min-w-[200px]">
                D <span className="font-sans font-normal text-[10px] text-gray-500">(Product / Item Name)</span>
              </th>
              <th className="p-2 bg-[#E6E6E6] border-b border-gray-400 font-mono min-w-[180px]">
                E <span className="font-sans font-normal text-[10px] text-gray-500">(Visitor Name / Email)</span>
              </th>
              <th className="p-2 bg-[#E6E6E6] border-b border-gray-400 font-mono w-32">
                F <span className="font-sans font-normal text-[10px] text-gray-500">(Timestamp)</span>
              </th>
              <th className="p-2 bg-[#E6E6E6] border-b border-gray-400 font-mono w-24 text-center print:hidden">
                G <span className="font-sans font-normal text-[10px] text-gray-500">(Actions)</span>
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-[#D4D4D4] font-mono text-[11px] text-gray-800">
            {filteredRecords.length === 0 ? (
              <tr>
                <td colSpan={8} className="p-8 text-center bg-white text-gray-500 italic">
                  {searchQuery
                    ? `No matching records found for "${searchQuery}".`
                    : 'Excel sheet is currently empty. MOQ clicks from the website will automatically populate here!'}
                </td>
              </tr>
            ) : (
              filteredRecords.map((record, index) => {
                const isEditing = editingId === record.id;
                const rowNum = index + 1;

                return (
                  <tr
                    key={`excel-row-${record.id}-idx-${index}`}
                    className={`hover:bg-[#E8F4EC] transition-colors divide-x divide-[#D4D4D4] ${
                      isEditing ? 'bg-amber-50' : index % 2 === 0 ? 'bg-white' : 'bg-[#F9F9F9]'
                    }`}
                  >
                    {/* Row Index Number */}
                    <td className="p-1.5 text-center bg-[#E6E6E6] text-gray-600 text-[10px] font-bold select-none border-r border-[#B0B0B0]">
                      {rowNum}
                    </td>

                    {/* Column A: Click ID */}
                    <td className="p-1.5 font-bold text-[#107C41] text-center">
                      {isEditing ? (
                        <input
                          type="text"
                          value={editForm.id || record.id}
                          onChange={(e) => setEditForm({ ...editForm, id: e.target.value })}
                          className="w-full bg-white border border-[#107C41] px-1 py-0.5 text-xs text-center font-bold"
                        />
                      ) : (
                        record.id
                      )}
                    </td>

                    {/* Column B: Click # */}
                    <td className="p-1.5 text-center font-semibold text-gray-700">
                      {isEditing ? (
                        <input
                          type="number"
                          value={editForm.clickNumber || record.clickNumber}
                          onChange={(e) => setEditForm({ ...editForm, clickNumber: parseInt(e.target.value, 10) || 1 })}
                          className="w-full bg-white border border-[#107C41] px-1 py-0.5 text-xs text-center"
                        />
                      ) : (
                        `#${record.clickNumber}`
                      )}
                    </td>

                    {/* Column C: User Count */}
                    <td className="p-1.5 text-center">
                      {isEditing ? (
                        <input
                          type="number"
                          value={editForm.userCount || record.userCount}
                          onChange={(e) => setEditForm({ ...editForm, userCount: parseInt(e.target.value, 10) || 1 })}
                          className="w-full bg-white border border-[#107C41] px-1 py-0.5 text-xs text-center"
                        />
                      ) : (
                        <span className="bg-emerald-100 text-[#107C41] px-1.5 py-0.5 font-bold rounded-xs">
                          {record.userCount}
                        </span>
                      )}
                    </td>

                    {/* Column D: Product Name (Inline editable) */}
                    <td className="p-1.5 font-sans font-medium text-gray-900">
                      {isEditing ? (
                        <input
                          type="text"
                          value={editForm.productName || ''}
                          onChange={(e) => setEditForm({ ...editForm, productName: e.target.value })}
                          className="w-full bg-white border border-[#107C41] px-2 py-0.5 text-xs font-sans"
                        />
                      ) : (
                        <span title={record.productName}>
                          📦 {record.productName || 'Handcrafted Product'}
                        </span>
                      )}
                    </td>

                    {/* Column E: Visitor Name & Email */}
                    <td className="p-1.5 font-sans text-gray-700">
                      {isEditing ? (
                        <div className="space-y-1">
                          <input
                            type="text"
                            placeholder="Visitor Name"
                            value={editForm.userName || ''}
                            onChange={(e) => setEditForm({ ...editForm, userName: e.target.value })}
                            className="w-full bg-white border border-[#107C41] px-1.5 py-0.5 text-[11px]"
                          />
                          <input
                            type="email"
                            placeholder="Visitor Email"
                            value={editForm.userEmail || ''}
                            onChange={(e) => setEditForm({ ...editForm, userEmail: e.target.value })}
                            className="w-full bg-white border border-[#107C41] px-1.5 py-0.5 text-[11px]"
                          />
                        </div>
                      ) : (
                        <div>
                          <div className="font-semibold text-gray-900">{record.userName || 'Website Visitor'}</div>
                          <div className="text-[10px] text-gray-500">{record.userEmail}</div>
                        </div>
                      )}
                    </td>

                    {/* Column F: Timestamp */}
                    <td className="p-1.5 text-gray-600">
                      {isEditing ? (
                        <input
                          type="text"
                          value={editForm.timestamp || ''}
                          onChange={(e) => setEditForm({ ...editForm, timestamp: e.target.value })}
                          className="w-full bg-white border border-[#107C41] px-1 py-0.5 text-xs"
                        />
                      ) : (
                        record.timestamp
                      )}
                    </td>

                    {/* Column G: Actions (Make Changes - Save, Edit, Delete) */}
                    <td className="p-1.5 text-center print:hidden">
                      {isEditing ? (
                        <div className="flex items-center justify-center space-x-1">
                          <button
                            onClick={() => handleSaveEdit(record.id)}
                            className="bg-[#107C41] text-white p-1 rounded-xs hover:bg-[#0b582e]"
                            title="Save Changes"
                          >
                            <Check size={13} />
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="bg-gray-400 text-white p-1 rounded-xs hover:bg-gray-500"
                            title="Cancel Edit"
                          >
                            <X size={13} />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center space-x-1">
                          <button
                            onClick={() => handleStartEdit(record)}
                            className="text-[#107C41] hover:text-[#0b582e] p-1 hover:bg-emerald-50 rounded-xs"
                            title="Edit cell data"
                          >
                            <Edit2 size={13} />
                          </button>
                          <button
                            onClick={() => handleDelete(record.id)}
                            className="text-red-600 hover:text-red-800 p-1 hover:bg-red-50 rounded-xs"
                            title="Delete row"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* 7. MS EXCEL BOTTOM STATUS BAR */}
      <div className="bg-[#F3F3F3] border-t border-[#D4D4D4] px-3 py-1.5 flex flex-wrap items-center justify-between text-[10px] text-gray-600 print:hidden">
        <div className="flex items-center space-x-4 font-mono">
          <span className="text-[#107C41] font-bold uppercase tracking-wider flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-[#107C41] inline-block animate-pulse"></span>
            <span>READY</span>
          </span>
          <span>Showing {filteredRecords.length} of {history.length} rows</span>
          <span>Sheet Status: Editable</span>
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-gray-500">Gridlines: On</span>
          <span className="text-gray-500">Auto-Calculate: SUM / COUNT</span>
          <span className="font-bold text-[#107C41]">Zoom: 100%</span>
        </div>
      </div>
    </div>
  );
}
