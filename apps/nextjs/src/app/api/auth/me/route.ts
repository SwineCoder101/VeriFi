import { NextResponse } from 'next/server';

export async function GET() {
  const user = { id: 1, name: 'John Doe', email: 'john.doe@example.com' }; // Example data
  return NextResponse.json(user);
}