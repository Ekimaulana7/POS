import { NextResponse } from 'next/response';
import { getSheets } from '@/lib/googleSheets';

export async function GET() {
  try {
    const { sheets, spreadsheetId } = await getSheets();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Products!A2:G',
    });

    const rows = response.data.values || [];
    const products = rows.map((row) => ({
      id: row[0],
      sku: row[1],
      name: row[2],
      price: Number(row[3]),
      stock: Number(row[4]),
      category: row[5],
      is_ingredient: row[6] === 'TRUE',
    }));

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
