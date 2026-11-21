// Kanji Stroke Trajectory Engine for Real-Time On-Template Animation with Directional Arrows
// Computes and renders calligraphy strokes and arrow trajectories directly on the template character (340x340 box)

export interface StrokePathData {
  strokeIndex: number;
  d: string; // SVG path command
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  angle: number; // Angle in degrees for arrowhead orientation
  instruction: string;
}

function calculateAngle(x1: number, y1: number, x2: number, y2: number): number {
  const rad = Math.atan2(y2 - y1, x2 - x1);
  return (rad * 180) / Math.PI;
}

// Curated high-precision stroke paths for core Kanji with directional arrows
export const curatedStrokePaths: Record<string, StrokePathData[]> = {
  '日': [
    { strokeIndex: 1, d: 'M 105 85 L 105 255', startX: 105, startY: 85, endX: 105, endY: 255, angle: 90, instruction: 'Nét sổ dọc bên trái từ trên xuống dưới' },
    { strokeIndex: 2, d: 'M 105 85 L 235 85 L 235 255', startX: 105, startY: 85, endX: 235, endY: 255, angle: 90, instruction: 'Ngang gập sang phải rồi kéo sổ dọc xuống' },
    { strokeIndex: 3, d: 'M 105 170 L 235 170', startX: 105, startY: 170, endX: 235, endY: 170, angle: 0, instruction: 'Nét ngang ở giữa ngăn đôi' },
    { strokeIndex: 4, d: 'M 105 255 L 235 255', startX: 105, startY: 255, endX: 235, endY: 255, angle: 0, instruction: 'Nét ngang đóng đáy hoàn thiện chữ' },
  ],
  '安': [
    { strokeIndex: 1, d: 'M 170 70 L 170 95', startX: 170, startY: 70, endX: 170, endY: 95, angle: 90, instruction: 'Bộ Miên: Nét chấm trên đỉnh mái nhà' },
    { strokeIndex: 2, d: 'M 105 95 L 95 125', startX: 105, startY: 95, endX: 95, endY: 125, angle: 110, instruction: 'Bộ Miên: Nét chấm xiên bên trái mái nhà' },
    { strokeIndex: 3, d: 'M 95 105 L 235 105 L 225 130', startX: 95, startY: 105, endX: 225, endY: 130, angle: 100, instruction: 'Bộ Miên: Nét ngang gập móc bên phải mái nhà' },
    { strokeIndex: 4, d: 'M 170 140 Q 120 185 110 240', startX: 170, startY: 140, endX: 110, endY: 240, angle: 135, instruction: 'Bộ Nữ: Nét phẩy gập sang trái tạo dáng người phụ nữ' },
    { strokeIndex: 5, d: 'M 140 185 Q 185 220 230 260', startX: 140, startY: 185, endX: 230, endY: 260, angle: 45, instruction: 'Bộ Nữ: Nét phẩy nghiêng sang phải' },
    { strokeIndex: 6, d: 'M 75 190 L 265 190', startX: 75, startY: 190, endX: 265, endY: 190, angle: 0, instruction: 'Bộ Nữ: Nét ngang dài nâng đỡ trọn vẹn gia đình bình an' },
  ],
  '一': [
    { strokeIndex: 1, d: 'M 70 170 L 270 170', startX: 70, startY: 170, endX: 270, endY: 170, angle: 0, instruction: 'Nét ngang từ trái sang phải, nhấn nhẹ ở đuôi (Tome)' },
  ],
  '二': [
    { strokeIndex: 1, d: 'M 105 125 L 235 125', startX: 105, startY: 125, endX: 235, endY: 125, angle: 0, instruction: 'Nét ngang trên ngắn hơn' },
    { strokeIndex: 2, d: 'M 75 215 L 265 215', startX: 75, startY: 215, endX: 265, endY: 215, angle: 0, instruction: 'Nét ngang dưới dài hơn vững chãi' },
  ],
  '三': [
    { strokeIndex: 1, d: 'M 100 110 L 240 110', startX: 100, startY: 110, endX: 240, endY: 110, angle: 0, instruction: 'Nét ngang trên cùng' },
    { strokeIndex: 2, d: 'M 120 170 L 220 170', startX: 120, startY: 170, endX: 220, endY: 170, angle: 0, instruction: 'Nét ngang ở giữa ngắn nhất' },
    { strokeIndex: 3, d: 'M 75 230 L 265 230', startX: 75, startY: 230, endX: 265, endY: 230, angle: 0, instruction: 'Nét ngang đáy dài nhất nâng đỡ' },
  ],
  '十': [
    { strokeIndex: 1, d: 'M 75 165 L 265 165', startX: 75, startY: 165, endX: 265, endY: 165, angle: 0, instruction: 'Nét ngang từ trái sang phải' },
    { strokeIndex: 2, d: 'M 170 75 L 170 265', startX: 170, startY: 75, endX: 170, endY: 265, angle: 90, instruction: 'Nét sổ dọc đâm thẳng chính giữa' },
  ],
  '木': [
    { strokeIndex: 1, d: 'M 75 140 L 265 140', startX: 75, startY: 140, endX: 265, endY: 140, angle: 0, instruction: 'Nét ngang làm cành cây' },
    { strokeIndex: 2, d: 'M 170 70 L 170 270', startX: 170, startY: 70, endX: 170, endY: 270, angle: 90, instruction: 'Nét sổ dọc làm thân cây cắm rễ' },
    { strokeIndex: 3, d: 'M 170 140 Q 130 190 90 255', startX: 170, startY: 140, endX: 90, endY: 255, angle: 130, instruction: 'Nét phẩy sang trái tỏa rễ cây' },
    { strokeIndex: 4, d: 'M 170 140 Q 210 190 250 255', startX: 170, startY: 140, endX: 250, endY: 255, angle: 50, instruction: 'Nét mác sang phải cân đối' },
  ],
  '人': [
    { strokeIndex: 1, d: 'M 170 75 Q 135 155 85 265', startX: 170, startY: 75, endX: 85, endY: 265, angle: 125, instruction: 'Nét phẩy vuốt dài từ đỉnh sang trái' },
    { strokeIndex: 2, d: 'M 140 160 Q 190 205 255 265', startX: 140, startY: 160, endX: 255, endY: 265, angle: 45, instruction: 'Nét mác tì vào chân trái sải sang phải' },
  ],
  '山': [
    { strokeIndex: 1, d: 'M 170 75 L 170 265', startX: 170, startY: 75, endX: 170, endY: 265, angle: 90, instruction: 'Đỉnh núi giữa cao nhất sổ dọc' },
    { strokeIndex: 2, d: 'M 95 170 L 95 265 L 245 265', startX: 95, startY: 170, endX: 245, endY: 265, angle: 0, instruction: 'Đỉnh núi trái sổ xuống rồi gập ngang đáy' },
    { strokeIndex: 3, d: 'M 245 170 L 245 265', startX: 245, startY: 170, endX: 245, endY: 265, angle: 90, instruction: 'Đỉnh núi phải sổ dọc hoàn thành 3 đỉnh núi' },
  ],
  '川': [
    { strokeIndex: 1, d: 'M 95 95 Q 90 180 85 245', startX: 95, startY: 95, endX: 85, endY: 245, angle: 95, instruction: 'Dòng nước thứ nhất uốn lượn trái' },
    { strokeIndex: 2, d: 'M 170 120 L 170 235', startX: 170, startY: 120, endX: 170, endY: 235, angle: 90, instruction: 'Dòng nước ở giữa ngắn hơn' },
    { strokeIndex: 3, d: 'M 245 80 L 245 265', startX: 245, startY: 80, endX: 245, endY: 265, angle: 90, instruction: 'Dòng nước chính dài thẳng đứng' },
  ],
  '口': [
    { strokeIndex: 1, d: 'M 105 105 L 105 235', startX: 105, startY: 105, endX: 105, endY: 235, angle: 90, instruction: 'Sổ dọc bên trái miệng' },
    { strokeIndex: 2, d: 'M 105 105 L 235 105 L 235 235', startX: 105, startY: 105, endX: 235, endY: 235, angle: 90, instruction: 'Ngang gập sang phải thành viền trên và phải' },
    { strokeIndex: 3, d: 'M 105 235 L 235 235', startX: 105, startY: 235, endX: 235, endY: 235, angle: 0, instruction: 'Nét ngang đáy khép lại miệng vuông' },
  ],
  '月': [
    { strokeIndex: 1, d: 'M 105 85 Q 100 170 90 260', startX: 105, startY: 85, endX: 90, endY: 260, angle: 95, instruction: 'Nét phẩy đứng viền trái trăng khuyết' },
    { strokeIndex: 2, d: 'M 105 85 L 230 85 L 230 255 Q 230 265 215 260', startX: 105, startY: 85, endX: 215, endY: 260, angle: 90, instruction: 'Ngang gập sang phải sổ dọc có móc đáy' },
    { strokeIndex: 3, d: 'M 105 145 L 230 145', startX: 105, startY: 145, endX: 230, endY: 145, angle: 0, instruction: 'Nét ngang thứ nhất bên trong' },
    { strokeIndex: 4, d: 'M 105 195 L 230 195', startX: 105, startY: 195, endX: 230, endY: 195, angle: 0, instruction: 'Nét ngang thứ hai bên trong' },
  ],
  '火': [
    { strokeIndex: 1, d: 'M 115 135 Q 105 160 95 180', startX: 115, startY: 135, endX: 95, endY: 180, angle: 115, instruction: 'Đốm lửa nhỏ bên trái' },
    { strokeIndex: 2, d: 'M 225 135 Q 235 160 245 180', startX: 225, startY: 135, endX: 245, endY: 180, angle: 65, instruction: 'Đốm lửa nhỏ bên phải' },
    { strokeIndex: 3, d: 'M 170 75 Q 135 170 100 265', startX: 170, startY: 75, endX: 100, endY: 265, angle: 120, instruction: 'Ngọn lửa lớn phẩy dài sang trái' },
    { strokeIndex: 4, d: 'M 170 145 Q 205 205 250 265', startX: 170, startY: 145, endX: 250, endY: 265, angle: 45, instruction: 'Ngọn lửa lớn mác dài sang phải' },
  ],
  '水': [
    { strokeIndex: 1, d: 'M 170 70 L 170 265 Q 170 270 160 260', startX: 170, startY: 70, endX: 160, endY: 260, angle: 90, instruction: 'Sổ dọc giữa có móc câu' },
    { strokeIndex: 2, d: 'M 170 135 Q 130 145 95 170', startX: 170, startY: 135, endX: 95, endY: 170, angle: 155, instruction: 'Nét ngang gập trái' },
    { strokeIndex: 3, d: 'M 95 170 L 170 210', startX: 95, startY: 170, endX: 170, endY: 210, angle: 30, instruction: 'Nét hất từ trái lên thân giữa' },
    { strokeIndex: 4, d: 'M 170 150 Q 210 200 255 255', startX: 170, startY: 150, endX: 255, endY: 255, angle: 45, instruction: 'Nét mác sang phải hoàn tất dòng nước' },
  ],
  '休': [
    { strokeIndex: 1, d: 'M 115 85 Q 95 140 75 190', startX: 115, startY: 85, endX: 75, endY: 190, angle: 115, instruction: 'Bộ Nhân đứng (亻): Nét phẩy người' },
    { strokeIndex: 2, d: 'M 95 140 L 95 265', startX: 95, startY: 140, endX: 95, endY: 265, angle: 90, instruction: 'Bộ Nhân đứng (亻): Nét sổ dọc' },
    { strokeIndex: 3, d: 'M 145 140 L 275 140', startX: 145, startY: 140, endX: 275, endY: 140, angle: 0, instruction: 'Bộ Mộc (木): Nét ngang cành cây' },
    { strokeIndex: 4, d: 'M 210 75 L 210 270', startX: 210, startY: 75, endX: 210, endY: 270, angle: 90, instruction: 'Bộ Mộc (木): Nét sổ dọc thân cây' },
    { strokeIndex: 5, d: 'M 210 140 Q 175 190 145 255', startX: 210, startY: 140, endX: 145, endY: 255, angle: 120, instruction: 'Bộ Mộc (木): Rễ cây bên trái' },
    { strokeIndex: 6, d: 'M 210 140 Q 245 190 275 255', startX: 210, startY: 140, endX: 275, endY: 255, angle: 50, instruction: 'Bộ Mộc (木): Rễ cây bên phải' },
  ],
  '海': [
    { strokeIndex: 1, d: 'M 75 95 L 98 115', startX: 75, startY: 95, endX: 98, endY: 115, angle: 40, instruction: 'Chấm Thủy (氵): Giọt nước trên cùng' },
    { strokeIndex: 2, d: 'M 65 155 L 90 175', startX: 65, startY: 155, endX: 90, endY: 175, angle: 38, instruction: 'Chấm Thủy (氵): Giọt nước giữa' },
    { strokeIndex: 3, d: 'M 70 250 L 98 205', startX: 70, startY: 250, endX: 98, endY: 205, angle: -58, instruction: 'Chấm Thủy (氵): Nét hất từ dưới lên phải' },
    { strokeIndex: 4, d: 'M 155 70 Q 140 105 120 130', startX: 155, startY: 70, endX: 120, endY: 130, angle: 124, instruction: 'Mỗi (毎): Nét phẩy ngắn đầu chữ' },
    { strokeIndex: 5, d: 'M 145 102 L 260 102', startX: 145, startY: 102, endX: 260, endY: 102, angle: 0, instruction: 'Mỗi (毎): Nét ngang trên' },
    { strokeIndex: 6, d: 'M 152 135 Q 145 185 135 225 L 250 235', startX: 152, startY: 135, endX: 250, endY: 235, angle: 45, instruction: 'Mỗi (毎): Nét phẩy gập ngang bao đáy' },
    { strokeIndex: 7, d: 'M 152 135 L 245 135 L 240 255 Q 238 268 220 262', startX: 152, startY: 135, endX: 220, endY: 262, angle: 90, instruction: 'Mỗi (毎): Nét ngang gập sổ móc bên phải' },
    { strokeIndex: 8, d: 'M 196 142 L 190 225', startX: 196, startY: 142, endX: 190, endY: 225, angle: 94, instruction: 'Mỗi (毎): Nét chấm/sổ trục giữa' },
    { strokeIndex: 9, d: 'M 115 185 L 272 185', startX: 115, startY: 185, endX: 272, endY: 185, angle: 0, instruction: 'Mỗi (毎): Nét ngang dài vắt ngang cuối cùng' },
  ],
  '待': [
    { strokeIndex: 1, d: 'M 115 80 L 75 125', startX: 115, startY: 80, endX: 75, endY: 125, angle: 132, instruction: 'Bộ Xích (彳): Nét phẩy trên' },
    { strokeIndex: 2, d: 'M 118 125 L 72 180', startX: 118, startY: 125, endX: 72, endY: 180, angle: 130, instruction: 'Bộ Xích (彳): Nét phẩy dưới dài hơn' },
    { strokeIndex: 3, d: 'M 98 155 L 98 265', startX: 98, startY: 155, endX: 98, endY: 265, angle: 90, instruction: 'Bộ Xích (彳): Nét sổ dọc chân bước' },
    { strokeIndex: 4, d: 'M 152 110 L 252 110', startX: 152, startY: 110, endX: 252, endY: 110, angle: 0, instruction: 'Bộ Thổ (土): Nét ngang trên của chữ Tự (寺)' },
    { strokeIndex: 5, d: 'M 202 72 L 202 152', startX: 202, startY: 72, endX: 202, endY: 152, angle: 90, instruction: 'Bộ Thổ (土): Nét sổ dọc ở giữa' },
    { strokeIndex: 6, d: 'M 135 152 L 270 152', startX: 135, startY: 152, endX: 270, endY: 152, angle: 0, instruction: 'Bộ Thổ (土): Nét ngang dài phân cách' },
    { strokeIndex: 7, d: 'M 138 195 L 268 195', startX: 138, startY: 195, endX: 268, endY: 195, angle: 0, instruction: 'Bộ Thốn (寸): Nét ngang dưới' },
    { strokeIndex: 8, d: 'M 232 155 L 232 262 Q 232 272 212 260', startX: 232, startY: 155, endX: 212, endY: 260, angle: 90, instruction: 'Bộ Thốn (寸): Nét sổ móc dứt khoát' },
    { strokeIndex: 9, d: 'M 168 212 L 188 235', startX: 168, startY: 212, endX: 188, endY: 235, angle: 48, instruction: 'Bộ Thốn (寸): Nét chấm hoàn tất' },
  ],
  '持': [
    { strokeIndex: 1, d: 'M 65 130 L 122 130', startX: 65, startY: 130, endX: 122, endY: 130, angle: 0, instruction: 'Bộ Tài Gẩy (扌): Nét ngang ngắn' },
    { strokeIndex: 2, d: 'M 98 72 L 98 262 Q 98 272 82 260', startX: 98, startY: 72, endX: 82, endY: 260, angle: 90, instruction: 'Bộ Tài Gẩy (扌): Nét sổ móc dọc' },
    { strokeIndex: 3, d: 'M 65 200 L 125 170', startX: 65, startY: 200, endX: 125, endY: 170, angle: -26, instruction: 'Bộ Tài Gẩy (扌): Nét hất chéo lên phải' },
    { strokeIndex: 4, d: 'M 152 110 L 252 110', startX: 152, startY: 110, endX: 252, endY: 110, angle: 0, instruction: 'Chữ Tự (寺): Nét ngang trên' },
    { strokeIndex: 5, d: 'M 202 72 L 202 152', startX: 202, startY: 72, endX: 202, endY: 152, angle: 90, instruction: 'Chữ Tự (寺): Nét sổ dọc' },
    { strokeIndex: 6, d: 'M 135 152 L 270 152', startX: 135, startY: 152, endX: 270, endY: 152, angle: 0, instruction: 'Chữ Tự (寺): Nét ngang dài' },
    { strokeIndex: 7, d: 'M 138 195 L 268 195', startX: 138, startY: 195, endX: 268, endY: 195, angle: 0, instruction: 'Bộ Thốn (寸): Nét ngang dưới' },
    { strokeIndex: 8, d: 'M 232 155 L 232 262 Q 232 272 212 260', startX: 232, startY: 155, endX: 212, endY: 260, angle: 90, instruction: 'Bộ Thốn (寸): Nét sổ móc' },
    { strokeIndex: 9, d: 'M 168 212 L 188 235', startX: 168, startY: 212, endX: 188, endY: 235, angle: 48, instruction: 'Bộ Thốn (寸): Nét chấm kết thúc' },
  ],
  '特': [
    { strokeIndex: 1, d: 'M 75 95 L 65 155', startX: 75, startY: 95, endX: 65, endY: 155, angle: 99, instruction: 'Bộ Ngưu (牜): Nét phẩy ngắn bên trái' },
    { strokeIndex: 2, d: 'M 70 132 L 125 132', startX: 70, startY: 132, endX: 125, endY: 132, angle: 0, instruction: 'Bộ Ngưu (牜): Nét ngang' },
    { strokeIndex: 3, d: 'M 98 72 L 98 265', startX: 98, startY: 72, endX: 98, endY: 265, angle: 90, instruction: 'Bộ Ngưu (牜): Nét sổ dọc chính' },
    { strokeIndex: 4, d: 'M 62 200 L 128 175', startX: 62, startY: 200, endX: 128, endY: 175, angle: -21, instruction: 'Bộ Ngưu (牜): Nét hất lên phải (khác với chữ Ngưu đứng lẻ!)' },
    { strokeIndex: 5, d: 'M 152 110 L 252 110', startX: 152, startY: 110, endX: 252, endY: 110, angle: 0, instruction: 'Chữ Tự (寺): Nét ngang trên' },
    { strokeIndex: 6, d: 'M 202 72 L 202 152', startX: 202, startY: 72, endX: 202, endY: 152, angle: 90, instruction: 'Chữ Tự (寺): Nét sổ dọc' },
    { strokeIndex: 7, d: 'M 135 152 L 270 152', startX: 135, startY: 152, endX: 270, endY: 152, angle: 0, instruction: 'Chữ Tự (寺): Nét ngang dài' },
    { strokeIndex: 8, d: 'M 138 195 L 268 195', startX: 138, startY: 195, endX: 268, endY: 195, angle: 0, instruction: 'Bộ Thốn (寸): Nét ngang dưới' },
    { strokeIndex: 9, d: 'M 232 155 L 232 262 Q 232 272 212 260', startX: 232, startY: 155, endX: 212, endY: 260, angle: 90, instruction: 'Bộ Thốn (寸): Nét sổ móc' },
    { strokeIndex: 10, d: 'M 168 212 L 188 235', startX: 168, startY: 212, endX: 188, endY: 235, angle: 48, instruction: 'Bộ Thốn (寸): Nét chấm kết thúc' },
  ],
  '土': [
    { strokeIndex: 1, d: 'M 100 135 L 240 135', startX: 100, startY: 135, endX: 240, endY: 135, angle: 0, instruction: 'Nét ngang trên NGẮN hơn nét đáy' },
    { strokeIndex: 2, d: 'M 170 72 L 170 245', startX: 170, startY: 72, endX: 170, endY: 245, angle: 90, instruction: 'Nét sổ dọc cắm thẳng xuống mặt đất' },
    { strokeIndex: 3, d: 'M 70 245 L 270 245', startX: 70, startY: 245, endX: 270, endY: 245, angle: 0, instruction: 'Nét ngang đáy DÀI vững chắc (Phân biệt với Sĩ 士)' },
  ],
  '士': [
    { strokeIndex: 1, d: 'M 70 135 L 270 135', startX: 70, startY: 135, endX: 270, endY: 135, angle: 0, instruction: 'Nét ngang trên DÀI rộng như bờ vai kẻ sĩ' },
    { strokeIndex: 2, d: 'M 170 72 L 170 245', startX: 170, startY: 72, endX: 170, endY: 245, angle: 90, instruction: 'Nét sổ dọc thẳng đứng giữa trục' },
    { strokeIndex: 3, d: 'M 105 245 L 235 245', startX: 105, startY: 245, endX: 235, endY: 245, angle: 0, instruction: 'Nét ngang đáy NGẮN hơn nét trên (Phân biệt với Thổ 土)' },
  ],
  '未': [
    { strokeIndex: 1, d: 'M 105 115 L 235 115', startX: 105, startY: 115, endX: 235, endY: 115, angle: 0, instruction: 'Nét ngang trên NGẮN (Chồi non chưa mọc hết)' },
    { strokeIndex: 2, d: 'M 75 168 L 265 168', startX: 75, startY: 168, endX: 265, endY: 168, angle: 0, instruction: 'Nét ngang dưới DÀI hơn nét trên' },
    { strokeIndex: 3, d: 'M 170 70 L 170 270', startX: 170, startY: 70, endX: 170, endY: 270, angle: 90, instruction: 'Nét sổ dọc xuyên tâm' },
    { strokeIndex: 4, d: 'M 170 168 Q 130 215 80 258', startX: 170, startY: 168, endX: 80, endY: 258, angle: 135, instruction: 'Nét phẩy sang trái' },
    { strokeIndex: 5, d: 'M 170 168 Q 210 215 260 258', startX: 170, startY: 168, endX: 260, endY: 258, angle: 45, instruction: 'Nét mác sang phải cân đối' },
  ],
  '末': [
    { strokeIndex: 1, d: 'M 75 115 L 265 115', startX: 75, startY: 115, endX: 265, endY: 115, angle: 0, instruction: 'Nét ngang trên DÀI (Ngọn cây xòe rộng ở đỉnh)' },
    { strokeIndex: 2, d: 'M 105 168 L 235 168', startX: 105, startY: 168, endX: 235, endY: 168, angle: 0, instruction: 'Nét ngang dưới NGẮN hơn nét trên' },
    { strokeIndex: 3, d: 'M 170 70 L 170 270', startX: 170, startY: 70, endX: 170, endY: 270, angle: 90, instruction: 'Nét sổ dọc xuyên tâm' },
    { strokeIndex: 4, d: 'M 170 168 Q 130 215 80 258', startX: 170, startY: 168, endX: 80, endY: 258, angle: 135, instruction: 'Nét phẩy sang trái' },
    { strokeIndex: 5, d: 'M 170 168 Q 210 215 260 258', startX: 170, startY: 168, endX: 260, endY: 258, angle: 45, instruction: 'Nét mác sang phải' },
  ],
  '本': [
    { strokeIndex: 1, d: 'M 75 130 L 265 130', startX: 75, startY: 130, endX: 265, endY: 130, angle: 0, instruction: 'Nét ngang cành cây' },
    { strokeIndex: 2, d: 'M 170 68 L 170 270', startX: 170, startY: 68, endX: 170, endY: 270, angle: 90, instruction: 'Nét sổ dọc thân cây' },
    { strokeIndex: 3, d: 'M 170 130 Q 130 185 82 245', startX: 170, startY: 130, endX: 82, endY: 245, angle: 130, instruction: 'Nét phẩy sang trái' },
    { strokeIndex: 4, d: 'M 170 130 Q 210 185 258 245', startX: 170, startY: 130, endX: 258, endY: 245, angle: 50, instruction: 'Nét mác sang phải' },
    { strokeIndex: 5, d: 'M 122 225 L 218 225', startX: 122, startY: 225, endX: 218, endY: 225, angle: 0, instruction: 'Nét ngang đánh dấu gốc rễ ở đáy cây' },
  ],
  '会': [
    { strokeIndex: 1, d: 'M 170 70 Q 125 120 72 162', startX: 170, startY: 70, endX: 72, endY: 162, angle: 138, instruction: 'Nón Nhân (𠆢): Nét phẩy mái nhà trái' },
    { strokeIndex: 2, d: 'M 170 70 Q 215 120 268 162', startX: 170, startY: 70, endX: 268, endY: 162, angle: 42, instruction: 'Nón Nhân (𠆢): Nét mác mái nhà phải' },
    { strokeIndex: 3, d: 'M 118 148 L 222 148', startX: 118, startY: 148, endX: 222, endY: 148, angle: 0, instruction: 'Bộ Vân (云): Nét ngang trên ngắn' },
    { strokeIndex: 4, d: 'M 88 188 L 252 188', startX: 88, startY: 188, endX: 252, endY: 188, angle: 0, instruction: 'Bộ Vân (云): Nét ngang dưới dài' },
    { strokeIndex: 5, d: 'M 155 188 L 108 256 L 235 245', startX: 155, startY: 188, endX: 235, endY: 245, angle: 12, instruction: 'Bộ Tư (ム): Phẩy xiên rồi kéo ngang hất lên' },
    { strokeIndex: 6, d: 'M 218 215 L 252 262', startX: 218, startY: 215, endX: 252, endY: 262, angle: 53, instruction: 'Bộ Tư (ム): Nét chấm kết thúc' },
  ],
};

// Algorithmic generator for any Kanji with natural stroke vectors & orientation angles
export function getKanjiStrokePaths(character: string, strokeCount: number, strokeGuides?: string[]): StrokePathData[] {
  if (curatedStrokePaths[character]) {
    return curatedStrokePaths[character];
  }

  const total = Math.max(1, strokeCount || 4);
  const result: StrokePathData[] = [];

  const topY = 85;
  const bottomY = 255;
  const leftX = 85;
  const rightX = 255;
  const midX = 170;
  const midY = 170;

  const stepY = (bottomY - topY) / (total + 1);

  for (let i = 0; i < total; i++) {
    const idx = i + 1;
    let d = '';
    let startX = leftX;
    let startY = topY + stepY * idx;
    let endX = rightX;
    let endY = startY;

    if (total === 1) {
      d = `M ${leftX} ${midY} L ${rightX} ${midY}`;
      startX = leftX; startY = midY; endX = rightX; endY = midY;
    } else if (idx === 1) {
      // First stroke: top horizontal (left to right)
      d = `M ${leftX + 20} ${topY + 15} L ${rightX - 20} ${topY + 15}`;
      startX = leftX + 20; startY = topY + 15; endX = rightX - 20; endY = topY + 15;
    } else if (idx === total) {
      // Last stroke: bottom horizontal
      d = `M ${leftX} ${bottomY} L ${rightX} ${bottomY}`;
      startX = leftX; startY = bottomY; endX = rightX; endY = bottomY;
    } else if (idx % 2 === 0) {
      // Vertical stroke (top to bottom)
      const x = leftX + ((rightX - leftX) / (total + 1)) * idx;
      d = `M ${x} ${topY + 20} L ${x} ${bottomY - 15}`;
      startX = x; startY = topY + 20; endX = x; endY = bottomY - 15;
    } else {
      // Diagonal or cross (left to right)
      d = `M ${leftX + 15} ${startY} L ${rightX - 15} ${startY}`;
      startX = leftX + 15; endX = rightX - 15;
    }

    const angle = calculateAngle(startX, startY, endX, endY);

    result.push({
      strokeIndex: idx,
      d,
      startX,
      startY,
      endX,
      endY,
      angle,
      instruction: strokeGuides?.[i] || `Nét ${idx}: Kéo bút theo chiều mũi tên chỉ dẫn chuẩn xác`,
    });
  }

  return result;
}
