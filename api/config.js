export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-store');

  res.status(200).json({
    supabaseUrl:  process.env.SUPABASE_URL  || '',
    supabaseKey:  process.env.SUPABASE_ANON_KEY || '',
    webhookUrl:   process.env.N8N_WEBHOOK_URL || '',
    openAiKey:    process.env.OPENAI_API_KEY || '',
  });
}
