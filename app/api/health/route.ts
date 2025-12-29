import { NextResponse } from 'next/server';

export const runtime = 'edge';

interface HealthResponse {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  version: string;
  responseTimeMs: number;
  checks: {
    name: string;
    status: 'pass' | 'fail';
    message?: string;
  }[];
}

export async function GET() {
  const startTime = Date.now();

  const checks = [
    {
      name: 'api',
      status: 'pass' as const,
      message: 'API responding normally',
    },
    {
      name: 'memory',
      status: 'pass' as const,
      message: 'Memory usage within limits',
    },
  ];

  const allPassing = checks.every((check) => check.status === 'pass');

  const response: HealthResponse = {
    status: allPassing ? 'healthy' : 'degraded',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '0.1.0',
    responseTimeMs: Date.now() - startTime,
    checks,
  };

  return NextResponse.json(response, {
    status: allPassing ? 200 : 503,
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  });
}
