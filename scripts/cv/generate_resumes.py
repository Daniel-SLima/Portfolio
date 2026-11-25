#!/usr/bin/env python3
"""Build the two English resumes from their reviewed, editable JSON source.

Dependency: reportlab. Run from any directory with Python 3.
The Portuguese PDFs are the user-confirmed originals and are never rewritten.
"""

from __future__ import annotations

import argparse
import json
import os
from html import escape
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT, TA_RIGHT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph


ROOT = Path(__file__).resolve().parents[2]
SOURCE = Path(__file__).with_name("english-resumes.json")
PAGE_WIDTH, PAGE_HEIGHT = letter
LEFT = 42
RIGHT = 42
TOP = 37
BOTTOM = 39
WIDTH = PAGE_WIDTH - LEFT - RIGHT
INK = colors.HexColor("#172237")
BODY = colors.HexColor("#36465D")
MUTED = colors.HexColor("#58677E")
LINE = colors.HexColor("#CED6E2")


def register_fonts() -> tuple[str, str]:
    """Embed Open Sans so the delivered PDFs render consistently everywhere."""
    folders = [Path("/usr/share/fonts/truetype/open-sans")]
    if os.environ.get("CV_FONT_DIR"):
        folders.insert(0, Path(os.environ["CV_FONT_DIR"]))
    regular, bold = "OpenSans-Regular.ttf", "OpenSans-Bold.ttf"
    for folder in folders:
        if (folder / regular).exists() and (folder / bold).exists():
            pdfmetrics.registerFont(TTFont("ResumeBody", str(folder / regular)))
            pdfmetrics.registerFont(TTFont("ResumeBold", str(folder / bold)))
            pdfmetrics.registerFontFamily(
                "ResumeBody", normal="ResumeBody", bold="ResumeBold",
                italic="ResumeBody", boldItalic="ResumeBold"
            )
            return "ResumeBody", "ResumeBold"
    raise RuntimeError("Install Open Sans (fonts-open-sans on Debian/Ubuntu) or set CV_FONT_DIR to its TTF directory.")


def link(url: str, label: str) -> str:
    return f'<a href="{escape(url, quote=True)}" color="#255C91">{escape(label)}</a>'


def short_url(url: str) -> str:
    return url.removeprefix("https://").removeprefix("www.").rstrip("/")


class Resume:
    def __init__(self, data: dict, resume: dict, output: Path):
        self.data = data
        self.resume = resume
        self.regular, self.bold = register_fonts()
        self.accent = colors.HexColor(resume["accent"])
        self.pdf = canvas.Canvas(str(output), pagesize=letter, pageCompression=1, invariant=1)
        self.pdf.setTitle(f"Daniel Santana Lima - {resume['label']} Resume (English)")
        self.pdf.setAuthor(data["contact"]["name"])
        self.pdf.setSubject("English translation of the user-confirmed Portuguese resume")
        self.pdf.setCreator("scripts/cv/generate_resumes.py (ReportLab)")
        self.styles = {
            "body": ParagraphStyle("body", fontName=self.regular, fontSize=9.7, leading=13.3,
                                   textColor=BODY, spaceAfter=0),
            "bullet": ParagraphStyle("bullet", fontName=self.regular, fontSize=9.7, leading=13.3,
                                     textColor=BODY, leftIndent=9, firstLineIndent=-9),
            "small": ParagraphStyle("small", fontName=self.regular, fontSize=8.15, leading=11.7,
                                    textColor=MUTED),
            "role": ParagraphStyle("role", fontName=self.bold, fontSize=9.0, leading=12.5,
                                   textColor=self.accent),
            "heading": ParagraphStyle("heading", fontName=self.bold, fontSize=9.6, leading=13.3,
                                      textColor=INK, alignment=TA_LEFT),
            "date": ParagraphStyle("date", fontName=self.bold, fontSize=8.4, leading=12.0,
                                   textColor=MUTED, alignment=TA_RIGHT),
        }
        self.y = PAGE_HEIGHT - TOP
        self.page_number = 1

    def paragraph(self, text: str, style: str = "body", gap: float = 3, markup: bool = False):
        paragraph = Paragraph(text if markup else escape(text), self.styles[style])
        _, height = paragraph.wrap(WIDTH, PAGE_HEIGHT)
        if self.y - height < BOTTOM:
            raise ValueError(f"{self.resume['key']} page {self.page_number} overflows near: {text[:75]}")
        paragraph.drawOn(self.pdf, LEFT, self.y - height)
        self.y -= height + gap

    def section(self, title: str):
        self.y -= 6
        self.pdf.setFont(self.bold, 9.6)
        self.pdf.setFillColor(self.accent)
        self.pdf.drawString(LEFT, self.y - 9.6, title.upper())
        self.y -= 15
        self.pdf.setStrokeColor(LINE)
        self.pdf.setLineWidth(0.65)
        self.pdf.line(LEFT, self.y, PAGE_WIDTH - RIGHT, self.y)
        self.y -= 7

    def bullet(self, text: str):
        self.paragraph("• " + text, "bullet", gap=2)

    def header(self):
        contact = self.data["contact"]
        self.pdf.setFillColor(INK)
        self.pdf.setFont(self.bold, 20)
        self.pdf.drawString(LEFT, self.y - 20, contact["name"])
        self.y -= 29
        self.paragraph(self.resume["headline"], "role", gap=1)
        self.paragraph(self.resume["specialization"], "small", gap=6)
        self.paragraph(
            f'{escape(contact["location"])}  •  {escape(contact["phone"])}  •  '
            + link("mailto:" + contact["email"], contact["email"]),
            "small", gap=1, markup=True
        )
        self.paragraph(
            "  •  ".join([
                link(contact["portfolio"], short_url(contact["portfolio"])),
                link(contact["linkedin"], short_url(contact["linkedin"])),
                link(contact["github"], short_url(contact["github"])),
            ]), "small", gap=7, markup=True
        )
        self.pdf.setStrokeColor(self.accent)
        self.pdf.setLineWidth(1.4)
        self.pdf.line(LEFT, self.y, PAGE_WIDTH - RIGHT, self.y)
        self.y -= 3

    def experience(self, item: dict):
        title = Paragraph(escape(item["company"]), self.styles["heading"])
        dates = Paragraph(escape(item["dates"]), self.styles["date"])
        date_width = 119
        title_width = WIDTH - date_width - 9
        _, title_height = title.wrap(title_width, PAGE_HEIGHT)
        _, date_height = dates.wrap(date_width, PAGE_HEIGHT)
        height = max(title_height, date_height)
        title.drawOn(self.pdf, LEFT, self.y - title_height)
        dates.drawOn(self.pdf, PAGE_WIDTH - RIGHT - date_width, self.y - date_height)
        self.y -= height + 1
        role = escape(item["role"])
        if item.get("url"):
            role += "  |  " + link(item["url"], "Project demo")
        self.paragraph(role, "role", gap=2, markup=True)
        if item.get("note"):
            self.paragraph(item["note"], "small", gap=3)
        for text in item["bullets"]:
            self.bullet(text)
        self.y -= 3

    def footer(self):
        self.pdf.setStrokeColor(LINE)
        self.pdf.setLineWidth(0.5)
        self.pdf.line(LEFT, 29, PAGE_WIDTH - RIGHT, 29)
        self.pdf.setFillColor(MUTED)
        self.pdf.setFont(self.regular, 7.5)
        self.pdf.drawString(LEFT, 18, f"Daniel Santana Lima | {self.resume['label']}")
        self.pdf.drawRightString(PAGE_WIDTH - RIGHT, 18, f"{self.page_number} / 2")

    def build(self):
        self.header()
        self.section("Professional Summary")
        self.paragraph(self.resume["summary"], gap=1)
        self.section("Technical Skills")
        for label, detail in self.resume["skills"]:
            self.paragraph(f"<b>{escape(label)}:</b> {escape(detail)}", gap=4, markup=True)
        self.section("Professional Experience")
        for experience in self.resume["experience"]:
            self.experience(experience)
        self.footer()
        self.pdf.showPage()
        self.page_number = 2
        self.y = PAGE_HEIGHT - TOP
        self.pdf.setFillColor(MUTED)
        self.pdf.setFont(self.bold, 9)
        self.pdf.drawString(LEFT, self.y - 9, self.data["contact"]["name"])
        self.pdf.setFont(self.regular, 8.5)
        self.pdf.drawRightString(PAGE_WIDTH - RIGHT, self.y - 9, self.resume["label"])
        self.y -= 18
        self.section("Selected Projects")
        for project in self.resume["projects"]:
            self.paragraph(project["title"], "heading", gap=1)
            self.paragraph(link(project["url"], short_url(project["url"])), "small", gap=4, markup=True)
            for text in project["bullets"]:
                self.bullet(text)
            self.y -= 6
        self.section("Awards & Recognition")
        for award in self.data["awards"]:
            self.paragraph(award["title"], "heading", gap=2)
            self.paragraph(award["text"], gap=6)
        self.section("Education")
        for education in self.data["education"]:
            self.paragraph(education["title"], "heading", gap=2)
            self.paragraph(education["institution"], gap=1)
            self.paragraph(education["detail"], "small", gap=7)
        self.section("Courses & Certifications")
        for certification in self.data["certifications"]:
            self.paragraph(certification, gap=3)
        self.section("Languages")
        for language, detail in self.data["languages"]:
            self.paragraph(f"<b>{escape(language)}:</b> {escape(detail)}", gap=3, markup=True)
        self.footer()
        self.pdf.save()


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output-dir", type=Path, default=ROOT / "public" / "cv")
    args = parser.parse_args()
    data = json.loads(SOURCE.read_text(encoding="utf-8"))
    args.output_dir.mkdir(parents=True, exist_ok=True)
    for resume in data["resumes"]:
        destination = args.output_dir / resume["filename"]
        Resume(data, resume, destination).build()
        print(destination)


if __name__ == "__main__":
    main()
