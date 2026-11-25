"""Verify the exact Pages artifact, including all three demo applications."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "out"
BASE = "/Portfolio/"
PDFS = (
    "Curriculo-Daniel-Lima-QA-Automacao.pdf",
    "Curriculo-Daniel-Lima-FullStack.pdf",
    "Resume-Daniel-Lima-QA-EN.pdf",
    "Resume-Daniel-Lima-FullStack-EN.pdf",
)

for name in PDFS:
    path = OUT / "cv" / name
    assert path.read_bytes().startswith(b"%PDF-"), f"Invalid resume: {name}"

for name in ("floricultura", "vlinix", "orcamentos"):
    assert (OUT / "demos" / name / "index.html").is_file(), f"Missing demo: {name}"


class Assets(HTMLParser):
    def __init__(self):
        super().__init__()
        self.urls = []
        self.base = None

    def handle_starttag(self, tag, attrs):
        fields = dict(attrs)
        if tag == "base":
            self.base = fields.get("href")
        if tag in ("script", "img", "source") and fields.get("src"):
            self.urls.append(fields["src"])
        if tag == "link" and fields.get("href"):
            self.urls.append(fields["href"])


checked = 0
vlinix_entry = OUT / "demos" / "vlinix" / "index.html"
for html in OUT.rglob("*.html"):
    parser = Assets()
    parser.feed(html.read_text())
    if html == vlinix_entry:
        assert parser.base == "/Portfolio/demos/vlinix/", "Incorrect Flutter base href."
    for url in parser.urls:
        parsed = urlsplit(url)
        if parsed.scheme or parsed.netloc or not parsed.path:
            continue
        path = unquote(parsed.path)
        if path.startswith("/"):
            assert path.startswith(BASE), f"Incorrect base path in {html}: {path}"
            target = OUT / path[len(BASE):]
        else:
            target = html.parent / path
        assert target.is_file(), f"Missing asset in {html}: {url}"
        checked += 1

for required in (
    "flutter_bootstrap.js", "main.dart.js", "assets/FontManifest.json",
    "canvaskit/canvaskit.js", "canvaskit/canvaskit.wasm",
):
    assert (vlinix_entry.parent / required).is_file(), f"Missing Flutter runtime asset: {required}"

size = sum(path.stat().st_size for path in OUT.rglob("*") if path.is_file())
assert size < 1_000_000_000, "Pages artifact exceeds 1 GB."
print(f"Validated four resumes, three demos, {checked} HTML asset references; {size:,} bytes.")
