export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { images } = req.body;

  if (!images || !Array.isArray(images) || images.length === 0) {
    return res.status(400).json({ error: 'Nenhuma imagem recebida' });
  }

  const openAiKey = process.env.OPENAI_API_KEY;
  if (!openAiKey) {
    return res.status(500).json({ error: 'Chave OpenAI não configurada no servidor' });
  }

  try {
    const content = images.map(base64 => ({
      type: 'image_url',
      image_url: {
        url: `data:image/jpeg;base64,${base64}`,
        detail: 'high'
      }
    }));

    content.push({
      type: 'text',
      text: 'Extraia e transcreva TODO o texto legível deste certificado. Inclua: nome do profissional, nome do curso/programa, carga horária, data, instituição emissora, número de registro profissional (CRFa, CREFITO, CRM, CREF etc.), nível de certificação, e qualquer outra informação relevante. Retorne apenas o texto extraído, sem comentários adicionais.'
    });

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openAiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        max_tokens: 1500,
        messages: [{ role: 'user', content }]
      })
    });

    const data = await response.json();

    if (data.error) {
      return res.status(500).json({ error: data.error.message });
    }

    const text = data.choices?.[0]?.message?.content || '';
    return res.status(200).json({ text });

  } catch (e) {
    return res.status(500).json({ error: e.message || 'Erro ao processar PDF' });
  }
}
