# Lead form update

## Fix saving after removing the budget field

Creating a migration file locally does not update the hosted Supabase database.
The original table requires a budget, while the shortened form no longer sends
one. If this migration has not been applied, Supabase rejects the insert.

1. Open the [project SQL editor](https://supabase.com/dashboard/project/mmlnfcdckkjjwihkhvre/sql/new).
2. Paste and run the SQL below (also available in [002_optional_budget.sql](./002_optional_budget.sql)):

   ```sql
   alter table public.leads alter column budget drop not null;
   ```

3. Verify the result:

   ```sql
   select column_name, is_nullable
   from information_schema.columns
   where table_schema = 'public'
     and table_name = 'leads'
     and column_name = 'budget';
   ```

   `is_nullable` must be `YES`.

4. Submit the form again. The API should return `201` after saving. A previously
   registered phone returns `409`; use WhatsApp for updates to an existing lead.

This change preserves existing leads and their historical budget values. It is
safe to run again. No app restart or redeployment is needed for this database
change. Do not rerun [001_leads.sql](./001_leads.sql) on an existing database.

If the insert still fails after verification, inspect the server-side database
error code; `503` alone can also indicate other database failures. Never share
secret keys or complete lead records in debugging screenshots.

New submissions use the founding journey (Mathura–Vrindavan) on the server and
do not collect a destination or budget. Historical values remain available.

Phone numbers are normalized to 10 Indian mobile digits. This validates format;
it does not verify ownership or whether a number is reachable. The form uses
server validation, a honeypot, same-origin browser checks and a bounded JSON body.
These measures do not replace a CAPTCHA or infrastructure rate limiting against
automated traffic. Supabase secret keys must remain server-only, and anonymous
table access must remain disabled as configured in the initial migration.
