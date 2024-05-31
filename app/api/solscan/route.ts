import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const transactionId = searchParams.get('transactionId');

  if (!transactionId) {
    return NextResponse.json({ error: 'Transaction ID is required' }, { status: 400 });
  }

  const apiUrl = `https://pro-api.solscan.io/v1.0/transaction/${transactionId}`;

  try {
    const response = await fetch(apiUrl, {
      headers: {
        accept: '*/*',
        token: process.env.SOLSCAN_API_KEY!,
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching transaction data:', error);
    return NextResponse.json({ error: 'Error fetching transaction data' }, { status: 500 });
  }
}
