# mamlek-mvp

[![Open in Bolt](https://bolt.new/static/open-in-bolt.svg)](https://bolt.new/~/sb1-dh6kbrdc)

## Supabase

1. Create a project at https://app.supabase.com and copy the project URL and anon key.
2. Create a `.env` file at the project root (see `.env.example`) and set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
3. Restart the dev server (`npm run dev`).

Example usage in the app:

```ts
import { supabase } from './src/lib/supabase'

const { data, error } = await supabase.from('profiles').select('*')
```

