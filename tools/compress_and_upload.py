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

def process_single_file(filepath, choice="1"):
    filename = clean_filename(filepath)
    size_mb = os.path.getsize(filepath) / (1024 * 1024)
    print(f"\n==========================================")
    print(f"Processing: {filename} ({size_mb:.1f} MB)")
    print(f"==========================================")
    
    if choice == "2":
        return upload_to_vault(filepath, filename)
    elif choice == "3":
        u1 = upload_to_vault(filepath, filename)
        u2 = optimize_and_push_edge(filepath, filename)
        return u2
    else:
        return optimize_and_push_edge(filepath, filename)

def main():
    if len(sys.argv) > 1:
        target = sys.argv[1].strip('"')
    else:
        target = input("Enter path to video file OR folder: ").strip().strip('"')
    
    if not os.path.exists(target):
        print(f"Error: Path '{target}' does not exist.")
        return
    
    print("\nChoose Destination Engine Policy:")
    print("  [1] ⚡ Edge CDN (Strictly Small <20MB — auto-compresses for website)")
    print("  [2] 📦 Release Vault (Both Small & Large — uploads raw file up to 2GB)")
    print("  [3] 🚀 Dual-Sync (Uploads raw to Vault AND compresses for Edge CDN)")
    choice = input("Enter choice (1, 2, or 3, default 1): ").strip() or "1"

    if os.path.isdir(target):
        exts = ('.mp4', '.mov', '.webm', '.m4v')
        files = [os.path.join(target, f) for f in os.listdir(target) if f.lower().endswith(exts)]
        if not files:
            print("No video files found in directory.")
            return
        print(f"\nFound {len(files)} video(s) in folder. Starting batch processing...")
        results = []
        for i, fp in enumerate(files, 1):
            print(f"\n[{i}/{len(files)}] Starting {os.path.basename(fp)}...")
            try:
                url = process_single_file(fp, choice)
                results.append((os.path.basename(fp), url, "SUCCESS"))
            except Exception as e:
                print(f"Error processing {fp}: {e}")
                results.append((os.path.basename(fp), str(e), "FAILED"))
        
        print("\n================ BATCH SUMMARY ================")
        for name, res, status in results:
            print(f"[{status}] {name} -> {res}")
        print("===============================================")
    else:
        process_single_file(target, choice)

if __name__ == "__main__":
    main()
