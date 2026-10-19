import { NextResponse } from 'next/response';
import { getSheets } from '@/lib/googleSheets';

export async function POST(request: Request) {
  try {
    const { cashierName, startingCash, action } = await request.json();
    const { sheets, spreadsheetId } = await getSheets();
    const date = new Date().toISOString();

    if (action === 'open') {
      const shiftId = `SHIFT-${Date.now()}`;
      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: 'Shifts!A:H',
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [[shiftId, cashierName, startingCash, 0, 0, 'OPEN', date, '-']],
        },
      });
      return NextResponse.json({ success: true, shiftId });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Shift update failed' }, { status: 500 });
  }
}
