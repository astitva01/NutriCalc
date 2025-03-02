import React, { useEffect, useRef } from 'react';

interface MacroChartProps {
  protein: number;
  carbs: number;
  fat: number;
  showLegend?: boolean;
}

export const MacroChart = ({ protein, carbs, fat }: MacroChartProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Data for pie chart
    const data = [
      { value: protein, color: '#3B82F6', label: 'Protein' }, // Blue
      { value: carbs, color: '#10B981', label: 'Carbs' },    // Green
      { value: fat, color: '#F59E0B', label: 'Fat' }         // Yellow
    ];

    // Calculate total
    const total = data.reduce((sum, item) => sum + item.value, 0);

    // Draw pie chart
    let startAngle = 0;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 20;

    // Add subtle shadow
    ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetY = 5;

    data.forEach(item => {
      // Create gradient for depth effect
      const gradient = ctx.createRadialGradient(
        centerX, centerY, radius * 0.4,
        centerX, centerY, radius
      );
      gradient.addColorStop(0, `${item.color}CC`);
      gradient.addColorStop(1, `${item.color}99`);

      // Calculate slice angle
      const sliceAngle = (2 * Math.PI * item.value) / total;

      // Draw slice with border
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // White border between segments
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw label with background
      const labelAngle = startAngle + sliceAngle / 2;
      const labelX = centerX + (radius * 0.7) * Math.cos(labelAngle);
      const labelY = centerY + (radius * 0.7) * Math.sin(labelAngle);

      ctx.fillStyle = 'white';
      ctx.font = 'bold 16px "Inter", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
      ctx.shadowBlur = 3;
      ctx.fillText(`${item.value}%`, labelX, labelY);

      // Reset shadow
      ctx.shadowColor = 'transparent';

      // Update start angle for next slice
      startAngle += sliceAngle;
    });

  }, [protein, carbs, fat]);

  return (
    <div className="flex justify-center p-6 bg-white rounded-xl shadow-lg border border-gray-100">
      <canvas 
        ref={canvasRef} 
        width={400} 
        height={350}
        className="max-w-full"
      />
    </div>
  );
};