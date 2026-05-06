const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://qugmulicnoyvygdlfksm.supabase.co';
const supabaseAnonKey = 'sb_publishable_WWgk8pWpfgEDbrBItqIhIA_5FH9b3kQ';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkBuckets() {
    const { data, error } = await supabase.storage.listBuckets();
    if (error) {
        console.error('Error listing buckets:', error);
    } else {
        console.log('Buckets:', data.map(b => b.name));
    }
}

checkBuckets();
