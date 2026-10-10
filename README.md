# Chirag Rao Portfolio (`iamchiragrao.github.io`)

High-performance video editor & visual storyteller portfolio website built with Next.js, React, Tailwind CSS, and Framer Motion.

---

## 🚀 Live Websites

- **Portfolio Website**: [https://iamchiragrao.github.io](https://iamchiragrao.github.io)
- **Asset Hub & Portfolio Linker Studio**: [https://iamchiragrao.github.io/my-assets/](https://iamchiragrao.github.io/my-assets/)
- **Asset Storage Repository**: [https://github.com/iamchiragrao/my-assets](https://github.com/iamchiragrao/my-assets)

---

## ⚡ Media & Asset Pipeline

All video and media assets for this website are delivered via a high-performance dual-engine architecture:

1. **⚡ Edge CDN (jsDelivr Anycast CDN)**:
   - For web clips $\le 20\text{ MB}$.
   - Sub-15ms latency across 750+ global edge locations with native HTTP/2 byte-range seeking.
   - URL: `https://cdn.jsdelivr.net/gh/iamchiragrao/my-assets@main/assets/<filename>`
2. **📦 Release Vault (GitHub Releases `v1.0-assets`)**:
   - For high-capacity videos up to 2 GB per file (client masters, 4K cuts).
   - URL: `https://github.com/iamchiragrao/my-assets/releases/download/v1.0-assets/<filename>`

---

## 🎨 Portfolio Linker Studio

To link or change videos displayed across the website without modifying code:
1. Open the **[Portfolio Linker Studio](https://iamchiragrao.github.io/my-assets/)**.
2. Select an uploaded video from the dropdown menu for any of the 19 slots.
3. Review your staged changes.
4. Click **Commit & Auto-Deploy** to commit to `atomik-clone/src/data/portfolio-assets.json` and automatically trigger a live site redeployment.

For the complete guide and documentation, see the [my-assets Documentation](https://github.com/iamchiragrao/my-assets/blob/main/README.md).
