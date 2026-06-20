# Adding stream items from an Apple Shortcut

The `Add stream item` GitHub Actions workflow (`.github/workflows/add-stream-item.yml`)
takes a URL and a short description, fetches the page title, writes a `reading` (or
`building`) post, and opens a **draft PR**. An Apple Shortcut triggers it via the GitHub API.

## One-time setup

### 1. Create a fine-grained personal access token

GitHub → Settings → Developer settings → Fine-grained tokens → Generate new token.

- Repository access: only `larryhudson/11ty-blog-bliss`
- Permissions: **Actions → Read and write** (this is all it can do — trigger workflows)
- Copy the token; you'll paste it into the Shortcut.

### 2. Allow Actions to open PRs

Repo → Settings → Actions → General → Workflow permissions →
tick **"Allow GitHub Actions to create and approve pull requests"**.
(The workflow's own `GITHUB_TOKEN` opens the PR; this setting lets it.)

## The Shortcut

Make a new Shortcut with these actions:

1. **Receive** URLs from the share sheet (Shortcut settings → "Show in Share Sheet",
   accept URLs). Or start with an **Ask for Input** (Text) for the URL.
2. **Ask for Input** → Text → prompt "Description" (your short take).
3. **Get Contents of URL**:
   - URL: `https://api.github.com/repos/larryhudson/11ty-blog-bliss/actions/workflows/add-stream-item.yml/dispatches`
   - Method: `POST`
   - Headers:
     - `Authorization`: `Bearer YOUR_TOKEN`
     - `Accept`: `application/vnd.github+json`
     - `X-GitHub-Api-Version`: `2022-11-28`
   - Request Body: **JSON**
     - `ref` (Text): `main`
     - `inputs` (Dictionary):
       - `url` (Text): the Shortcut Input / URL from step 1
       - `description` (Text): the answer from step 2
       - `type` (Text): `reading`
       - `title` (Text, optional): leave empty to use the page's detected title,
         or pass your own to override it
       - `shouldPublish` (Boolean, optional): `true` merges the PR straight away
         (publishes), anything else opens a draft to review first
4. (Optional) **Show Notification**: "Reading item submitted".

A successful dispatch returns `204 No Content`. The workflow then runs and opens a draft
PR within a minute or so.

## Notes

- For a "building" item (a repo), duplicate the Shortcut and set `type` to `building`.
- The post body defaults to your description; edit the wording in the draft PR before merging.
- Title is fetched server-side (prefers `og:title`, falls back to `<title>`), so the
  Shortcut only sends the URL and description.
