# English resume sources

These two English resumes translate the QA and Full Stack Portuguese PDFs confirmed by Daniel in November 2026. They preserve the same experience, projects and qualifications. The source of truth for the English wording is `english-resumes.json`.

## Regenerate

Requires Python 3.10+, ReportLab and the Open Sans regular/bold TrueType fonts (`fonts-open-sans` on Debian/Ubuntu). The generated PDFs embed those fonts. On another operating system, set `CV_FONT_DIR` to the directory containing `OpenSans-Regular.ttf` and `OpenSans-Bold.ttf`. The script does not modify the Portuguese originals.

```sh
python3 -m pip install reportlab
python3 scripts/cv/generate_resumes.py
```

Outputs:

- `public/cv/Resume-Daniel-Lima-QA-EN.pdf`
- `public/cv/Resume-Daniel-Lima-FullStack-EN.pdf`

Use `--output-dir /absolute/path` to render review copies elsewhere. Each resume is deliberately two pages; the script stops if text overflows rather than silently shrinking or omitting it.

## Editorial rules

- Translate the confirmed CV content without adding projects, metrics or responsibilities.
- Keep Nasajon's role as **QA Intern**.
- Describe the IFBA qualification as an **Undergraduate Technology Degree in Systems Analysis and Development**, in progress. This wording does not claim a foreign degree equivalence.
- Keep **5th semester** and **expected completion: first half of 2028 (2028.1)** until Daniel supplies an update.
- Preserve **Regional Top 10** and **nominated for global evaluation** for NASA Space Apps, and identify the work as a team project.
- Preserve English **B2** and the stated French level.
- Keep all contact and project links clickable, with selectable text.

After a content change, extract the text, check the URLs, render both pages of both PDFs, and visually inspect for clipped text, overlap and missing glyphs before publication.
