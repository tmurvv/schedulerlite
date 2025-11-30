export async function handler(event: any) {
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: `Hello from SchedulerLite v.0.0.0 from src dir ${event}` })
  };
}