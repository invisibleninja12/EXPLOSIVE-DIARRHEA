import React, { useState } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Cell, Label } from 'recharts';

const CompoundQuadrantPlot = () => {
  const [selectedCompound, setSelectedCompound] = useState(null);

  const data = [
    { compound: "triterpenoid", island: "Kalimantan", mw: 552.8, violations: 0, pa: 0.4 },
    { compound: "Piscidinol A", island: "Kalimantan", mw: 474.7, violations: 0, pa: 0 },
    { compound: "bourjotinolone A", island: "Kalimantan", mw: 472.7, violations: 0, pa: 0.221 },
    { compound: "WATSONIANONE", island: "Kalimantan", mw: 432.5, violations: 0, pa: 0.221 },
    { compound: "Combretol", island: "Kalimantan", mw: 388.4, violations: 0, pa: 0.713 },
    { compound: "Kaempferol", island: "Kalimantan", mw: 286.24, violations: 0, pa: 0.738 },
    { compound: "apigenin", island: "Kalimantan", mw: 270.24, violations: 0, pa: 0.78 },
    { compound: "wogonin", island: "Kalimantan", mw: 284.26, violations: 0, pa: 0.756 },
    { compound: "Scholaricine", island: "Sulawesi", mw: 356.42, violations: 0, pa: 0 },
    { compound: "19-epischolaricine", island: "Sulawesi", mw: 356.42, violations: 0, pa: 0 },
    { compound: "Vellesamine", island: "Sulawesi", mw: 340.42, violations: 0, pa: 0 },
    { compound: "Pichrinine", island: "Sulawesi", mw: 338.4, violations: 0, pa: 0 },
    { compound: "catechin", island: "Sulawesi", mw: 290.27, violations: 0, pa: 0.722 },
    { compound: "patuletin", island: "Sulawesi", mw: 290.27, violations: 0, pa: 0.657 },
    { compound: "patuletin (stereoisomer)", island: "Sulawesi", mw: 290.27, violations: 0, pa: 0.722 },
    { compound: "luteolin", island: "Jawa", mw: 270.24, violations: 0, pa: 0.777 },
    { compound: "coumaroyldopamine", island: "Jawa", mw: 299.32, violations: 0, pa: 0.677 },
    { compound: "secoisolariciresinol", island: "Jawa", mw: 362.42, violations: 0, pa: 0.661 },
    { compound: "Isolariciresinol", island: "Jawa", mw: 360.4, violations: 0, pa: 0.046 },
    { compound: "medioresinol", island: "Jawa", mw: 388.41, violations: 0, pa: 0.584 },
    { compound: "caffeoylquinic", island: "Jawa", mw: 338.31, violations: 1, pa: 0 },
    { compound: "coumaroylquinic", island: "Jawa", mw: 354.31, violations: 1, pa: 0 },
    { compound: "hydroxy-alpha-sanshool", island: "Jawa", mw: 363.38, violations: 0, pa: 0.338 },
    { compound: "Isoeugenol", island: "Sumatera", mw: 160.2, violations: 0, pa: 0.893 },
    { compound: "Safrole", island: "Sumatera", mw: 162.19, violations: 0, pa: 0.768 },
    { compound: "Elemicin", island: "Sumatera", mw: 208.05, violations: 0, pa: 0.695 },
    { compound: "Myristicin", island: "Sumatera", mw: 192.21, violations: 0, pa: 0.761 },
    { compound: "Tamarixetin", island: "Maluku", mw: 316.26, violations: 0, pa: 0.777 },
    { compound: "Irisolone", island: "Maluku", mw: 312.27, violations: 0, pa: 0.904 },
    { compound: "Demethoxycurcumin", island: "Maluku", mw: 338.85, violations: 0, pa: 0.919 },
    { compound: "Lutein", island: "Papua", mw: 568.87, violations: 0, pa: 0.78 },
    { compound: "Patuletin", island: "Papua", mw: 332.26, violations: 2, pa: 0.657 },
    { compound: "Lupeol", island: "Papua", mw: 426.72, violations: 1, pa: 0.354 }
  ];

  // Transform data for scatter plot
  const scatterData = data.map(item => ({
    ...item,
    x: item.violations > 0 ? -item.violations : item.violations,
    y: item.pa
  }));

  const getQuadrant = (violations, pa) => {
    if (violations === 0 && pa > 0.7) return "Q1: No Violations & High Pa (>0.7)";
    if (violations === 0 && pa <= 0.7) return "Q2: No Violations & Low Pa (≤0.7)";
    if (violations > 0 && pa > 0.7) return "Q3: Violations & High Pa (>0.7)";
    return "Q4: Violations & Low Pa (≤0.7)";
  };

  const getColor = (violations, pa) => {
    if (violations === 0 && pa > 0.7) return "#10b981"; // Green
    if (violations === 0 && pa <= 0.7) return "#3b82f6"; // Blue
    if (violations > 0 && pa > 0.7) return "#f59e0b"; // Orange
    return "#ef4444"; // Red
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border-2 border-gray-300 rounded shadow-lg">
          <p className="font-bold text-gray-800">{data.compound}</p>
          <p className="text-sm text-gray-600">Island: {data.island}</p>
          <p className="text-sm text-gray-600">MW: {data.mw} g/mol</p>
          <p className="text-sm text-gray-600">Violations: {data.violations}</p>
          <p className="text-sm text-gray-600">Pa: {data.pa}</p>
          <p className="text-xs text-gray-500 mt-1">{getQuadrant(data.violations, data.pa)}</p>
        </div>
      );
    }
    return null;
  };

  const handleClick = (data) => {
    setSelectedCompound(data);
  };

  return (
    <div className="w-full h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Compound Quadrant Analysis</h1>
      <p className="text-gray-600 mb-6">Click on any point to see compound details</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-4 rounded-lg shadow">
          <ResponsiveContainer width="100%" height={600}>
            <ScatterChart margin={{ top: 20, right: 20, bottom: 60, left: 60 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                type="number" 
                dataKey="x" 
                domain={[-2.5, 0.5]}
                ticks={[-2, -1, 0]}
                label={{ value: 'Lipinski Rule Violations', position: 'insideBottom', offset: -10 }}
              />
              <YAxis 
                type="number" 
                dataKey="y" 
                domain={[0, 1]}
                label={{ value: 'Pa Value', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip content={<CustomTooltip />} />
              
              {/* Reference lines for quadrants */}
              <ReferenceLine x={0} stroke="#666" strokeWidth={2} />
              <ReferenceLine y={0.7} stroke="#666" strokeWidth={2} strokeDasharray="5 5" />
              
              <Scatter 
                data={scatterData} 
                onClick={handleClick}
                cursor="pointer"
              >
                {scatterData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={getColor(entry.violations, entry.pa)}
                    opacity={selectedCompound?.compound === entry.compound ? 1 : 0.7}
                    r={selectedCompound?.compound === entry.compound ? 8 : 6}
                  />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Quadrant Legend</h2>
          
          <div className="space-y-3 mb-6">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span className="text-sm">Q1: No Violations & High Pa (>0.7)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              <span className="text-sm">Q2: No Violations & Low Pa (≤0.7)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
              <span className="text-sm">Q3: Violations & High Pa (>0.7)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              <span className="text-sm">Q4: Violations & Low Pa (≤0.7)</span>
            </div>
          </div>
          
          {selectedCompound && (
            <div className="mt-6 p-4 bg-gray-50 rounded border-2 border-gray-200">
              <h3 className="font-bold text-lg text-gray-800 mb-2">Selected Compound</h3>
              <div className="space-y-1 text-sm">
                <p><span className="font-semibold">Name:</span> {selectedCompound.compound}</p>
                <p><span className="font-semibold">Island:</span> {selectedCompound.island}</p>
                <p><span className="font-semibold">Molecular Weight:</span> {selectedCompound.mw} g/mol</p>
                <p><span className="font-semibold">Lipinski Violations:</span> {selectedCompound.violations}</p>
                <p><span className="font-semibold">Pa Value:</span> {selectedCompound.pa}</p>
                <p className="mt-2 text-xs text-gray-600">{getQuadrant(selectedCompound.violations, selectedCompound.pa)}</p>
              </div>
            </div>
          )}
          
          <div className="mt-6 text-xs text-gray-500">
            <p className="font-semibold mb-1">Summary:</p>
            <p>• Total compounds: {data.length}</p>
            <p>• No violations: {data.filter(d => d.violations === 0).length}</p>
            <p>• Has violations: {data.filter(d => d.violations > 0).length}</p>
            <p>• Pa > 0.7: {data.filter(d => d.pa > 0.7).length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompoundQuadrantPlot;