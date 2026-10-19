import { NextResponse } from 'next/response';
import { getSheets } from '@/lib/googleSheets';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { cart, paymentMethod, totalAmount, cashierName } = body;
    const { sheets, spreadsheetId } = await getSheets();
    
    const transactionId = `TRX-${Date.now()}`;
    const date = new Date().toISOString();

    // 1. Insert Transaction
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Transactions!A:I',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[transactionId, transactionId, totalAmount, paymentMethod, cashierName, 'OUTLET-1', '-', '-', date]],
      },
    });

    // 2. Insert Transaction Items
    const itemsValues = cart.map((item: any) => [
      `ITEM-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      transactionId,
      item.id,
      item.qty,
      item.price,
      '-'
    ]);

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Transaction_Items!A:F',
      valueInputOption: 'USER_ENTERED',
      requestBody: { values: itemsValues },
    });

    // 3. Sync Stock (Potong Stok Otomatis)
    const productsRes = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Products!A:E',
    });
    
    const rows = productsRes.data.values || [];
    const updateData = [];

    for (const item of cart) {
      const rowIndex = rows.findIndex(row => row[0] === item.id);
      if (rowIndex !== -1) {
        const currentStock = Number(rows[rowIndex][4]) || 0;
        const newStock = Math.max(0, currentStock - item.qty);
        
        updateData.push({
          range: `Products!E${rowIndex + 1}`,
          values: [[newStock]]
        });
      }
    }

    if (updateData.length > 0) {
      await sheets.spreadsheets.values.batchUpdate({
        spreadsheetId,
        requestBody: {
          valueInputOption: 'USER_ENTERED',
          data: updateData
        }
      });
    }

    return NextResponse.json({ success: true, transactionId });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Checkout failed' }, { status: 500 });
  }
}
