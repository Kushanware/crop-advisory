import { NextRequest, NextResponse } from 'next/server';
import { getMandiPrices, getCropPrices, getStatePrices, getTrendingCrops, searchStateData, getAvailableStates } from '@/lib/mandi-api';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const crop = searchParams.get('crop');
    const state = searchParams.get('state');
    const trending = searchParams.get('trending');
    const states = searchParams.get('states');
    const search = searchParams.get('search');

    if (states) {
      const availableStates = await getAvailableStates();
      return NextResponse.json({ success: true, data: availableStates });
    }

    if (search && state) {
      const prices = await searchStateData(state);
      return NextResponse.json({ success: true, data: prices, state: state });
    }

    if (crop) {
      const prices = await getCropPrices(crop);
      return NextResponse.json({ success: true, data: prices });
    }

    if (state) {
      const prices = await getStatePrices(state);
      return NextResponse.json({ success: true, data: prices });
    }

    if (trending) {
      const prices = await getTrendingCrops();
      return NextResponse.json({ success: true, data: prices });
    }

    // Default: return all prices
    const allPrices = await getMandiPrices();
    return NextResponse.json(allPrices);

  } catch (error) {
    console.error('Mandi API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch mandi prices', data: [] },
      { status: 500 }
    );
  }
}