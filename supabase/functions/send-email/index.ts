import "@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

export default {
  fetch: async (req: Request) => {
    // Handle CORS preflight requests
    if (req.method === 'OPTIONS') {
      return new Response('ok', { headers: corsHeaders });
    }

    try {
      const { to, subject, html, reply_to } = await req.json();

      const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');

      if (!RESEND_API_KEY) {
        throw new Error('RESEND_API_KEY is not set');
      }

      const payload: any = {
        from: 'Voyage Eden <onboarding@resend.dev>', 
        // TEMPORARY FIX: Force the 'to' address to the verified email for testing.
        // Once voyageeden.com is verified in Resend, change this back to: to: to || ['dewnipathirana1@gmail.com']
        to: ['dewnipathirana1@gmail.com'], 
        subject: subject || 'New Form Submission',
        html: html || '<p>New submission from website</p>',
      };

      if (reply_to && typeof reply_to === 'string' && reply_to.trim() !== '') {
        payload.reply_to = reply_to;
      }

      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Resend API Error:", data);
        throw new Error(data.message || 'Failed to send email');
      }

      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      });
    } catch (error: any) {
      console.error("Function Error:", error);
      return new Response(JSON.stringify({ error: error.message }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      });
    }
  }
};

