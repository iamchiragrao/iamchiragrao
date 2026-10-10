import os
import sys
import subprocess
import re
import urllib.request
import json
import imageio_ffmpeg

TOKEN_FILE = os.path.join(os.path.dirname(__file__), ".token")

def get_token():
    if os.environ.get("GITHUB_TOKEN"):
        return os.environ.get("GITHUB_TOKEN").strip()
    if os.path.exists(TOKEN_FILE):
        with open(TOKEN_FILE, "r") as f:
            t = f.read().strip()
            if t: return t
    tok = input("Enter your GitHub Personal Access Token: ").strip()
    if tok:
        with open(TOKEN_FILE, "w") as f:
            f.write(tok)
        return tok
    raise ValueError("GitHub Token required.")

TOKEN = get_token()
OWNER = "iamchiragrao"
REPO = "my-assets"
BRANCH = "main"
VAULT_TAG = "v1.0-assets"
ASSETS_DIR = r"c:\Projects\my-assets\assets"
REPO_DIR = r"c:\Projects\my-assets"

def clean_filename(name):
    base = os.path.basename(name)
    name, ext = os.path.splitext(base)
    clean = re.sub(r'[\s\+]+', '_', name)
    clean = re.sub(r'[^\w\-_]', '', clean).lower()
    return f"{clean}{ext.lower()}"

def upload_to_vault(filepath, filename):
    print(f"\n[VAULT] Fetching release details for {VAULT_TAG}...")
    req = urllib.request.Request(
        f"https://api.github.com/repos/{OWNER}/{REPO}/releases/tags/{VAULT_TAG}",
        headers={"Authorization": f"token {TOKEN}", "User-Agent": "ChiragTools"}
    )
    with urllib.request.urlopen(req) as resp:
        rel = json.loads(resp.read().decode())
    
    release_id = rel['id']
    upload_url = f"https://uploads.github.com/repos/{OWNER}/{REPO}/releases/{release_id}/assets?name={filename}"
    
    file_size_mb = os.path.getsize(filepath) / (1024 * 1024)
    print(f"[VAULT] Uploading raw master ({file_size_mb:.1f} MB) to Release Vault...")
    
    with open(filepath, 'rb') as f:
        file_data = f.read()
    
    post_req = urllib.request.Request(
        upload_url,
        data=file_data,
        headers={
            "Authorization": f"token {TOKEN}",
            "Content-Type": "application/octet-stream",
            "User-Agent": "ChiragTools"
        }
    )
    with urllib.request.urlopen(post_req) as resp:
        res = json.loads(resp.read().decode())
    
    download_url = res.get('browser_download_url')
    print(f"\nSUCCESS! File available in Release Vault:")
    print(f"👉 {download_url}")
    return download_url

def optimize_and_push_edge(filepath, filename):
    ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
    out_path = os.path.join(ASSETS_DIR, filename)
    
    orig_mb = os.path.getsize(filepath) / (1024 * 1024)
    print(f"\n[EDGE CDN] Compressing {orig_mb:.1f} MB -> Web-Optimized MP4 (<20MB)...")
    
    cmd = [
        ffmpeg, '-y', '-i', filepath,
        '-c:v', 'libx264', '-crf', '24', '-preset', 'faster',
        '-c:a', 'aac', '-b:a', '128k',
        '-movflags', '+faststart',
        out_path
    ]
    subprocess.run(cmd, check=True)
    new_mb = os.path.getsize(out_path) / (1024 * 1024)
    print(f"[EDGE CDN] Compression complete: {orig_mb:.1f} MB -> {new_mb:.1f} MB")
    
    print("[EDGE CDN] Committing and pushing to GitHub...")
    subprocess.run(["git", "add", f"assets/{filename}"], cwd=REPO_DIR, check=True)
    subprocess.run(["git", "commit", "-m", f"Upload web-optimized asset: {filename}"], cwd=REPO_DIR, check=True)
    subprocess.run(["git", "push", "origin", "main"], cwd=REPO_DIR, check=True)
    
    cdn_url = f"https://cdn.jsdelivr.net/gh/{OWNER}/{REPO}@{BRANCH}/assets/{filename}"
    print(f"\nSUCCESS! Asset pushed and live on jsDelivr Edge CDN:")
    print(f"👉 {cdn_url}")
    return cdn_url

def main():
    if len(sys.argv) > 1:
        filepath = sys.argv[1].strip('"')
    else:
        filepath = input("Enter path to video or media file: ").strip().strip('"')
    
    if not os.path.exists(filepath):
        print(f"Error: File '{filepath}' does not exist.")
        return
    
    filename = clean_filename(filepath)
    size_mb = os.path.getsize(filepath) / (1024 * 1024)
    print(f"\nSelected: {filename} ({size_mb:.1f} MB)")
    print("Choose Destination Engine:")
    print("  [1] ⚡ Edge CDN (Auto-compresses <20MB for fast website streaming)")
    print("  [2] 📦 Release Vault (Uploads raw uncompressed up to 2GB)")
    choice = input("Enter choice (1 or 2, default 1): ").strip() or "1"
    
    if choice == "2":
        upload_to_vault(filepath, filename)
    else:
        optimize_and_push_edge(filepath, filename)

if __name__ == "__main__":
    main()
